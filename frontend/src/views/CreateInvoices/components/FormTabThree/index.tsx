import { Button, Flex, Image, Input, Text } from "@phamphu19498/pibridge_uikit";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import ErrorMessages from "components/ErrorMessages/ErrorMessage";
import Navbar from "react-bootstrap/Navbar";
import * as Yup from "yup";
import styled from "styled-components";
import Row from "components/Layout/Row";
import { useTranslation } from "react-i18next";
import ChooseMethod from "./ChooseMethod";
import { AddIcon2 } from "components/Svg";
import { useContext, useEffect, useState } from "react";
import { Translate } from "react-auto-translate";
import { LanguagesContext } from "contexts/Translate";
import { GetTranslateHolder } from "hooks/TranSlateHolder";

const FormTabThree = ({ formState: { errors }, control, setValue }) => {
  const [typeTax, setTypeTax] = useState(true);
  const [typeDiscount, setTypeDiscount] = useState(false);
  const [typeShipping, setTypeShipping] = useState(false);

  const { language, setLanguage } = useContext(LanguagesContext);
  const [stateTextPlaceholder, setStateTextPlaceholder] = useState({
    notes:
      "Terms and conditions - late fees, payment methods, delivery schedule",
    terms:
      "Terms and conditions - late fees, payment methods, delivery schedule",
  });

  const listTextPlaceHolder = {
    notes:
      "Terms and conditions - late fees, payment methods, delivery schedule",
    terms:
      "Terms and conditions - late fees, payment methods, delivery schedule",
  };

  const changeTextPlaceHolderLg = async () => {
    const resNotes = await GetTranslateHolder(
      listTextPlaceHolder.notes,
      language
    );
    const resTerms = await GetTranslateHolder(
      listTextPlaceHolder.terms,
      language
    );

    setStateTextPlaceholder({
      notes: resNotes,
      terms: resTerms,
    });
  };

  useEffect(() => {
    language ? changeTextPlaceHolderLg() : null;
  }, [language]);

  return (
    <CsWrapperForm>
      <CsContainer>
        <CsFlex>
          {/* Notes */}
          <Flex width="100%">
            <CsLabel mt="1rem" color="#64748B">
              <Translate>Notes</Translate>
            </CsLabel>
          </Flex>
          <ContainerInput>
            <WrapInput>
              <Controller
                control={control}
                name="note"
                // rules={rules.invoicenumber}
                render={({ field }) => (
                  <CsTextArea
                    name="note"
                    // type="text"
                    placeholder={`${stateTextPlaceholder.notes}`}
                    onChange={field.onChange}
                  />
                )}
              />
            </WrapInput>
            <ErrorMessages errors={errors} name="note" />
          </ContainerInput>

          {/* Terms */}
          <Flex width="100%">
            <CsLabel mt="2rem" color="#64748B">
              <Translate>Terms</Translate>
            </CsLabel>
          </Flex>
          <ContainerInput>
            <WrapInput>
              <Controller
                control={control}
                name="term"
                // rules={rules.invoicenumber}
                render={({ field }) => (
                  <CsTextArea
                    name="term"
                    // type="text"
                    placeholder={`${stateTextPlaceholder.terms}`}
                    onChange={field.onChange}
                  />
                )}
              />
            </WrapInput>
            <ErrorMessages errors={errors} name="term" />
          </ContainerInput>

          <hr style={{ marginTop: "2rem" }} />

          <CsContentInfo>
            <Row mt="1rem" style={{ justifyContent: "space-between" }}>
              <CsTextLeft>
                <Translate>Subtotal</Translate>
              </CsTextLeft>
              <CsTextRight bold>0.00 Pi</CsTextRight>
            </Row>
            <Row mt="1rem" style={{ justifyContent: "space-between" }}>
              <ChooseMethod
                typeTax={typeTax}
                typeDiscount={typeDiscount}
                setTypeTax={setTypeTax}
                setTypeDiscount={setTypeDiscount}
                typeShipping={typeShipping}
                setTypeShipping={setTypeShipping}
              />
            </Row>

            <Row mt="1rem" style={{ justifyContent: "flex-end" }}>
              {!typeDiscount && (
                <CsButtonAddTpye onClick={() => setTypeDiscount(true)}>
                  <CsAddIcon />
                  <CsTextType>
                    <Translate>Discount</Translate>
                  </CsTextType>
                </CsButtonAddTpye>
              )}
              {!typeShipping && (
                <CsButtonAddTpye onClick={() => setTypeShipping(true)}>
                  <CsAddIcon />
                  <CsTextType>
                    <Translate>Shipping</Translate>
                  </CsTextType>
                </CsButtonAddTpye>
              )}
              {!typeTax && (
                <CsButtonAddTpye onClick={() => setTypeTax(true)}>
                  <CsAddIcon />
                  <CsTextType>
                    <Translate>Tax</Translate>
                  </CsTextType>
                </CsButtonAddTpye>
              )}
            </Row>

            <Row mt="1rem" style={{ justifyContent: "space-between" }}>
              <CsTextLeft>
                <Translate>Total</Translate>
              </CsTextLeft>
              <CsTextRight bold>105.00 Pi</CsTextRight>
            </Row>
            <Row mt="1rem" style={{ justifyContent: "space-between" }}>
              <CsTextLeft mr="2rem">
                <Translate>Amount paid</Translate>
              </CsTextLeft>
              <CsAmountPaid>0.00 Pi</CsAmountPaid>
            </Row>
            <Row mt="1rem" style={{ justifyContent: "space-between" }}>
              <CsTextLeft>
                <Translate>Balance Due</Translate>
              </CsTextLeft>
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
  );
};

const CsButtonAddTpye = styled(Button)`
  margin-left: 30px;
  background: transparent;
  padding: 0;
`;
const CsTextType = styled(Text)`
  font-size: 12px;
  color: #6b39f4;
  font-weight: 700;
  margin-left: 6px;
`;

const CsAddIcon = styled(AddIcon2)`
  margin-right: 8px;
`;
const CsRowTax = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  gap: 8px;
  width: 213px;
  height: 56px;
  background: #f8f9fd;
  border-radius: 12px;
`;
const CsRowTaxLeft = styled(Flex)`
  align-items: center;
`;
const CsRowTaxRight = styled(Flex)`
  align-items: center;
`;
const CsAmountPaid = styled(Text)`
  background: #f8f9fd;
  border-radius: 12px;
  font-size: 12px;
  max-width: 220px;
  padding: 20px 16px;
  text-align: right;
  gap: 8px;
  flex: 1;
`;

const CsFlex = styled(Flex)`
  /* height: calc(100vh - 250px); */
  flex-direction: column;
  overflow: scroll;
  padding: 12px 24px;
  width: 100%;
`;

export const FormSubmit = styled.form`
  width: 100%;
`;

const CsText = styled(Text)`
  font-size: 12px;
  color: #ffffff;
  font-weight: 700;
  margin-left: 10px;
`;

const CsButtonAdd = styled(Button)`
  margin-top: 12px;
  margin-bottom: 12px;
  width: 100%;
`;

const CsSubTotal = styled.div`
  padding: 0 24px;
  flex-direction: column;
`;

const CsWrapperForm = styled.div`
  width: 100%;
`;
const CsWrapperContent = styled.div`
  padding: 0 24px;
`;

const CsContainer = styled(Flex)`
  height: calc(100vh - 330px);
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: scroll;
  width: 100%;
`;
const CsLabel = styled(Text)`
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 14px;
`;
const ContainerInput = styled(Flex)`
  flex-direction: column;
  width: 100%;
  background-color: #f8f9fd;
  border-radius: 8px;
  /* margin-bottom:1rem; */
`;
const WrapInput = styled(Flex)`
  position: relative;
  background-color: #f8f9fd;
  border-radius: 10px;
  width: 100%;
  /* height: 56px; */
  input {
    padding: 10px;
  }
`;
export const CsInput = styled(Input)`
  background: none;
  border: none;
  padding-left: 10px;
  border-radius: 0px;
  width: 100%;
  box-shadow: none;
  font-size: 14px;
  height: 56px;
  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
    font-size: 12px;
  }
  :focus:not(:disabled) {
    box-shadow: none !important;
  }
`;
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
  font-size: 14px;
  &::placeholder {
    color: #94a3b8;
    font-weight: 400;
    font-size: 12px;
  }
  :focus:not(:disabled) {
    box-shadow: none !important;
  }
`;
const CsContentInfo = styled.div``;
const CsTextLeft = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  color: #94a3b8;
  font-size: 12px;
`;
const CsTextRight = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  color: #0f172a;
  font-size: 12px;
  white-space: nowrap;
`;

export default FormTabThree;
