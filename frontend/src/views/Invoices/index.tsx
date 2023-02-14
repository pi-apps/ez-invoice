import React from "react";
import PageFullWidth from "components/Layout/PageFullWidth";
import styled from "styled-components";
import Container from "components/Layout/Container";
import HeaderMain from "components/Header";
import HeaderInvoice from "./components/Header";
import SubTab from "./components/SubTab";
import { GetDataInvoice, UseGetAllInvoiceSentCore, GetAnInvoice } from "state/invoice";
import { Flex } from "@phamphu19498/pibridge_uikit";
import SentTab from "./SentTabContent/SentTab";
import Footer from "components/Footer";
import ReceiveTab from "./ReceiveContent/ReceiveTab";

const Invoices = () => {
    const [ dataInvoice ] = GetDataInvoice()
    const isSent = dataInvoice?.isSent
    
    const renderContent = (isSent) => {
        if(isSent){
            return <SentTab/>
        }
        if(!isSent){
            return <ReceiveTab />
        }
    }

   

    return (
        <PageFullWidth>
            <CsContainer>
                <HeaderMain/>
                <HeaderInvoice/>
                <SubTab isSent={dataInvoice?.isSent}/>
                <CsFlex>{renderContent(isSent)}</CsFlex>
                <Footer/>
            </CsContainer>
        </PageFullWidth>
    )
}

export default Invoices

const CsContainer = styled(Container)`
    width: 100%;
    @media only screen and (max-width: 600px) {
        padding: 0px 10px;
    }
`
const CsFlex =  styled(Flex)`
    margin-top: 1rem;
`