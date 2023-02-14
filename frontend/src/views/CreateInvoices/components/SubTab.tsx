import { Button, Flex, Text } from "@phamphu19498/pibridge_uikit";
import { useDispatch } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup'
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form"
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

interface PropsSubTab{
    isActive:number
}

const SubTab:React.FC<PropsSubTab> = ({isActive}) => {
    const { toastSuccess, toastError } = useToast()
    const [images, setImages] = useState([]);
    const dispatch = useDispatch<AppDispatch>()
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3ATcDzOEc7V94RgIixbDBrgXtGI_-_-SqE.9dwiOTiwXNmX7xWPjffPRlX6cWorfPczW6D9mUArNrU");
    
    const InitValues = {
        senderEmail: '',
        billFrom:'',
        billTo:'',
        shipTo: '',
        issueDate: new Date(),
        dueDate: new Date(),
        paymentTerms:'',
        poNumber:'',
        items: JSON.stringify([{name: "",quantity:0,price:0}]),
        notes:'',
        terms:'',
        tax:'',
        taxType:'',
        discount:'',
        shipping:'',
        amountPaid:'',
        logo: "",
    }
    
    const validationSchema = Yup.object().shape({
        senderEmail: Yup.string().required('invoicenumber is required'),
        billFrom: Yup.string().required('billto is required'),
        billTo: Yup.string().required('billto is required'),
        shipTo: Yup.string().required('shipto is required'),
        issueDate: Yup.string().required('date is required'),
        dueDate: Yup.string().required('date is required'),
        paymentTerms: Yup.string().required('payment is required'),
        poNumber: Yup.string().required('payment is required'),
        terms: Yup.string().required('payment is required'),
        tax: Yup.string().required('payment is required'),
        taxType: Yup.string().required('payment is required'),
        discount: Yup.string().required('payment is required'),
        shipping: Yup.string().required('payment is required'),
        amountPaid: Yup.string().required('payment is required'),
        logo: Yup.string().required('payment is required'),
    });

    const formOptions = { resolver: yupResolver(validationSchema), defaultValues: InitValues };

    const { handleSubmit, formState, control, getValues, setValue } = useForm(formOptions);
    const { errors , touchedFields, isDirty, isLoading } = formState;

    const onSubmit = async data => {
        console.log("data", data.logo);
        
        const formData = new FormData();
            formData.append("senderEmail", `${data.senderEmail}`);
            formData.append("billFrom", `${data.billFrom}`);
            formData.append("billTo", `${data.billTo}`);
            formData.append("shipTo", `${data.shipTo}`);
            formData.append("dueDate", `${data.dueDate}`);
            formData.append("paymentTerms", `${data.paymentTerms}`);
            formData.append("poNumber", `${data.poNumber}`);
            formData.append("items", `${data.items}`);
            formData.append("notes", `${data.notes}`);
            formData.append("terms", `${data.terms}`);
            formData.append("tax", `${data.tax}`);
            formData.append("taxType", `${data.taxType}`);
            formData.append("discount", `${data.discount}`);
            formData.append("shipping", `${data.shipping}`);
            formData.append("amountPaid", `${data.amountPaid}`);
            formData.append("logo", data.logo);

        console.log("formData", formData)
        const submitReq = await axiosClient.post('/invoice/create', formData, 
            {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    'Accept': '*'
                }
            }
        );
        if(submitReq.status == 200){
            toastSuccess('update successful');
        }else {
            toastError('error', 'system error!!!')
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
            return <FormTabOne images={getValues("logo")} formState={formState} setValue={setValue} control={control} />
        }
        if(isActive === 2){
            return <FormTabTwo formState={formState} setValue={setValue} control={control} />
        }
        if(isActive === 3){
            return <FormTabThree formState={formState} setValue={setValue} control={control}/>
        }
    }


    return (
        <>
        <HeadingTab>Create Invoice</HeadingTab>
        <ContainerSubTab>
            <CsButton onClick={handleMinusTabActive}>
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
            <CsButton onClick={handlePlusTabActive}>
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
const CsButton = styled(Button)`
    background: transparent;
    border-radius: 50%;
    color: #94A3B8;
    font-size: 20px;
    height: 35px;
    width: 35px;
    padding: 0;
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