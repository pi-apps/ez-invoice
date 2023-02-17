import { Button, Flex, Text } from "@phamphu19498/pibridge_uikit";
import CloseIcon from "components/Svg/Icons/CloseIcon";
import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { Translate } from "react-auto-translate";
import { LanguagesContext } from "contexts/Translate";
import { GetTranslateHolder } from "hooks/TranSlateHolder";

const Card = ({ formState, setValue, control, index }) => {
  // const amountTotal = amount * price
  // function handleChangeAmount(event) {
  //   setAmount(event.target.value)
  //   // console.log(event.target.value);
  // }
  // function handleChangePrice(event) {
  //   setPrice(event.target.value)
  //   // console.log(event.target.value);
  // }

  const { language, setLanguage } = useContext(LanguagesContext);
  const [stateTextPlaceholder, setStateTextPlaceholder] = useState({
    item: "Description of service or product",
  });

  const listTextPlaceHolder = {
    item: "Description of service or product",
  };

  const changeTextPlaceHolderLg = async () => {
    const resItem = await GetTranslateHolder(
      listTextPlaceHolder.item,
      language
    );

    setStateTextPlaceholder({
      item: resItem,
    });
  };

  useEffect(() => {
    language ? changeTextPlaceHolderLg() : null;
  }, [language]);

  return (
    <CsWrapperCard>
      <CsHeading>
        <CsFlexHeading>
          <CsTextHeading>
            <Translate>Item</Translate>
          </CsTextHeading>
          <CsCloseIcon>
            <CloseIcon />
          </CsCloseIcon>
        </CsFlexHeading>
      </CsHeading>
      <CsContent>
        {/* <CsTextArea placeholder='Description of service or product' /> */}
        <ContainerInput>
          <WrapInput>
            <Controller
              control={control}
              name="name"
              // rules={rules.sender}
              render={({ field }) => (
                <CsTextArea
                  name="name"
                  value={field.value}
                  placeholder={`${stateTextPlaceholder.item}`}
                  onChange={(event) => setValue("name", event.target.value)}
                />
              )}
            />
          </WrapInput>
        </ContainerInput>

        <CsRowINput>
          <WrapInput>
            <Controller
              control={control}
              name="quantity"
              // rules={rules.sender}
              render={({ field }) => (
                <CsInput
                  name="quantity"
                  value={field.value}
                  placeholder="1"
                  onChange={(event) => setValue("quantity", event.target.value)}
                />
              )}
            />
          </WrapInput>
          <WrapInput>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <CsInput
                  name="price"
                  value={field.value}
                  placeholder="0.00 Pi"
                  onChange={(event) => setValue("price", event.target.value)}
                />
              )}
            />
          </WrapInput>
        </CsRowINput>
      </CsContent>
      <Flex mt="24px">
        <Cstitle>
          <Translate>Amount:</Translate>
        </Cstitle>
        <CsAmount> Pi</CsAmount>
      </Flex>
    </CsWrapperCard>
  );
};
const CsCloseIcon = styled(Button)`
  background: transparent;
  padding: 0;
  width: 20px;
  height: 20px;
`;
const Cstitle = styled(Text)`
  color: #94a3b8;
`;
const CsAmount = styled(Text)`
  color: #0f172a;
  margin-left: 4px;
`;

const CsTextHeading = styled(Text)`
  font-size: 16px;
  color: #64748b;
  font-weight: 700;
`;

const CsWrapperCard = styled.div`
  width: 100%;
  padding: 21px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 24px;
`;
const CsHeading = styled(Text)`
  font-size: 16px;
`;
const CsContent = styled(Text)`
  font-size: 16px;
  margin-top: 24px;
`;
const ContainerInput = styled(Flex)`
  flex-direction: column;
  width: 100%;
  background-color: #f8f9fd;
  border-radius: 8px;
`;
const WrapInput = styled(Flex)`
  position: relative;
  background-color: #f8f9fd;
  border-radius: 10px;
  width: 100%;
  input {
    padding: 10px;
  }
`;
export const CsTextArea = styled.textarea`
  background: #f8f9fd;
  border: none;
  padding-left: 10px;
  border-radius: 10px;
  width: 100%;
  height: 100px;
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
const CsFlexHeading = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;
const CsRowINput = styled(Flex)`
  margin-top: 24px;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;
const CsInput = styled.input`
  gap: 8px;
  height: 56px;
  width: 100%;
  padding: 8px 16px;
  background: #f8f9fd;
  border-radius: 12px;
  font-size: 14px;
  border: none;
  color: #0f172a;
  &::placeholder {
    color: #94a3b8;
    font-size: 12px;
    font-weight: 600;
  }
`;
const CsNumericFormat = styled(NumberFormat)`
  &:focus-visible {
    outline: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 1;
  }
`;
export default Card;
