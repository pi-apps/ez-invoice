import { AutoRenewIcon, Flex, Text } from "@devfedeltalabs/pibridge_uikit";
import { yupResolver } from '@hookform/resolvers/yup';
import { axiosClient } from "config/htttp";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import useToast from "hooks/useToast";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from 'state';
import { GetAllInvoice, GetAnInvoice, UseGetAllInvoice, UseGetAnInvoiceCore } from "state/invoice";
import { tabActiveNewInvoice } from "state/invoice/actions";
import { setInvoiceIdRedux } from "state/newInvoiceId/actions";
import { GetDataPreview } from "state/preview";
import { fetchStatusPreview } from "state/preview/actions";
import { getDataPreview } from "state/preview/actions";
import { getAccessToken, getUser } from "state/user";
import styled from "styled-components";
import { createInvoice_text } from "translation/languages/createInvoice_text";
import { createInvoiceTranslate } from "translation/translateArrayObjects";
import * as Yup from 'yup';
import Footer from "../components/Footer";
import FormTabOne from "./FormTabOne";
import FormTabThree from "./FormTabThree";
import FormTabTwo from "./FormTabTwo";
interface PropsSubTab{
    isActive:number
    setInvoiceId: any
    invoiceId?:string
}

const SubTab:React.FC<PropsSubTab> = ({isActive, setInvoiceId, invoiceId}) => {
    const navigate = useNavigate();
    const { toastSuccess, toastError } = useToast()
    const [activeTax, setActiveTax ] = useState<number>(1)
    const [activeDiscount, setActiveDiscount ] = useState<number>(1)
    const [startDate, setStartDate] = useState(new Date());
    const [startDueDate, setStartDueDate] = useState(new Date());
    const [ totalFinaly, setTotalFinaly ] = useState(0)
    const [ totalAndTax, setTotalAndTax ] = useState(0)
    const accessToken = getAccessToken()
    UseGetAnInvoiceCore(invoiceId, accessToken)
    UseGetAllInvoice(accessToken)
    const dataDefault = GetAnInvoice()
    const itemInvoice  = dataDefault?.details
    const items = GetAllInvoice()
    console.log('totalAndTax', totalAndTax)
    const [ invoicelength, setInvoicelength ] = useState(0)
    useEffect(()=>{
        if(items){
            setInvoicelength(items?.[0]?.allInvoice?.length)
        } else {
            setInvoicelength(0)
        }
    }, items)
    const [loadingPreview, setLoadingPreview] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    
    const InitValues = {
        senderEmail: '',
        billFrom:'',
        billTo:'',
        shipTo: '',
        issueDate: new Date(),
        dueDate: new Date(),
        paymentTerms:'',
        poNumber:'',
        items: [{name: "",quantity: '',price:''}],
        notes:'',
        terms:'',
        tax: 0,
        taxType:1,
        discountType:1,
        discount: 0,
        shipping: 0,
        amountPaid: 0,
        logo: "",
    }

    const validationSchema = Yup.object().shape({
        senderEmail: Yup.string().required('Sender email is required').max(100, 'Max length is 100 characters').matches(/[abcdefghijklmnopqrstuvwxyz]+/ , 'Please input alphabet').email('Invalid email address'),
        billFrom: Yup.string().required('Bill from is required').max(100, 'Max length is 100 characters').matches(/[abcdefghijklmnopqrstuvwxyz]+/ , 'Please input alphabet'),
        billTo: Yup.string().required('Bill to is required').max(100, 'Max length is 100 characters').matches(/[abcdefghijklmnopqrstuvwxyz]+/ , 'Please input alphabet'),
        shipTo: Yup.string().max(200, 'Max length is 200 characters'),
        paymentTerms: Yup.string().max(20, 'Max length is 20 characters'),
        poNumber: Yup.string().max(20, 'Max length is 20 characters'),
        terms: Yup.string().max(500, 'Max length is 500 characters'),
        notes: Yup.string().max(500, 'Max length is 500 characters'),
        amountPaid: Yup.number().max(totalFinaly).required(),
        discount: Yup.number().max(totalAndTax).required(),
    });

    const formOptions = { resolver: yupResolver(validationSchema), defaultValues: InitValues };

    const {register, handleSubmit, formState, control, getValues, setValue, watch } = useForm({...formOptions, mode: 'onTouched'});
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });
    const watchFieldArray = watch("items");

    const controlledFields = fields.map((field, index) => {
        return {
        ...field,
        ...watchFieldArray[index]
        };
    });

    const taxValue =  Number(getValues('tax'))
    const shippingValue =  Number(getValues('shipping'))
    const discountValue =  Number(getValues('discount'))
    const amountPaidValue =  Number(getValues('amountPaid'))
    const totalPrice = (fields) => {
        return fields?.reduce((sum, i) => {
          if(i.price === undefined || i.quantity === undefined){
            return 0
          } else{
            return (
              sum + i.price * i.quantity
            )
          }
        },0)
      }
  
      const total = useMemo(() => {
        return totalPrice(controlledFields)
      },[controlledFields]);
  
      const taxValuePercent = taxValue * total / 100 
      const isTaxValue = (activeTax === 1 ) ? taxValuePercent : taxValue
      const DiscountValuePercent = discountValue * (total + isTaxValue) / 100 
      const isDiscountValuePercent = discountValue <= 100 ? DiscountValuePercent : total
      const isDiscount = (discountValue < total) ? discountValue : total

      const totalFinal = (total) => {
        if(activeTax === 2 && activeDiscount === 2){
          return total + taxValue + shippingValue - isDiscount
        } else if(activeTax === 2 && activeDiscount === 1){
          return total + taxValue + shippingValue - isDiscountValuePercent
        } else if(activeTax === 1 && activeDiscount === 1){
          return total + taxValuePercent + shippingValue - isDiscountValuePercent
        } else if(activeTax === 1 && activeDiscount === 2){
          return total + taxValuePercent + shippingValue - isDiscount
        }
      } 
      useEffect(() => {
          setTotalFinaly(totalFinal(total))
          setTotalAndTax(total + isTaxValue)
      },[taxValue, shippingValue, discountValue, amountPaidValue, total, activeTax])

    // use update default values
    useEffect(()=>{
        if( itemInvoice && invoiceId?.length ) {
            setValue("senderEmail", itemInvoice?.senderEmail);
            setValue("billFrom", itemInvoice?.billFrom);
            setValue("billTo", itemInvoice?.billTo);
            setValue("shipTo", itemInvoice?.shipTo);
            setValue("issueDate", new Date(itemInvoice?.issueDate));
            setValue("dueDate", new Date(itemInvoice?.dueDate));
            setValue("paymentTerms", itemInvoice?.paymentTerms);
            setValue("poNumber", itemInvoice?.poNumber);
            setValue("items", itemInvoice?.items);
            setValue("notes", itemInvoice?.notes);
            setValue("terms", itemInvoice?.terms);
            setValue("tax", itemInvoice?.tax);
            setValue("taxType", itemInvoice?.taxType);
            setValue("discount", itemInvoice?.discount);
            setValue("shipping", itemInvoice?.shipping);
            setValue("amountPaid", itemInvoice?.amountPaid);
            setValue("logo", itemInvoice?.logoUrl);
            setStartDate(new Date(itemInvoice?.issueDate))
            setStartDueDate(new Date(itemInvoice?.dueDate))
        }
    },[itemInvoice, dataDefault?.isLoading])

    // for preview data
    const dataPreview = GetDataPreview()
    const dataPreviewDetails = dataPreview?.dataPreview
    function setDefaultValue(dataDefault){
        setValue("senderEmail", dataDefault?.senderEmail);
        setValue("billFrom", dataDefault?.billFrom);
        setValue("billTo", dataDefault?.billTo);
        setValue("shipTo", dataDefault?.shipTo);
        setValue("issueDate", new Date(dataDefault?.issueDate));
        setValue("dueDate", new Date(dataDefault?.dueDate));
        setValue("paymentTerms", dataDefault?.paymentTerms);
        setValue("poNumber", dataDefault?.poNumber);
        setValue("items", dataDefault?.items);
        setValue("notes", dataDefault?.notes);
        setValue("terms", dataDefault?.terms);
        setValue("tax", dataDefault?.tax);
        setValue("taxType", dataDefault?.taxType);
        setValue("discount", dataDefault?.discount);
        setValue("shipping", dataDefault?.shipping);
        setValue("amountPaid", dataDefault?.amountPaid);
        setValue("logo", "");
        setStartDate(new Date(dataDefault?.issueDate))
        setStartDueDate(new Date(dataDefault?.dueDate))
    }
    useEffect(()=>{
        if( dataPreviewDetails && dataPreview?.isPreview ) {
            setDefaultValue(dataPreviewDetails)
        }
    },[dataPreviewDetails, dataPreview?.isPreview])
   
    const onCreate = async data => {
        setLoadingPreview(true)
        try {
            const formData = new FormData();
            formData.append("senderEmail", `${data.senderEmail}`);
            formData.append("billFrom", `${data.billFrom}`);
            formData.append("billTo", `${data.billTo}`);
            formData.append("shipTo", `${data.shipTo}`);
            formData.append("issueDate", `${startDate?.getTime()}`);
            formData.append("dueDate", `${startDueDate?.getTime()}`);
            formData.append("paymentTerms", `${data.paymentTerms}`);
            formData.append("poNumber", `${data.poNumber}`);
            formData.append("items", `${JSON.stringify(data.items)}`);
            formData.append("notes", `${data.notes}`);
            formData.append("terms", `${data.terms}`);
            formData.append("tax", `${data.tax}`);
            formData.append("taxType", `${activeTax}`);
            formData.append("discountType", `${activeDiscount}`);   
            formData.append("discount", `${data.discount}`);
            formData.append("shipping", `${data.shipping}`);
            formData.append("amountPaid", `${data.amountPaid}`);
            formData.append("logo", data.logo);

            const submitReq = await axiosClient.post('/invoice/create', formData, 
                    {
                        headers: {
                            'Content-Type': `multipart/form-data`,
                            'Accept': '*',
                            'Authorization': accessToken,
                        }
                    }
                );
                if(submitReq.status == 200){
                    toastSuccess('', <Text style={{justifyContent: 'center'}}>{stateText.text_create_success}</Text>);
                    await setInvoiceId(submitReq?.data?.invoiceId)
                    await dispatch(setInvoiceIdRedux(submitReq?.data?.invoiceId))
                    await dispatch(fetchStatusPreview({isPreview: false}))
                    navigate(`/createDetail/${submitReq?.data?.invoiceId}`)
                    setLoadingPreview(false)
                }else {
                    toastError('error', <Text style={{justifyContent: 'center'}}>{stateText.text_create_failed}</Text>)
                    setLoadingPreview(false)
            }
        } catch (error) {
            console.log("error", error)
            toastError('Error', <Text style={{justifyContent: 'center'}}>{stateText.create_failed}</Text>)
        } finally {
            setLoadingPreview(false)
        }
        
    }

    const onSubmit = async data => {
        await dispatch(getDataPreview({
            dataPreview: {
                senderEmail: getValues("senderEmail"),
                billFrom:getValues("billFrom"),
                billTo:getValues("billTo"),
                shipTo:getValues("shipTo"),
                issueDate: startDate,
                dueDate: startDueDate,
                paymentTerms:getValues("paymentTerms"),
                poNumber:getValues("poNumber"),
                items: getValues("items"),
                notes:getValues("notes"),
                terms:getValues("terms"),
                tax: getValues("tax"),
                discount: getValues("discount"),
                shipping: getValues("shipping"),
                amountPaid: getValues("amountPaid"),
                taxType: activeTax,
                discountType: activeDiscount,
            }
        }));
        setValue("senderEmail", data?.senderEmail);
        setValue("billFrom", data?.billFrom);
        setValue("billTo", data?.billTo);
        setValue("shipTo", data?.shipTo);
        setValue("issueDate", startDate);
        setValue("dueDate", startDueDate);
        setValue("paymentTerms", data?.paymentTerms);
        setValue("poNumber", data?.poNumber);
        setValue("items", data?.items);
        setValue("notes", data?.notes);
        setValue("terms", data?.terms);
        setValue("tax", data?.tax);
        setValue("taxType", data?.taxType);
        setValue("discount", data?.discount);
        setValue("shipping", data?.shipping);
        setValue("amountPaid", data?.amountPaid);
        setValue("logo", data?.logoUrl);
        await dispatch(fetchStatusPreview({isPreview: true}))
        
        navigate("/preview")
    }

    const handleMinusTabActive = () => {
        if(isActive > 1 && isActive <= 3){
            dispatch(tabActiveNewInvoice({isActive: isActive - 1}))
        }
    }

    const handlePlusTabActive = () => {
        if( 1 <= isActive && isActive < 3 ){
            dispatch(tabActiveNewInvoice({isActive: isActive + 1}))
        }
    }

    const renderScreens = ( isActive) => {
        if(isActive === 1){
            return <FormTabOne startDueDate={startDueDate} setStartDueDate={setStartDueDate} startDate={startDate} setStartDate={setStartDate} invoicelength={invoicelength} images={getValues("logo")} formState={formState} setValue={setValue} control={control} getValues={getValues} />
        }
        if(isActive === 2){
            return <FormTabTwo formState={formState} controlledFields={controlledFields} append={append} remove={remove} register={register} control={control} />
        }
        if(isActive === 3){
            return <FormTabThree 
                        controlledFields={controlledFields} 
                        getValues={getValues} fields={fields} 
                        activeDiscount={activeDiscount} 
                        setActiveDiscount={setActiveDiscount} 
                        activeTax={activeTax} 
                        setActiveTax={setActiveTax} 
                        formState={formState} 
                        setValue={setValue} 
                        control={control}
                        loadingPreview={loadingPreview}
                        watch={watch}
                        register={register}
                    />
        }
    }

    // transLanguage
    const DataAb = getUser();
    const languageUserApi = DataAb?.language
  const [stateText, setStateText] = useState(createInvoice_text);
  const requestTrans = async () => {
    try {
      const resData = await createInvoiceTranslate(languageUserApi);
      setStateText(resData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (languageUserApi) {
      requestTrans();
    } else if (!languageUserApi) {
      setStateText(createInvoice_text);
    }
  }, [languageUserApi]);

    
    return (
        <>
            <HeadingTab>{stateText.text_create_invoice}</HeadingTab>
            <ContainerSubTab>
                <CsButton isActive={isActive > 1} role="presentation" onClick={handleMinusTabActive}>
                    &lt;
                </CsButton>
                <CsTab>
                    <TabButton isActive={isActive === 1} onClick={() => dispatch(tabActiveNewInvoice({isActive:1})) }>
                        1
                    </TabButton>
                    <TabButton isActive={isActive === 2} onClick={() => dispatch(tabActiveNewInvoice({isActive:2})) }>
                        2
                    </TabButton>
                    <TabButton isActive={isActive === 3} onClick={() => dispatch(tabActiveNewInvoice({isActive:3})) }>
                        3
                    </TabButton>
                </CsTab>
                <CsButton isActive={isActive < 3} role="presentation" onClick={handlePlusTabActive}>
                    &gt;
                </CsButton>
            </ContainerSubTab>
            <FormSubmit onSubmit={handleSubmit(onSubmit)}>
                { 
                    renderScreens(isActive)
                }
            </FormSubmit>
            <Footer 
                invoiceId={invoiceId} 
                isActive={isActive} 
                onHandleCreate={handleSubmit((d) => onCreate(d))}
                loadingPreview={loadingPreview} 
            />
        </>
    )
}
export default SubTab

const FormSubmit = styled.form`
  width: 100%;
`
const ContainerSubTab = styled(Flex)`
    width:100%;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding:0px 12px;
    margin-top:1rem;
    margin-bottom:1rem;
`
const CsTab = styled(Flex)`
    width: fit-content;
    align-items: center;
`
const CsButton = styled.div<{isActive:boolean}>`
    cursor: ${({ isActive }) => isActive ? "pointer" : "default"};
    color: ${({ isActive }) => isActive ? "#6B39F4" : '#94A3B8'};
    background: transparent;
    border-radius: 50%;
    font-size: 20px;
    height: 35px;
    width: 35px;
    padding: 0;
    &:hover{
        color: ${({ isActive }) => isActive && "#6B39F4" };
    }
    &:active{
        color: #6B39F4;
    }
`

const TabButton = styled(Flex)<{isActive:boolean}>`
    cursor: pointer;
    justify-content:center;
    align-items:center;
    height: 29px;
    width: 29px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 50%;
    margin: 0 5px;
    color: ${({ isActive }) => isActive ? "#FFFFFF" : '#94A3B8'};
    background: ${({ isActive }) => isActive ? "#6B39F4" : '#F8F9FD'};
`
const HeadingTab = styled(Text)`
    text-align: center;
    font-weight: 700;
    margin-top: 14px;
`