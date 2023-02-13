import { Button, Flex, Text } from "@phamphu19498/pibridge_uikit";
import { useDispatch } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup'
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form"
import { AppDispatch } from 'state'
import { tabActiveNewInvoice } from "state/invoice/actions";
import { useState } from "react";
import * as Yup from 'yup'
import FormTabOne from "./FormTabOne";
import FormTabTwo from "./FormTabTwo";
import FormTabThree from "./FormTabThree";
import { axiosClient } from "config/htttp";
import useToast from "hooks/useToast";

interface PropsSubTab{
    isActive:number
}

const SubTab:React.FC<PropsSubTab> = ({isActive}) => {
    const { toastSuccess, toastError } = useToast()
 
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
        items:'',
        notes:'',
        terms:'',
        tax:'',
        taxType:'',
        discount:'',
        shipping:'',
        amountPaid:'',
        logo:'',
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


    // const formOptions = { resolver: yupResolver(validationSchema) };
    //   const formOptions = { resolver: yupResolver(validationSchema) };
    const formOptions = { resolver: yupResolver(validationSchema), defaultValues: InitValues };

    const { handleSubmit, formState, control, getValues, setValue } = useForm(formOptions);
    const { errors , touchedFields, isDirty, isLoading } = formState;
    console.log('setValue', setValue)
    
    const onSubmit = async data => {
        const submitReq = await axiosClient.post('create', data);
        if(submitReq.status == 200 || submitReq.status == 201){
            toastSuccess('create invoice successful');
            // dispatch(setUser(submitReq.data));
            // if(location && location.pathname == "/register"){
            //     navigate("/");
            // }
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
            return <FormTabOne formState={formState} getValues={getValues} setValue={setValue} control={control} />
        }
        if(isActive === 2){
            return <FormTabTwo formState={formState} control={control} />
        }
        if(isActive === 3){
            return <FormTabThree formState={formState} control={control}/>
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