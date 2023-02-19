import { Button, Flex, Text } from "@devfedeltalabs/pibridge_uikit";
import { useDispatch } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup'
import styled from "styled-components";
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { AppDispatch } from 'state'
import { tabActiveNewInvoice } from "state/invoice/actions";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import FormTabOne from "./FormTabOne";
import FormTabTwo from "./FormTabTwo";
import FormTabThree from "./FormTabThree";
import { backendURL, Csconfig, axiosClient } from "config/htttp";
import useToast from "hooks/useToast";
import axios from "axios";
import { GetAllInvoice, UseGetAllInvoice } from "state/invoice";
import { useNavigate } from "react-router-dom";
import { Translate } from "react-auto-translate";
interface PropsSubTab{
    isActive:number
}

const SubTab:React.FC<PropsSubTab> = ({isActive}) => {
  const navigate = useNavigate();
  const { toastSuccess, toastError } = useToast()
  const [images, setImages] = useState([]);
  const [activeTax, setActiveTax ] = useState<number>(1)
  const [activeDiscount, setActiveDiscount ] = useState<number>(1)
  const [invoiceId, setInvoiceid] = useState('')
  const [startDate, setStartDate] = useState(new Date());
  const [startDueDate, setStartDueDate] = useState(new Date());
  localStorage.setItem('invoiceIdStorage', invoiceId)

  UseGetAllInvoice()
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
        items: [{name: "",quantity:0,price:0}],
        notes:'',
        terms:'',
        tax:0,
        taxType:'',
        discount:0,
        shipping:0,
        amountPaid:0,
        logo: "",
    }
    
    const validationSchema = Yup.object().shape({
        senderEmail: Yup.string().required('Sender email is required').max(100, 'Max length is 100 characters').matches(/[abcdefghijklmnopqrstuvwxyz]+/ , 'Please input alphabet'),
        billFrom: Yup.string().required('Bill from is required').max(100, 'Max length is 100 characters').matches(/[abcdefghijklmnopqrstuvwxyz]+/ , 'Please input alphabet'),
        billTo: Yup.string().required('Bill to is required').max(100, 'Max length is 100 characters').matches(/[abcdefghijklmnopqrstuvwxyz]+/ , 'Please input alphabet'),
        shipTo: Yup.string().required('Ship to is required').max(200, 'Max length is 200 characters'),
        paymentTerms: Yup.string().required('Payment terms is required').max(50, 'Max length is 50 characters'),
        poNumber: Yup.string().required('Po number is required').max(20, 'Max length is 20 characters'),
        terms: Yup.string().max(500, 'Max length is 500 characters'),
        notes: Yup.string().required('Notes is required').max(500, 'Max length is 500 characters'),
        tax: Yup.string().matches(/[0-9]+/ , 'Please input number'),
        discount: Yup.string().matches(/[0-9]+/, 'Please input number'),
        shipping: Yup.string().matches(/[0-9]+/, 'Please input number'),
        amountPaid: Yup.string().matches(/[0-9]+/, 'Please input number').matches(/^(\S+$)/g, 'Please input number'),
        // issueDate: Yup.string().required('Issue date is required'),
        // dueDate: Yup.string().required('Due date is required'),
        // taxType: Yup.string().required('Tax type is required'),
        // logo: Yup.string().required('Logo is required'),
    });

    // const formOptions = { resolver: yupResolver(validationSchema), defaultValues: InitValues };
    const formOptions = { resolver: yupResolver(validationSchema), defaultValues: InitValues };

    const {register, handleSubmit, formState, control, getValues, setValue, watch } = useForm({...formOptions, mode: 'onTouched'});
    const { errors , touchedFields, isDirty, isLoading } = formState;
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

    const onSubmit = async data => {
        // console.log("data", data)
        setLoadingPreview(true)
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
            formData.append("discount", `${data.discount}`);
            formData.append("shipping", `${data.shipping}`);
            formData.append("amountPaid", `${data.amountPaid}`);
            formData.append("logo", data.logo);
            
            // console.log("formData", formData)
            const submitReq = await axiosClient.post('/invoice/create', formData, 
                    {
                        headers: {
                            'Content-Type': `multipart/form-data`,
                            'Accept': '*'
                        }
                    }
                );
                if(submitReq.status == 200){
                    toastSuccess('Create invoice successfully');
                    setInvoiceid(submitReq?.data?.invoiceId)
                    navigate(`/createDetail/${submitReq?.data?.invoiceId}`)
                    setLoadingPreview(false)
                }else {
                    toastError('error', 'system error!!!')
                    setLoadingPreview(false)
            }
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
            return <FormTabOne startDueDate={startDueDate} setStartDueDate={setStartDueDate} startDate={startDate} setStartDate={setStartDate} invoicelength={invoicelength} images={getValues("logo")} formState={formState} setValue={setValue} control={control} />
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


    return (
        <>
        <HeadingTab><Translate>Create Invoice</Translate></HeadingTab>
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
            {renderScreens(isActive)}
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
    cursor: pointer;
    background: transparent;
    border-radius: 50%;
    font-size: 20px;
    height: 35px;
    width: 35px;
    padding: 0;
    color: ${({ isActive }) => isActive ? "#6B39F4" : '#94A3B8'};
    &:hover{
        color: #6B39F4;
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