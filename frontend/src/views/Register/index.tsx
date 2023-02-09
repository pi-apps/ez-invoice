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
import { useNavigate } from 'react-router-dom'

const Register = () => {
    // form validation rules 
    const { toastSuccess, toastError } = useToast()
    const userInfor = getUser();
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').min(4, 'Emails are between 4 and 160 characters in length').max(160, 'Emails are between 4 and 160 characters in length'),
        firstName: Yup.string().required('First name is required').max(100, 'First name max 100 characters in length'),
        lastName: Yup.string().required('Lastname is required').max(100, 'Lastname max 100 characters in length'),
        language: Yup.string().required('Language is required')
    });
    const InitValues = {
        firstName: userInfor?.firstName || "", 
        lastName: userInfor?.lastName || "", 
        email: userInfor?.email || "",
        language: userInfor?.language || "en"
    }
    const formOptions = { resolver: yupResolver(validationSchema), defaultValues: InitValues };
    const { handleSubmit, formState: { errors } , control, getValues, setValue } = useForm(formOptions);
    const onSubmit = async data => {
        const submitReq = await axiosClient.post('user/update', data);
        if(submitReq.status == 200 || submitReq.status == 201){
            toastSuccess('update successful');
            if(!userInfor){
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
                                    render={({ field }) => (
                                    <CsInput
                                        name="firstName"
                                        type="text"
                                        placeholder="First name"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                    )}
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
                            <ErrorMessages errors={errors} name="lastName" />
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