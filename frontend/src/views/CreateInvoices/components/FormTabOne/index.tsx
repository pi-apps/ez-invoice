import { Button, Flex, Text } from "@devfedeltalabs/pibridge_uikit"
import ErrorMessages from "components/ErrorMessages/ErrorMessage"
import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Controller } from "react-hook-form"
import styled from "styled-components"
import { ContainerInput, CsInput, CsTextArea, WrapInput } from "../styles"
// import Form from 'react-bootstrap/Form';
import { AddIcon, DatePickerIcon } from 'components/Svg'
import { GetTranslateHolder } from "hooks/TranSlateHolder"
import { Translate } from "react-auto-translate"
import Row from 'react-bootstrap/Row'
import { useDispatch } from 'react-redux'
import { getLanguageTrans } from "state/LanguageTrans"
import ReactImageUpload from './ReactImageUpload'
import { getUser } from "state/user"
import { createInvoice_text } from "translation/languages/createInvoice_text"
import { createInvoiceTranslate, downloadTranslate } from "translation/translateArrayObjects"

const FormTabOne = ({formState:{errors, touchedFields}, control, setValue, images, invoicelength, startDueDate , setStartDueDate, startDate, setStartDate, getValues}) => {
    const [checkError, setCheckError] = useState(false)
    const [getMessageError, setMessageError] = useState()
    
    const DataAb = getUser();
    const languageUserApi = DataAb?.language
    
   // Translate
    const [stateText, setStateText] = useState(createInvoice_text);
    const requestTrans = async () => {
        try {
        const resData = await createInvoiceTranslate(languageUserApi);
        setStateText(resData)
        } catch (error) {
        console.log(error)
        }
    }
    useEffect(() => {
        if (languageUserApi) {
        requestTrans();
        } else if (!languageUserApi) {
        setStateText(createInvoice_text);
        }
    }, [languageUserApi]);
    const invoiceNumber = isNaN(invoicelength) ? 1 :  Number(invoicelength)+1
    return (
        <CsContainer >
                <CsFlex>
                    {/* Invoice number */}
                    <Flex width='100%'>
                        <CsLabel mt="1rem" color="#64748B">{stateText.text_invoice_number}</CsLabel>
                    </Flex>
                    <ContainerInput>
                        <WrapInput>
                            <Controller
                                control={control}
                                name="invoicenumber"
                                render={({ field }) => (
                                <CsInput
                                    name="invoicenumber"
                                    type="text"
                                    readOnly
                                    value={invoiceNumber}
                                    // placeholder={invoiceNumber}
                                    // defaultValue={invoiceNumber}
                                />
                                )}
                            />
                        </WrapInput>
                        <ErrorMessages errors={errors} name="invoicenumber" />
                    </ContainerInput>

                    {/* Add your logo */}
                    <ReactImageUpload 
                        images={images} 
                        setValue={setValue}
                    />
                    
                    {/* Sender Email */}
                    <Flex width='100%'>
                        <CsLabel mt="1rem" color="#64748B">{stateText.text_sender_email}</CsLabel>
                    </Flex>
                    <ContainerInput>
                        <WrapInput>
                            <Controller
                                control={control}
                                name="senderEmail"
                                defaultValue={getValues("senderEmail")}
                                render={({ field }) => (
                                    <>
                                    <CsInput
                                        name="senderEmail"
                                        // type="email"
                                        value={field.value}
                                        onBlur={field.onBlur}
                                        placeholder={`${stateText.text_pl_sender_email}`}
                                        onChange={field.onChange}
                                    />
                                    {errors.email && touchedFields.email && (
                                        <span>{errors.email.message}</span>
                                    )}
                                    </>
                                )}
                            />
                        </WrapInput>
                        <ErrorMessages errors={errors} name="senderEmail" />
                    </ContainerInput>

                    {/* Bill From */}
                    <Flex width='100%'>
                        <CsLabel mt="1rem" color="#64748B">{stateText.text_bill_from}</CsLabel>
                    </Flex>
                    <ContainerInput>
                        <WrapInput>
                            <Controller
                                control={control}
                                name="billFrom"
                                render={({ field }) => (
                                <CsTextArea
                                    name="billFrom"
                                    value={field.value}
                                    onBlur={field.onBlur}
                                    placeholder={`${stateText.text_pl_bill_from}`}
                                    onChange={field.onChange}
                                />
                                )}
                            />
                        </WrapInput>
                        <ErrorMessages errors={errors} name="billFrom" />
                    </ContainerInput>

                    {/* Bill To */}
                    <Flex width='100%'>
                        <CsLabel mt="1rem" color="#64748B">{stateText.text_bill_to}</CsLabel>
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
                                    onBlur={field.onBlur}
                                    placeholder={`${stateText.text_pl_bill_to}`}
                                    onChange={field.onChange}
                                />
                                )}
                            />
                        </WrapInput>
                        <ErrorMessages errors={errors} name="billTo" />
                    </ContainerInput>

                        {/* Ship To */}
                    <Flex width='100%'>
                        <CsLabel mt="1rem" color="#64748B">{stateText.text_ship_to}</CsLabel>
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
                                    onBlur={field.onBlur}
                                    placeholder={`(${stateText.text_pl_option})`}
                                    onChange={field.onChange}
                                />
                                )}
                            />
                        </WrapInput>
                        <ErrorMessages errors={errors} name="shipTo" />
                    </ContainerInput>

                    <Row className="mb-1 mt-1">
                        <Flex width="50%" flexDirection="column">
                            <Flex width='100%'>
                                <CsLabel mt="1rem" color="#64748B">{stateText.text_date}</CsLabel>
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
                                                id="issueDate"
                                                value={field.value}
                                                onBlur={field.onBlur}
                                                selected={startDate} onChange={(date:any) => {
                                                    setStartDate(date)
                                                }} />
                                                <CsImageDatePicker role="presentation" onClick={() => {document.getElementById('issueDate')?.focus() }}/>
                                            </>
                                        )}
                                    />
                                </WrapInput>
                                {startDate === null && (
                                    <Text mt='6px' color='#ff592c' fontSize='12px'><Translate>Issue date is required</Translate></Text>
                                )}
                                <ErrorMessages errors={errors} name="issueDate" />
                            </ContainerInput>
                        </Flex>
                        <Flex width="50%" flexDirection="column">
                            <Flex width='100%'>
                                <CsLabel mt="1rem" color="#64748B">{stateText.text_payment}</CsLabel>
                            </Flex>
                            <ContainerInput>
                                <WrapInput>
                                    <Controller
                                        control={control}
                                        name="paymentTerms"
                                        render={({ field }) => (
                                        <CsInput
                                            type="text"
                                            name="paymentTerms"
                                            value={field.value}
                                            onBlur={field.onBlur}
                                            placeholder={`${stateText.text_pl_payment}`}
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
                                <CsLabel mt="1rem" color="#64748B">{stateText.text_due_date}</CsLabel>
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
                                            <CsImageDatePicker role="presentation" onClick={() => {document.getElementById('dueDate')?.focus() }}/>
                                        </>
                                    )}
                                />
                            </WrapInput>
                            {startDueDate === null && (
                                <Text mt='6px' color='#ff592c' fontSize='12px'><Translate>Due date is required</Translate></Text>
                            )}
                            <ErrorMessages errors={errors} name="dueDate" />
                        </Flex>
                        <Flex width="50%" flexDirection="column">
                            <Flex width='100%'>
                                <CsLabel mt="1rem" color="#64748B">{stateText.text_po_number}</CsLabel>
                            </Flex>
                            <WrapInput>
                                <Controller
                                    control={control}
                                    name="poNumber"
                                    render={({ field }) => (
                                    <CsInput
                                        type="text"
                                        name="poNumber"
                                        value={field.value}
                                        onBlur={field.onBlur}
                                        onChange={field.onChange}
                                        placeholder={`${stateText.text_pl_po_number}`}
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
const CsImageDatePicker = styled(DatePickerIcon)`
    width: 16px;
    height: 16px;
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