import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Flex, Text } from "@phamphu19498/pibridge_uikit"
import ErrorMessages from "components/ErrorMessages/ErrorMessage"
import PageFullWidth from "components/Layout/PageFullWidth"
import Select from 'components/Select/Select'
import { rules } from "config/auth/rules"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import styled from "styled-components"
import * as Yup from 'yup'
import { ContainerInput, CsInput, FormSubmit, WrapInput } from "./components/styles"

const Register = () => {
    const [checkError, setCheckError] = useState(false)
    const [getMessageError, setMessageError] = useState('')
    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').min(4, 'Emails are between 4 and 160 characters in length').max(160, 'Emails are between 4 and 160 characters in length'),
        fistname: Yup.string().required('Fistname is required').max(100, 'Fistname max 100 characters in length'),
        lastname: Yup.string().required('Lastname is required').max(100, 'Lastname max 100 characters in length'),
        language: Yup.string().required('Language is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { handleSubmit, formState, control, getValues } = useForm(formOptions);
    const { errors } = formState;  
    return (
        <PageFullWidth>
            <CsContainer>
                <Flex width="100%" mt="1rem">
                    <Text bold fontSize="32px">User information</Text>
                </Flex>
                <Flex width='100%'>
                    <Text mt="1rem" color="textSubtile">Let’s get started with a free EzInvoice account.</Text>
                </Flex>
                <FormSubmit>
                    <Flex flexDirection="column" width="100%" padding="12px">
                        {/* first name */}
                        <ContainerInput>
                            <WrapInput>
                                <Controller
                                    control={control}
                                    name="fistname"
                                    rules={rules.fistname}
                                    render={({ field }) => (
                                    <CsInput
                                        name="fistname"
                                        type="text"
                                        placeholder="First name"
                                        onChange={field.onChange}
                                    />
                                    )}
                                />
                            </WrapInput>
                            <ErrorMessages errors={errors} name="fistname" />
                        </ContainerInput>
                        {/* last name */}
                        <ContainerInput>
                            <WrapInput>
                                <Controller
                                    control={control}
                                    name="lastname"
                                    rules={rules.lastname}
                                    render={({ field }) => (
                                    <CsInput
                                        name="lastname"
                                        type="text"
                                        placeholder="Last name"
                                        onChange={field.onChange}
                                    />
                                    )}
                                />
                            </WrapInput>
                            <ErrorMessages errors={errors} name="lastname" />
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
                                    name="email"
                                    rules={rules.email}
                                    render={({ field }) => (
                                        <Select 
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
                                            onOptionChange={field.onChange}
                                        />
                                    )}
                                />
                            </WrapInput>
                            <ErrorMessages errors={errors} name="email" />
                        </ContainerInput>
                        { checkError === true && 
                            <CustomMessageError>{getMessageError}</CustomMessageError> 
                        }
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
    min-height: 100vh;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 0px 30px;
    @media only screen and (max-width: 600px) {
        padding: 0px 10px;
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