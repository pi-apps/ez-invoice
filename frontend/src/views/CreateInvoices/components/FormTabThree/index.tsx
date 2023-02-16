import { Button, Flex, Image, Input, Text } from '@devfedeltalabs/pibridge_uikit'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from "react-hook-form"
import ErrorMessages from "components/ErrorMessages/ErrorMessage"
import Navbar from 'react-bootstrap/Navbar';
import * as Yup from 'yup'
import styled from 'styled-components'
import Row from 'components/Layout/Row';
import { useTranslation } from 'react-i18next';
import ChooseMethod from './ChooseMethod';
import { AddIcon2 } from 'components/Svg';
import { useState } from 'react';

const FormTabThree = ({formState:{errors}, control, setValue, activeTax, setActiveTax, activeDiscount, setActiveDiscount }) => {
    const [typeTax, setTypeTax] = useState(true)
    const [typeDiscount, setTypeDiscount] = useState(false)
    const [typeShipping, setTypeShipping] = useState(false)
 
    const { t } = useTranslation()
    
  return (
    <CsWrapperForm>
      <CsContainer>
            <CsFlex>
                {/* Notes */}
                <Flex width='100%'>
                    <CsLabel mt="1rem" color="#64748B">Notes</CsLabel>
                </Flex>
                <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="notes"
                            // rules={rules.invoicenumber}
                            render={({ field }) => (
                            <CsTextArea
                                name="notes"
                                // type="text"
                                placeholder="Description of service or product"
                                value={field.value}
                                onChange={(event) => setValue("notes", event.target.value)}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="notes" />
                </ContainerInput>
                
                  {/* Terms */}
                  <Flex width='100%'>
                    <CsLabel mt="2rem" color="#64748B">Terms</CsLabel>
                </Flex>
                <ContainerInput>
                    <WrapInput>
                        <Controller
                            control={control}
                            name="terms"
                            // rules={rules.invoicenumber}
                            render={({ field }) => (
                            <CsTextArea
                                name="terms"
                                placeholder="1"
                                value={field.value}
                                onChange={(event) => setValue("terms", event.target.value)}
                            />
                            )}
                        />
                    </WrapInput>
                    <ErrorMessages errors={errors} name="terms" />
                </ContainerInput>

                <hr style={{marginTop: '2rem'}}/>

                <CsContentInfo>
                    <Row mt="1rem" style={{justifyContent: "space-between"}}>
                        <CsTextLeft>{t('Subtotal')}</CsTextLeft>
                        <CsTextRight bold>0.00 Pi</CsTextRight>
                    </Row>
                    <Row mt="1rem" style={{justifyContent: "space-between"}}>
                        <ChooseMethod setActiveDiscount={setActiveDiscount} activeDiscount={activeDiscount} activeTax={activeTax} setActiveTax={setActiveTax} control={control} setValue={setValue} typeTax={typeTax} typeDiscount={typeDiscount} setTypeTax={setTypeTax} setTypeDiscount={setTypeDiscount} typeShipping={typeShipping} setTypeShipping={setTypeShipping}/>
                    </Row>

                    <Row mt="1rem" style={{justifyContent: "flex-end"}}>
                        {
                            !typeDiscount && (
                                <CsButtonAddTpye onClick={() => setTypeDiscount(true)}>
                                    <CsAddIcon/>
                                    <CsTextType>Discount</CsTextType>
                                </CsButtonAddTpye>
                            )
                        }
                        {!typeShipping && (
                            <CsButtonAddTpye onClick={() => setTypeShipping(true)}>
                                <CsAddIcon/>
                                <CsTextType>Shipping</CsTextType>
                            </CsButtonAddTpye>
                        )}
                        {!typeTax && (
                            <CsButtonAddTpye onClick={() => setTypeTax(true)}>
                                <CsAddIcon/>
                                <CsTextType>Tax</CsTextType>
                            </CsButtonAddTpye>
                        )}
                    </Row>

                    <Row mt="1rem" style={{justifyContent: "space-between"}}>
                        <CsTextLeft>Total</CsTextLeft>
                        <CsTextRight bold>105.00 Pi</CsTextRight>
                    </Row>
                    <Row mt="1rem" style={{justifyContent: "space-between"}}>
                        <CsTextLeft mr="2rem">Amount paid</CsTextLeft>
                          <CsAmountPaid>
                              <Controller
                                  control={control}
                                  name="amountPaid"
                                  // rules={rules.invoicenumber}
                                  render={({ field }) => (
                                  <CsInput  style={{textAlign: 'right', width: '100%'}}
                                      name="amountPaid"
                                      placeholder="0.00 Pi"
                                      value={field.value}
                                      onChange={(event) => setValue("amountPaid", event.target.value)}
                                  />
                                  )}
                              />
                          <ErrorMessages errors={errors} name="amountPaid" />
                          </CsAmountPaid>
                    </Row>
                    <Row mt="1rem" style={{justifyContent: "space-between"}}>
                        <CsTextLeft>Balance Due</CsTextLeft>
                        <CsTextRight bold>105.00 Pi</CsTextRight>
                    </Row>
                </CsContentInfo>
            </CsFlex>
      </CsContainer>

      <CsSubTotal>
        <Navbar.Brand href="/createDetail/EZ_1676358432642">
            <CsButtonAdd>
                <CsText>Preview</CsText>
            </CsButtonAdd>
        </Navbar.Brand>
      </CsSubTotal>
      </CsWrapperForm>
  )
}

const CsButtonAddTpye = styled(Button)`
  margin-left: 30px;
  background: transparent;
  padding: 0;
`
const CsTextType = styled(Text)`
  font-size: 12px;
  color: #6B39F4;
  font-weight: 700;
  margin-left: 6px;
`

const CsAddIcon = styled(AddIcon2)`
  margin-right: 8px;
`
const CsRowTax = styled(Flex)`
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    gap: 8px;
    width: 213px;
    height: 56px;
    background: #F8F9FD;
    border-radius: 12px;
`
const CsRowTaxLeft = styled(Flex)`
    align-items: center;
`
const CsRowTaxRight = styled(Flex)`
    align-items: center;
`
const CsAmountPaid = styled(Flex)`
    background: #F8F9FD;
    height: fit-content;
    border-radius: 12px;
    font-size: 12px;
    max-width: 220px;
    padding: 0px 16px;
    text-align: right;
    gap: 8px;
    flex: 1;
`

const CsFlex = styled(Flex)`
    /* height: calc(100vh - 250px); */
    flex-direction: column;
    overflow: scroll;
    padding: 12px 24px;
    width: 100%;
`

export const FormSubmit = styled.form`
  width: 100%;
`

const CsText = styled(Text)`
  font-size: 12px;
  color: #FFFFFF;
  font-weight: 700;
  margin-left: 10px;
`

const CsButtonAdd = styled(Button)`
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;
`

const CsSubTotal = styled.div`
  padding: 0 24px;
  flex-direction: column;
`

const CsWrapperForm = styled.div`
width: 100%;
`
const CsWrapperContent = styled.div`
  padding: 0 24px;
`

const CsContainer = styled(Flex)`
    height: calc(100vh - 330px);
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: scroll;
    width: 100%;
`
const CsLabel = styled(Text)`
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 14px;
`
const ContainerInput = styled(Flex)`
  flex-direction: column;
  width: 100%;
  /* background-color:#F8F9FD; */
  border-radius:8px;
  /* margin-bottom:1rem; */
`
const WrapInput = styled(Flex)`
  position: relative;
  background-color:#F8F9FD;
  border-radius: 10px;
  width: 100%;
  /* height: 56px; */
  input{
    padding: 10px;
  }
`
export const CsInput = styled(Input)`
  background: none;
  border: none;
  padding-left: 10px;
  border-radius: 0px;
  width: 100%;
  box-shadow: none;
  font-size:14px;
  height: 56px;
  &::placeholder{
    color: #94A3B8;
    font-weight: 400;
    font-size: 12px;
  }
  :focus:not(:disabled){
    box-shadow:none!important;
  }
`
export const CsTextArea = styled.textarea`
  background: none;
  border: none;
  padding-left: 10px;
  border-radius: 0px;
  width: 327px;
  height: 91px;
  resize: unset;
  padding: 10px;
  width: 100%;
  box-shadow: none;
  font-size:14px;
  &::placeholder{
    color: #94A3B8;
    font-weight: 400;
    font-size: 12px;
  }
  :focus:not(:disabled){
    box-shadow:none!important;
  }
`
const CsContentInfo = styled.div``
const CsTextLeft = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  color: #94A3B8;
  font-size: 12px;
`
const CsTextRight = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  color: #0F172A;
  font-size: 12px;
  white-space: nowrap;
`

export default FormTabThree