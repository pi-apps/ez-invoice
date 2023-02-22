import { AutoRenewIcon, Flex, Text } from "@devfedeltalabs/pibridge_uikit";
import { yupResolver } from '@hookform/resolvers/yup';
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import useToast from "hooks/useToast";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from 'state';
import { GetAllInvoice, GetAnInvoice, UseGetAllInvoice, UseGetAnInvoiceCore } from "state/invoice";
import { tabActiveNewInvoice } from "state/invoice/actions";
import { GetDataPreview } from "state/preview";
import { getDataPreview } from "state/preview/actions";
import { getAccessToken, getUser } from "state/user";
import styled from "styled-components";
import * as Yup from 'yup';
import FormTabOne from "./FormTabOne";
import FormTabThree from "./FormTabThree";
import FormTabTwo from "./FormTabTwo";
interface PropsSubTab{
    isActive:number
    setInvoiceId: any
    invoiceId?:string
}

const SubTab:React.FC<PropsSubTab> = ({isActive, invoiceId}) => {
  const navigate = useNavigate();
  const { toastSuccess, toastError } = useToast()
  const [activeTax, setActiveTax ] = useState<number>(1)
  const [activeDiscount, setActiveDiscount ] = useState<number>(1)
  const [startDate, setStartDate] = useState(new Date());
  const [startDueDate, setStartDueDate] = useState(new Date());

    const accessToken = getAccessToken()
    UseGetAnInvoiceCore(invoiceId, accessToken)
    UseGetAllInvoice(accessToken)
    
    
    const data = GetDataPreview()
    const dataDefault = GetAnInvoice()
    const itemInvoice  = dataDefault?.details
    console.log('data', data)
    const items = GetAllInvoice()
    const invoicelength = items?.[0]?.allInvoice?.length
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
        paymentTerms: Yup.string().max(50, 'Max length is 50 characters'),
        terms: Yup.string().max(500, 'Max length is 500 characters'),
        notes: Yup.string().max(500, 'Max length is 500 characters'),
        // tax: Yup.string().matches(/[0-9]+/ , 'Please input number'),
        // discount: Yup.string().matches(/[0-9]+/, 'Please input number'),
        // shipping: Yup.string().matches(/[0-9]+/, 'Please input number'),
        // amountPaid: Yup.string().matches(/[0-9]+/, 'Please input number').matches(/^(\S+$)/g, 'Please input number'),
        // issueDate: Yup.string().required('Issue date is required'),
        // dueDate: Yup.string().required('Due date is required'),
        // taxType: Yup.string().required('Tax type is required'),
        // logo: Yup.string().required('Logo is required'),
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

    // const onSubmit = async data => {
    //     setLoadingPreview(true)
    //     const formData = new FormData();
    //         formData.append("senderEmail", `${data.senderEmail}`);
    //         formData.append("billFrom", `${data.billFrom}`);
    //         formData.append("billTo", `${data.billTo}`);
    //         formData.append("shipTo", `${data.shipTo}`);
    //         formData.append("issueDate", `${startDate?.getTime()}`);
    //         formData.append("dueDate", `${startDueDate?.getTime()}`);
    //         formData.append("paymentTerms", `${data.paymentTerms}`);
    //         formData.append("poNumber", `${data.poNumber}`);
    //         formData.append("items", `${JSON.stringify(data.items)}`);
    //         formData.append("notes", `${data.notes}`);
    //         formData.append("terms", `${data.terms}`);
    //         formData.append("tax", `${data.tax}`);
    //         formData.append("taxType", `${activeTax}`);
    //         formData.append("discountType", `${activeDiscount}`);   
    //         formData.append("discount", `${data.discount}`);
    //         formData.append("shipping", `${data.shipping}`);
    //         formData.append("amountPaid", `${data.amountPaid}`);
    //         formData.append("logo", data.logo);
            
    //         const submitReq = await axiosClient.post('/invoice/create', formData, 
    //                 {
    //                     headers: {
    //                         'Content-Type': `multipart/form-data`,
    //                         'Accept': '*',
    //                         'Authorization': accessToken,
    //                     }
    //                 }
    //             );
    //             console.log('submitReq', submitReq)

    //             if(submitReq.status == 200){
    //                 toastSuccess('', <Text style={{justifyContent: 'center'}}>{stateText.create_success}</Text>);
    //                 // setInvoiceid(submitReq?.data?.invoiceId)
    //                 await setInvoiceId(submitReq?.data?.invoiceId)
    //                 await dispatch(setInvoiceIdRedux(submitReq?.data?.invoiceId))
    //                 navigate(`/createDetail/${submitReq?.data?.invoiceId}`)
    //                 setLoadingPreview(false)
    //             }else {
    //                 toastError('error', <Text style={{justifyContent: 'center'}}>{stateText.create_failed}</Text>)
    //                 setLoadingPreview(false)
    //         }
    // }

    const onSubmit = async data => {
        console.log('data', data)
        await dispatch(getDataPreview({
            dataPreview: {
                senderEmail: getValues("senderEmail"),
                billFrom:getValues("billFrom"),
                billTo:getValues("billTo"),
                shipTo:getValues("shipTo"),
                issueDate: getValues("issueDate"),
                dueDate: getValues("dueDate"),
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
                    />
        }
    }

    // transLanguage
    const DataAb = getUser();
    const languageUserApi = DataAb?.language
  
    const listTextPlaceHolder = {
      // text
      create_invoice: "Create Invoice",
      create_success: "Create invoice successfully!!!",
      create_failed: "System error!!!",
    };
  
    const [stateText, setStateText] = useState(listTextPlaceHolder);
  
    const fcTransLateText = async (language) => {
        const resCreateInvoice = await GetTranslateHolder(
          listTextPlaceHolder.create_invoice,
          language
        );
        const resCreateSuccess = await GetTranslateHolder(
            listTextPlaceHolder.create_success,
            language
          );
          const resCreateFailed = await GetTranslateHolder(
            listTextPlaceHolder.create_failed,
            language
          );
      setStateText({
        create_invoice: resCreateInvoice,
        create_failed: resCreateFailed,
        create_success: resCreateSuccess,
      });
    };
  
    useEffect(() => {
      if (!languageUserApi) {
        fcTransLateText('en')
      } else fcTransLateText(languageUserApi)
    }, [languageUserApi]);


    return (
        <>
            <HeadingTab>{stateText.create_invoice}</HeadingTab>
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
                { dataDefault?.isLoading ?
                    <Flex width="100%" justifyContent="center" mt="1rem">
                        <AutoRenewIcon color="textDisabled" spin/>
                    </Flex>
                :
                    renderScreens(isActive)
                }
            </FormSubmit>
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