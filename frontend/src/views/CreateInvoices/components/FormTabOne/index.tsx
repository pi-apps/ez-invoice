import { Button, Flex, Text } from "@phamphu19498/pibridge_uikit";
import ErrorMessages from "components/ErrorMessages/ErrorMessage";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { ContainerInput, CsInput, CsTextArea, WrapInput } from "../styles";
// import Form from 'react-bootstrap/Form';
import { AddIcon } from "components/Svg";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import ReactImageUpload from "./ReactImageUpload";
import { Translate } from "react-auto-translate";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import { LanguagesContext } from "contexts/Translate";

const FormTabOne = ({ formState: { errors }, control, setValue, images }) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [checkError, setCheckError] = useState(false);
  const [getMessageError, setMessageError] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [startDueDate, setStartDueDate] = useState(new Date());
  const { language, setLanguage } = useContext(LanguagesContext);
  const [stateTextPlaceholder, setStateTextPlaceholder] = useState({
    billFrom: "Who is this invoice from? (required)",
    billTo: "Who is this invoice from? (required)",
    payment: "Payment",
    poNumber: "PO Number",
  });

  const listTextPlaceHolder = {
    billFrom: "Who is this invoice from? (required)",
    billTo: "Who is this invoice from? (required)",
    payment: "Payment",
    poNumber: "PO Number",
  };

  const changeTextPlaceHolderLg = async () => {
    const resBillFrom = await GetTranslateHolder(
      listTextPlaceHolder.billFrom,
      language
    );
    const resBillTo = await GetTranslateHolder(
      listTextPlaceHolder.billTo,
      language
    );
    const resPayment = await GetTranslateHolder(
      listTextPlaceHolder.payment,
      language
    );
    const resPoNumber = await GetTranslateHolder(
      listTextPlaceHolder.poNumber,
      language
    );

    setStateTextPlaceholder({
      billFrom: resBillFrom,
      billTo: resBillTo,
      payment: resPayment,
      poNumber: resPoNumber,
    });
  };

  useEffect(() => {
    language ? changeTextPlaceHolderLg() : null;
  }, [language]);

  useEffect(() => {
    setAvatar(`/images/ImgPi/logo.png`);
  }, []);

  return (
    <CsContainer>
      <CsFlex>
        {/* Invoice number */}
        <Flex width="100%">
          <CsLabel mt="1rem" color="#64748B">
            <Translate>Invoice number</Translate>
          </CsLabel>
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
        <ReactImageUpload images={images} setValue={setValue} />

        {/* Sender Email */}
        <Flex width="100%">
          <CsLabel mt="1rem" color="#64748B">
            <Translate>Sender email</Translate>
          </CsLabel>
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
                  placeholder="Sender email"
                  onChange={(event) =>
                    setValue("senderEmail", event.target.value)
                  }
                />
              )}
            />
          </WrapInput>
          <ErrorMessages errors={errors} name="senderEmail" />
        </ContainerInput>

        {/* Bill From */}
        <Flex width="100%">
          <CsLabel mt="1rem" color="#64748B">
            <Translate>Bill From</Translate>
          </CsLabel>
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
                  // placeholder="Who is this invoice from? (required)"
                  placeholder={`${stateTextPlaceholder.billFrom}`}
                  onChange={(event) => setValue("billFrom", event.target.value)}
                />
              )}
            />
          </WrapInput>
          <ErrorMessages errors={errors} name="billFrom" />
        </ContainerInput>

        {/* Bill To */}
        <Flex width="100%">
          <CsLabel mt="1rem" color="#64748B">
            <Translate>Bill To</Translate>
          </CsLabel>
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
                  placeholder={`${stateTextPlaceholder.billTo}`}
                  onChange={(event) => setValue("billTo", event.target.value)}
                />
              )}
            />
          </WrapInput>
          <ErrorMessages errors={errors} name="billTo" />
        </ContainerInput>

        {/* Ship To */}
        <Flex width="100%">
          <CsLabel mt="1rem" color="#64748B">
            <Translate>Ship To</Translate>
          </CsLabel>
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
          <Flex width="100%">
            <CsLabel mt="1rem" color="#64748B">
              <Translate>Date</Translate>
            </CsLabel>
          </Flex>
          <WrapInput>
            <Controller
              control={control}
              name="issueDate"
              // type="text"
              render={({ field }) => (
                <>
                  <CsDatePicker
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                  />
                  {/* <CsImageDatePicker src="/images/imgPi/Group.png" alt="" role="presentation" /> */}
                </>
              )}
            />
          </WrapInput>
          <Flex width="100%">
            <CsLabel mt="1rem" color="#64748B">
              <Translate>Payment</Translate>
            </CsLabel>
          </Flex>
          <WrapInput>
            <Controller
              control={control}
              name="paymentTerms"
              render={({ field }) => (
                <CsInput
                  name="paymentTerms"
                  value={field.value}
                  // type="text"
                  placeholder={`${stateTextPlaceholder.payment}`}
                  onChange={field.onChange}
                />
              )}
            />
          </WrapInput>
        </Row>

        <Row className="mb-1 mt-1">
          <Flex width="100%">
            <CsLabel mt="1rem" color="#64748B">
              <Translate>Due Date</Translate>
            </CsLabel>
          </Flex>
          <WrapInput>
            <Controller
              control={control}
              name="dueDate"
              // type="text"
              render={({ field }) => (
                <>
                  <CsDatePicker
                    selected={startDueDate}
                    onChange={(date: any) => setStartDueDate(date)}
                  />
                  {/* <CsImageDatePicker src="/images/imgPi/Group.png" alt="" role="presentation" /> */}
                </>
              )}
            />
          </WrapInput>

          <Flex width="100%">
            <CsLabel mt="1rem" color="#64748B">
              <Translate>PO Number</Translate>
            </CsLabel>
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
                  placeholder={`${stateTextPlaceholder.poNumber}`}
                  onChange={field.onChange}
                />
              )}
            />
          </WrapInput>
          {/* <Flex width="100%" mt="1rem">
                            <Button 
                            // disabled={!isValid}
                                width="100%"
                                type="submit"
                                value="Submit"
                            >
                                Confirm
                            </Button>
                        </Flex> */}
        </Row>

        <ErrorMessages errors={errors} name="poNumber" />

        {checkError === true && (
          <CustomMessageError>
            <Translate>{getMessageError}</Translate>
          </CustomMessageError>
        )}
      </CsFlex>
    </CsContainer>
  );
};

const CsDatePicker = styled(DatePicker)`
  background: #f8f9fd;
  border-radius: 10px;
  border: none;
  height: 56px;
  width: 100%;
  font-size: 12px;
  /* color: #94A3B8; */
`;
const CsContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 30px;
  @media only screen and (max-width: 600px) {
    padding: 0px 10px;
  }
`;
const CustomMessageError = styled.div`
  color: ${({ theme }) => theme.colors.primaryBright};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1;
  margin-top: 5px;
  margin-left: 35px;
`;
const CsLabel = styled(Text)`
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 14px;
`;
const CsFlex = styled(Flex)`
  height: calc(100vh - 250px);
  flex-direction: column;
  overflow: scroll;
  padding: 12px;
  width: 100%;
`;
const CsImageDatePicker = styled.img`
  width: 14px;
  height: 14px;
  position: absolute;
  right: 20px;
  top: 17px;
`;
const CsButtonAdd = styled(Button)`
  width: fit-content;
  margin-top: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
`;
const CsAddIcon = styled(AddIcon)`
  margin-right: 10px;
`;
const CsText = styled(Text)`
  font-size: 12px;
  color: #ffffff;
  font-weight: 700;
  margin-left: 10px;
`;
export default FormTabOne;
