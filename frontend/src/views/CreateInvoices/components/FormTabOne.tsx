import React from 'react'
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
import { ContainerInput, CsInput, CsTextArea, FormSubmit, WrapInput, CsInputFile, ContainerInputFile } from "../components/styles"

const FormTabOne = () => {
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
        <FormSubmit>
            <Flex flexDirection="column" width="100%" padding="12px">
                {/* Invoice number */}
                <Flex width='100%'>
                    <CsLabel mt="1rem" color="textSubtile">Invoice number</CsLabel>
                </Flex>
                <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="fistname"
                            rules={rules.fistname}
                            render={({ field }) => (
                            <CsInput
                                // name="fistname"
                                // type="text"
                                placeholder=""
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="fistname" />
                </ContainerInput>

                {/* Add your logo */}
                <ContainerInputFile>
                    <Controller
                        control={control}
                        name="file"
                        rules={rules.fistname}
                        render={({ field }) => (
                            <>
                        <CsInputFile
                            // name="fistname"
                            id="upload-photo"
                            type="file"
                            // placeholder="Add your logo"
                            // onChange={field.onChange}
                        />
                            </>
                        )}
                    />
                    <ErrorMessages errors={errors} name="fistname" />
                </ContainerInputFile>

                <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="lastname"
                            rules={rules.lastname}
                            render={({ field }) => (
                            <CsTextArea
                                // name="lastname"
                                // type="text"
                                placeholder="Who is this invoice from? (required)"
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="lastname" />
                </ContainerInput>

                {/* Bill To */}
                  <Flex width='100%'>
                    <CsLabel mt="1rem" color="textSubtile">Bill To</CsLabel>
                  </Flex>
                  <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="lastname"
                            rules={rules.lastname}
                            render={({ field }) => (
                            <CsTextArea
                                // name="lastname"
                                // type="text"
                                placeholder="Who is this invoice from? (required)"
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="lastname" />
                </ContainerInput>

                    {/* Bill To */}
                  <Flex width='100%'>
                    <CsLabel mt="1rem" color="textSubtile">Ship To</CsLabel>
                  </Flex>
                <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name=""
                            render={({ field }) => (
                            <CsTextArea
                                // name="email"
                                // value={getValues('email')}
                                // type="text"
                                placeholder="(Optional)"
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="email" />
                </ContainerInput>

                { checkError === true && 
                    <CustomMessageError>{getMessageError}</CustomMessageError> 
                }
                {/* <Flex width="100%" mt="1rem">
                    <Button
                        width="100%"
                        type="submit"
                        value="Submit"
                    >
                        Confirm
                    </Button>
                </Flex> */}
            </Flex>
        </FormSubmit>
    </CsContainer>
</PageFullWidth>
  )
}
const CsContainer = styled(Flex)`
    width: 100%;
    flex-direction:column;
    min-height: 100vh;
    margin-bottom: 100px;
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
const CsLabel = styled(Text)`
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 14px;
`
export default FormTabOne
