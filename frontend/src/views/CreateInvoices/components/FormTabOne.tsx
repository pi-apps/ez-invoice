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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const FormTabOne = () => {
  const [checkError, setCheckError] = useState(false)
  const [getMessageError, setMessageError] = useState('')
  const [startDate, setStartDate] = useState(new Date());
  const [startDueDate, setStartDueDate] = useState(new Date());
  console.log('startDate', startDate.getTime())
  // form validation rules 
  const validationSchema = Yup.object().shape({
      invoicenumber: Yup.string().required('invoicenumber is required').min(4, 'invoicenumber are between 4 and 160 characters in length').max(160, 'Emails are between 4 and 160 characters in length'),
      file: Yup.string().required('file is required').max(100, 'file max 100 characters in length'),
      sender: Yup.string().required('sender is required').max(100, 'sender max 100 characters in length'),
      billto: Yup.string().required('billto is required'),
      shipto: Yup.string().required('shipto is required'),
      date: Yup.string().required('date is required'),
      duedate: Yup.string().required('date is required'),
      payment: Yup.string().required('payment is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { handleSubmit, formState, control, getValues } = useForm({ 
        defaultValues: {
            invoicenumber: '',
            file: '',
            sender: '',
            billto:'',
            shipto: '',
            date: new Date(),
            duedate: new Date(),
            payment:'',
        }});
  const { errors } = formState;

  const [value, setValue] = React.useState<null>(
  );

  const handleChange = (newValue: null) => {
    setValue(newValue);
  };
  return (
    <PageFullWidth>
    <CsContainer >
        <FormSubmit>
            <CsFlex>
                {/* Invoice number */}
                <Flex width='100%'>
                    <CsLabel mt="1rem" color="#64748B">Invoice number</CsLabel>
                </Flex>
                <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="invoicenumber"
                            // rules={rules.invoicenumber}
                            render={({ field }) => (
                            <CsInput
                                name="invoicenumber"
                                type="text"
                                placeholder=""
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="invoicenumber" />
                </ContainerInput>

                {/* Add your logo */}
                <ContainerInputFile mt="2rem">
                    <Controller
                        control={control}
                        name="file"
                        // rules={rules.file}
                        render={({ field }) => (
                                <CsInputFile
                                    name="file"
                                    id="upload-photo"
                                    type="file"
                                    placeholder="Add your logo"
                                    // onChange={field.onChange}
                                />
                        )}
                    />
                    <ErrorMessages errors={errors} name="file" />
                </ContainerInputFile>

                <ContainerInput mt="2rem">
                    <WrapInput>
                        <Controller
                            control={control}
                            name="sender"
                            // rules={rules.sender}
                            render={({ field }) => (
                            <CsTextArea
                                name="sender"
                                // type="text"
                                placeholder="Who is this invoice from? (required)"
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="sender" />
                </ContainerInput>

                {/* Bill To */}
                  <Flex width='100%'>
                    <CsLabel mt="1rem" color="#64748B">Bill To</CsLabel>
                  </Flex>
                  <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="billto"
                            // rules={rules.billto}
                            render={({ field }) => (
                            <CsTextArea
                                name="billto"
                                // type="text"
                                placeholder="Who is this invoice from? (required)"
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="billto" />
                </ContainerInput>

                    {/* Bill To */}
                  <Flex width='100%'>
                    <CsLabel mt="1rem" color="#64748B">Ship To</CsLabel>
                  </Flex>
                <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="shipto"
                            render={({ field }) => (
                            <CsTextArea
                                name="shipto"
                                // value={getValues('email')}
                                // type="text"
                                placeholder="(Optional)"
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="shipto" />
                </ContainerInput>

                {/* <WrapperDate>
                    <Flex width='100%'>
                        <CsLabel mt="1rem" color="#64748B">Date</CsLabel>
                    </Flex>
                    <CsRow>
                        <CsCol>
                            <WrapInput>
                                <Controller 
                                    control={control}
                                    name="date"
                                    // type="text"
                                    render={({ field }) => (
                                        <CsDatePicker
                                        selected={startDate} onChange={(date:any) => setStartDate(date)} />
                                    )}
                                />
                            </WrapInput>
                        </CsCol>
                    </CsRow>
                </WrapperDate>
                <WrapperPayment>
                    <CsRow>
                        <CsCol>
                            <Flex width='100%'>
                                <CsLabel mt="1rem" color="#64748B">Payment</CsLabel>
                            </Flex>
                            <ContainerInput>
                                <WrapInput>
                                <Controller
                                    control={control}
                                    name="payment"
                                    render={({ field }) => (
                                    <CsInput
                                        name="payment"
                                        value={getValues('payment')}
                                        // type="text"
                                        placeholder="123"
                                        onChange={field.onChange}
                                    />
                                    )}
                                />
                            </WrapInput>
                            </ContainerInput>
                        </CsCol>
                    </CsRow>
                </WrapperPayment> */}

                <Row className="mb-1 mt-1">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Flex width='100%'>
                            <CsLabel mt="1rem" color="#64748B">Date</CsLabel>
                        </Flex>
                        <WrapInput>
                            <Controller 
                                control={control}
                                name="date"
                                // type="text"
                                render={({ field }) => (
                                    <CsDatePicker
                                    selected={startDate} onChange={(date:any) => setStartDate(date)} />
                                )}
                            />
                        </WrapInput>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Flex width='100%'>
                            <CsLabel mt="1rem" color="#64748B">Payment</CsLabel>
                        </Flex>
                        <WrapInput>
                            <Controller
                                control={control}
                                name="payment"
                                render={({ field }) => (
                                <CsInput
                                    name="payment"
                                    value={getValues('payment')}
                                    // type="text"
                                    placeholder="123"
                                    onChange={field.onChange}
                                />
                                )}
                            />
                            </WrapInput>
                    </Form.Group>
                </Row>

                <Row className="mb-1 mt-1">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Flex width='100%'>
                            <CsLabel mt="1rem" color="#64748B">Due Date</CsLabel>
                        </Flex>
                        <WrapInput>
                            <Controller 
                                control={control}
                                name="duedate"
                                // type="text"
                                render={({ field }) => (
                                    <CsDatePicker
                                    selected={startDueDate} onChange={(date:any) => setStartDueDate(date)} />
                                )}
                            />
                        <CsImageDatePicker src="/images/imgPi/Group.png" alt="" />
                        </WrapInput>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Flex width='100%'>
                            <CsLabel mt="1rem" color="#64748B">PO Number</CsLabel>
                        </Flex>
                        <WrapInput>
                            <Controller
                                control={control}
                                name="payment"
                                render={({ field }) => (
                                <CsInput
                                    name="payment"
                                    value={getValues('payment')}
                                    // type="text"
                                    placeholder="123"
                                    onChange={field.onChange}
                                />
                                )}
                            />
                            </WrapInput>
                    </Form.Group>
                </Row>

                <ErrorMessages errors={errors} name="payment" />

                { checkError === true && 
                    <CustomMessageError>{getMessageError}</CustomMessageError> 
                }
            </CsFlex>
        </FormSubmit>
    </CsContainer>
</PageFullWidth>
  )
}
const CsRow = styled(Flex)`
    align-items: center;
    gap: 10px;
`
const CsCol = styled(Flex)`
    width: 50%;
`
const  WrapperDate = styled.div`
    margin-top: 14px;
`
const  WrapperPayment = styled.div`
    margin-top: 14px;
`
const CsDatePicker = styled(DatePicker)`
    background: #F8F9FD;
    border-radius: 10px;
    border: none;
    height: 56px;
    width: 100%;
`
const CsContainer = styled(Flex)`
    width: 100%;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    padding: 0px 30px;
    @media only screen and (max-width: 600px) {
        padding: 0px 10px;
    }
    @media only screen and (min-width: 768px) {
        max-width: 600px;
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
const CsFlex = styled(Flex)`
    height: calc(100vh - 250px);
    flex-direction: column;
    overflow: scroll;
    padding: 12px;
    width: 100%;
`
const CsImageDatePicker = styled.img`
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
    top: 17px;
`

export default FormTabOne
