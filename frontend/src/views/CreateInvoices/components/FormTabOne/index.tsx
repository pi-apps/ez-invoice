import React, { useEffect } from 'react'
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
import { ContainerInput, CsInput, CsTextArea, FormSubmit, WrapInput, CsInputFile, ContainerInputFile } from "../styles"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux'
import { AddIcon } from 'components/Svg'

const FormTabOne = ({formState:{errors},getValues, control, setValue}) => {
  const dispatch = useDispatch()
  const [avatar, setAvatar] = useState('')
  const [checkError, setCheckError] = useState(false)
  const [getMessageError, setMessageError] = useState()
  const [startDate, setStartDate] = useState(new Date());
  const [startDueDate, setStartDueDate] = useState(new Date());

//   const InitValues = {
//     senderEmail: '',
//     billFrom:'',
//     billTo:'',
//     shipTo: '',
//     issueDate: new Date(),
//     dueDate: new Date(),
//     paymentTerms:'',
//     poNumber:'',
//     items:'',
//     notes:'',
//     terms:'',
//     tax:'',
//     taxType:'',
//     discount:'',
//     shipping:'',
//     amountPaid:'',
//     logo:'',
// }

  const handleChange = (newValue: null) => {
    setValue(newValue);
  };

  useEffect(() => {
    setAvatar(`/images/ImgPi/logo.png`)
  }, [])

  return (
    <CsContainer >
            <CsFlex>
                {/* Invoice number */}
                {/* <Flex width='100%'>
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
                </ContainerInput> */}

                {/* Add your logo */}
                {/* <ContainerInputFile mt="1rem">
                    <WrapInput style={{background: 'transparent', marginTop: '1rem'}}>
                        <Controller
                            control={control}
                            name="invoicenumber"
                            // rules={rules.invoicenumber}
                            render={({ field }) => (
                            <CsInputFile style={{padding: '0'}}
                                name="invoicenumber"
                                type="file"
                                placeholder=""
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="invoicenumber" />
                </ContainerInputFile> */}

                {/* Sender Email */}
                <Flex width='100%'>
                    <CsLabel mt="1rem" color="#64748B">Sender email</CsLabel>
                </Flex>
                <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="senderEmail"
                            // rules={rules.senderEmail}
                            render={({ field }) => (
                            <CsInput
                                value={getValues('senderEmail')}
                                name="senderEmail"
                                type="text"
                                // value={field.value}
                                
                                placeholder="Sender email"
                                onChange={(event) => setValue("senderEmail", event.target.value)}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="senderEmail" />
                </ContainerInput>

                {/* Bill From */}
                <Flex width='100%'>
                    <CsLabel mt="1rem" color="#64748B">Bill From</CsLabel>
                  </Flex>
                <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="billFrom"
                            // rules={rules.sender}
                            render={({ field }) => (
                            <CsTextArea
                                name="billFrom"
                                // type="text"
                                placeholder="Who is this invoice from? (required)"
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="billFrom" />
                </ContainerInput>

                {/* Bill To */}
                  <Flex width='100%'>
                    <CsLabel mt="1rem" color="#64748B">Bill To</CsLabel>
                  </Flex>
                  <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="billTo"
                            // rules={rules.billto}
                            render={({ field }) => (
                            <CsTextArea
                                name="billTo"
                                // type="text"
                                placeholder="Who is this invoice from? (required)"
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="billTo" />
                </ContainerInput>

                    {/* Ship To */}
                  <Flex width='100%'>
                    <CsLabel mt="1rem" color="#64748B">Ship To</CsLabel>
                  </Flex>
                <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="shipTo"
                            render={({ field }) => (
                            <CsTextArea
                                name="shipTo"
                                // value={getValues('shipTo')}
                                // type="text"
                                placeholder="(Optional)"
                                onChange={field.onChange}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="shipTo" />
                </ContainerInput>

                <Row className="mb-1 mt-1">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Flex width='100%'>
                            <CsLabel mt="1rem" color="#64748B">Date</CsLabel>
                        </Flex>
                        <WrapInput>
                            <Controller 
                                control={control}
                                name="issueDate"
                                // type="text"
                                render={({ field }) => (
                                    <>
                                        <CsDatePicker
                                        selected={startDate} onChange={(date:any) => setStartDate(date)} />
                                        <CsImageDatePicker src="/images/imgPi/Group.png" alt="" role="presentation" />
                                    </>

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
                                name="paymentTerms"
                                render={({ field }) => (
                                <CsInput
                                    name="paymentTerms"
                                    value={getValues('paymentTerms')}
                                    // type="text"
                                    placeholder="Payment"
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
                                name="dueDate"
                                // type="text"
                                render={({ field }) => (
                                    <>
                                        <CsDatePicker
                                        selected={startDueDate} onChange={(date:any) => setStartDueDate(date)} />
                                        <CsImageDatePicker src="/images/imgPi/Group.png" alt="" role="presentation" />
                                    </>
                                )}
                            />
                        </WrapInput>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Flex width='100%'>
                            <CsLabel mt="1rem" color="#64748B">PO Number</CsLabel>
                        </Flex>
                        <WrapInput>
                            <Controller
                                control={control}
                                name="poNumber"
                                render={({ field }) => (
                                <CsInput
                                    name="poNumber"
                                    value={getValues('poNumber')}
                                    // type="text"
                                    placeholder="PO Number"
                                    onChange={field.onChange}
                                />
                                )}
                            />
                            </WrapInput>
                    </Form.Group>
                </Row>

                <ErrorMessages errors={errors} name="poNumber" />

                { checkError === true && 
                    <CustomMessageError>{getMessageError}</CustomMessageError> 
                }
            </CsFlex>
    </CsContainer>
  )
}

const CsDatePicker = styled(DatePicker)`
    background: #F8F9FD;
    border-radius: 10px;
    border: none;
    height: 56px;
    width: 100%;
    font-size: 12px;
    /* color: #94A3B8; */
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
    width: 14px;
    height: 14px;
    position: absolute;
    right: 20px;
    top: 17px;
`
const CsButtonAdd = styled(Button)`
  width: fit-content;
  margin-top: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #E2E8F0;
`
const CsAddIcon = styled(AddIcon)`
  margin-right: 10px;
`
const CsText = styled(Text)`
  font-size: 12px;
  color: #FFFFFF;
  font-weight: 700;
  margin-left: 10px;
`
export default FormTabOne
