import { Button, Flex, Text } from "@devfedeltalabs/pibridge_uikit"
import ErrorMessages from "components/ErrorMessages/ErrorMessage"
import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Controller } from "react-hook-form"
import styled from "styled-components"
import { ContainerInput, CsInput, CsTextArea, WrapInput } from "../styles"
// import Form from 'react-bootstrap/Form';
import { AddIcon } from 'components/Svg'
import Row from 'react-bootstrap/Row'
import { useDispatch } from 'react-redux'
import ReactImageUpload from './ReactImageUpload'
import { GetAllInvoice, UseGetAllInvoice, UseGetAllInvoiceSentCore } from "state/invoice"

const FormTabOne = ({formState:{errors}, control, setValue, images, invoicelength}) => {
  const dispatch = useDispatch()
  const [checkError, setCheckError] = useState(false)
  const [getMessageError, setMessageError] = useState()
  const [startDate, setStartDate] = useState(new Date());
  const [startDueDate, setStartDueDate] = useState(new Date());
  return (
    <CsContainer >
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
                                readOnly
                                placeholder={invoicelength ? invoicelength + 1 : ''}
                                defaultValue={invoicelength ? invoicelength + 1 : ''}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="invoicenumber" />
                </ContainerInput>

                {/* Add your logo */}
                <ReactImageUpload images={images} setValue={setValue}/>
                
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
                                name="senderEmail"
                                type="text"
                                value={field.value}
                                placeholder="Who is this invoice from?(required)"
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
                                value={field.value}
                                placeholder="Who is this invoice from? (required)"
                                onChange={(event) => setValue("billFrom", event.target.value)}
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
                                value={field.value}
                                placeholder="Who is this invoice to?(required)"
                                onChange={(event) => setValue("billTo", event.target.value)}
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
                                value={field.value}
                                placeholder="(Optional)"
                                onChange={(event) => setValue("shipTo", event.target.value)}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="shipTo" />
                </ContainerInput>

                <Row className="mb-1 mt-1">
                    <Flex width="50%" flexDirection="column">
                        <Flex width='100%'>
                            <CsLabel mt="1rem" color="#64748B">Date</CsLabel>
                        </Flex>
                        <ContainerInput>
                            <WrapInput>
                                <Controller 
                                    control={control}
                                    name="issueDate"
                                    // type="text"
                                    render={({ field }) => (
                                        <>
                                            <CsDatePicker 
                                            id="date"
                                            value={field.value}
                                            selected={startDate} onChange={(date:any) => setStartDate(date)} />
                                            <CsImageDatePicker src="/images/imgPi/Group.png" alt="" role="presentation" onClick={() => {document.getElementById('date')?.focus() }}/>
                                        </>
                                    )}
                                />
                            </WrapInput>
                            <ErrorMessages errors={errors} name="issueDate" />
                        </ContainerInput>
                    </Flex>
                    <Flex width="50%" flexDirection="column">
                        <Flex width='100%'>
                            <CsLabel mt="1rem" color="#64748B">Payment</CsLabel>
                        </Flex>
                        <ContainerInput>
                            <WrapInput>
                                <Controller
                                    control={control}
                                    name="paymentTerms"
                                    render={({ field }) => (
                                    <CsInput
                                        name="paymentTerms"
                                        value={field.value}
                                        // type="text"
                                        placeholder="Payment"
                                        onChange={field.onChange}
                                    />
                                    )}
                                />
                            </WrapInput>
                            <ErrorMessages errors={errors} name="paymentTerms" />
                        </ContainerInput>
                    </Flex>
                </Row>

                <Row className="mb-1 mt-1">
                    <Flex width="50%" flexDirection="column">
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
                                        id="dueDate"
                                        value={field.value}
                                        selected={startDueDate} onChange={(date:any) => setStartDueDate(date)} />
                                        <CsImageDatePicker src="/images/imgPi/Group.png" alt="" role="presentation" onClick={() => {document.getElementById('dueDate')?.focus() }}/>
                                    </>
                                )}
                            />
                        </WrapInput>
                        <ErrorMessages errors={errors} name="dueDate" />
                    </Flex>
                    <Flex width="50%" flexDirection="column">
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
                                    value={field.value}
                                    // type="text"
                                    placeholder="PO Number"
                                    onChange={field.onChange}
                                />
                                )}
                            />
                        </WrapInput>
                    <ErrorMessages errors={errors} name="poNumber" />
                    </Flex>
                </Row>

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
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
    &:hover{
        transform: translateY(0.5px);
    }
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
