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

interface PropsSubTab{
    isActive:number
}

const SubTab:React.FC<PropsSubTab> = ({isActive}) => {
 
    const dispatch = useDispatch<AppDispatch>()

    const InitValues = {
        invoicenumber: '',
        avatar:'',
        file: '',
        sender: '',
        billto:'',
        shipto: '',
        date: new Date(),
        duedate: new Date(),
        payment:'',
        ponumber:'',
    }
    
    const validationSchema = Yup.object().shape({
        invoicenumber: Yup.string().required('invoicenumber is required').min(4, 'invoicenumber are between 4 and 160 characters in length').max(160, 'Emails are between 4 and 160 characters in length'),
        avatar: Yup.string().required('invoicenumber is required'),
        file: Yup.string().required('file is required').max(100, 'file max 100 characters in length'),
        sender: Yup.string().required('sender is required').max(100, 'sender max 100 characters in length'),
        billfrom: Yup.string().required('billto is required'),
        billto: Yup.string().required('billto is required'),
        shipto: Yup.string().required('shipto is required'),
        date: Yup.string().required('date is required'),
        duedate: Yup.string().required('date is required'),
        payment: Yup.string().required('payment is required'),
        ponumber: Yup.string().required('payment is required'),
    });
  
    const formOptions = { resolver: yupResolver(validationSchema), defaultValues: InitValues };
    //   const formOptions = { resolver: yupResolver(validationSchema) };
    const { handleSubmit, formState, control, getValues } = useForm(formOptions);
    const { errors } = formState;

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
            return <FormTabOne formState={formState} control={control} />
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
        <Flex>{renderScreens(isActive)}</Flex>
        </>
    )
}
export default SubTab

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