import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Flex, Text } from "@phamphu19498/pibridge_uikit"
import ErrorMessages from "components/ErrorMessages/ErrorMessage"
import PageFullWidth from "components/Layout/PageFullWidth"
import Select from 'components/Select/Select'
import { rules } from "config/auth/rules"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import styled from "styled-components"
import * as Yup from 'yup'
import { axiosClient } from '../../config/htttp'
import { getUser } from '../../state/user'
import { ContainerInput, CsInput, FormSubmit, WrapInput } from "./components/styles"
import useToast from '../../hooks/useToast'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../state/user/actions'

const Register = () => {
    // form validation rules 
    const { toastSuccess, toastError } = useToast()
    const userInfor = getUser();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').matches(/^(\S+$)/g, 'Please input alphabet').matches(/[abcdefghijklmnopqrstuvwxyz]+/ , 'Please input alphabet').min(4, 'Email are between 4 and 50 characters in length').max(50, 'Max length is 50 characters').email('Invalid email'),
        firstName: Yup.string().required('First name is required').matches(/^(\S+$)/g, 'Please input alphabet').max(50, 'First name max 50 characters in length').matches(/[abcdefghijklmnopqrstuvwxyz]+/ , 'Please input alphabet'),
        lastName: Yup.string().required('Last name is required').matches(/^(\S+$)/g, 'Please input alphabet').max(50, 'Last name max 50 characters in length').matches(/[abcdefghijklmnopqrstuvwxyz]+/ , 'Please input alphabet'),
        language: Yup.string().required('Language is required')
    });
    const InitValues = {
        firstName: userInfor?.firstName || "", 
        lastName: userInfor?.lastName || "",  
        email: userInfor?.email || "",
        language: userInfor?.language || "en"
    }
    const formOptions = { resolver: yupResolver(validationSchema), defaultValues: InitValues };
    const { handleSubmit, formState: { errors, isValid, isDirty },setError, control, getValues, setValue } = useForm(formOptions);
    
    const onSubmit = async data => {
        const submitReq = await axiosClient.post('/user/update', data);
        if(submitReq.status == 200 || submitReq.status == 201){
            toastSuccess('update successful');
            dispatch(setUser(submitReq.data));
            if(location && location.pathname == "/register"){
                navigate("/");
            }
        }else {
            toastError('error', 'system error!!!')
        }
    }

    return (
        <PageFullWidth>
            <CsContainer>
                <Flex width="100%" mt="1rem">
                    <Text bold fontSize="32px">User information</Text>
                </Flex>
                <Flex width='100%'>
                    <Text mt="1rem" color="textSubtile">Let’s get started with a free EzInvoice account.</Text>
                </Flex>
                <FormSubmit onSubmit={handleSubmit(onSubmit)}>
                    <Flex flexDirection="column" width="100%" marginTop="20px">
                        {/* first name */}
                        <ContainerInput>
                            <WrapInput>
                                <Controller
                                    control={control}
                                    name="firstName"
                                    rules={rules.fistname}
                                    render={({ field: {onBlur, value, onChange}  }) => {
                                        return(
                                            <CsInput
                                                name="firstName"
                                                type="text"
                                                onBlur={onBlur}
                                                placeholder="First name"
                                                value={value}
                                                onChange={onChange}
                                            />
                                    )}}
                                />
                            </WrapInput>
                            <ErrorMessages errors={errors} name="firstName" />
                        </ContainerInput>
                        {/* last name */}
                        <ContainerInput>
                            <WrapInput>
                                <Controller
                                    control={control}
                                    name="lastName"
                                    rules={rules.lastname}
                                    render={({ field }) => (
                                    <CsInput
                                        name="lastName"
                                        type="text"
                                        placeholder="Last name"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                    )}
                                />
                            </WrapInput>
                            <ErrorMessages errors={ errors} name="lastName" />
                        </ContainerInput>
                        <ContainerInput>
                            <WrapInput>
                                <Controller
                                    control={control}
                                    name="email"
                                    rules={rules.email}
                                    render={({ field }) => (
                                    <CsInput
                                        name="email"
                                        // value={getValues('email')}
                                        type="email"
                                        placeholder="Your email address"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                    )}
                                />
                            </WrapInput>
                            <ErrorMessages errors={errors} name="email" />
                        </ContainerInput>
                        <ContainerInput>
                            <WrapInput>
                                <Controller
                                    control={control}
                                    name="language"
                                    rules={rules.email}
                                    defaultValue={"en"}
                                    render={({ field }) => (
                                        <Select 
                                            width='100%'
                                            defaultOptionIndex={field.value == "vi" ? 2 : 1}
                                            options={[
                                                {
                                                    label: "English",
                                                    value: "en",
                                                },
                                                {
                                                    label: "VietNam",
                                                    value: "vi",
                                                }
                                            ]}
                                            onOptionChange={(data) => setValue("language", data.value)}
                                        />
                                    )}
                                />
                            </WrapInput>
                            <ErrorMessages errors={errors} name="language" />
                        </ContainerInput>
                        {/* { checkError === true && 
                            <CustomMessageError>{getMessageError}</CustomMessageError> 
                        } */}
                        <Flex width="100%" mt="1rem">
                            <Button 
                            // disabled={!isValid}
                                width="100%"
                                type="submit"
                                value="Submit"
                            >
                                Confirm
                            </Button>
                        </Flex>
                    </Flex>
                </FormSubmit>
            </CsContainer>
        </PageFullWidth>
    )
}

export default Register

const CsContainer = styled(Flex)`
    width: 100%;
    flex-direction:column;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 0px 30px;
    @media only screen and (max-width: 600px) {
        padding: 0px 20px;
        min-height: 80vh;
    }
    @media only screen and (min-width: 768px) {
        max-width: 600px;
        min-height: 80vh;
    }
`

const CustomMessageError = styled.div`
  color: ${({ theme }) => theme.colors.primaryBright};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1;
  margin-top: 5px;
  margin-left: 35px;
`
const ErrorMess = styled.div`
color: #FF592C;
font-size:12px;
font-weight:400;
letter-spacing: 0.1;
margin-top: 6px;
`