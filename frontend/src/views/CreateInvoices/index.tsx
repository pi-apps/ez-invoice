import React from "react";
import PageFullWidth from "components/Layout/PageFullWidth";
import styled from "styled-components";
import Container from "components/Layout/Container";
import HeaderCreateinVoice from "./components/HeaderCreateinVoice";
import SubTab from "./components/SubTab";
import { GetTabInvoice } from "state/invoice";
import Footer from "./components/Footer";

const CreateInvoices = () => {
    const [ dataTabActive ] = GetTabInvoice()
    const isActive = dataTabActive?.isActive
    return (
        <PageFullWidth>
            <CsContainer>
                <HeaderCreateinVoice />
                <SubTab isActive={isActive}/>
                <Footer isActive={isActive}/>
            </CsContainer>
        </PageFullWidth>
    )
}
export default CreateInvoices

const CsContainer = styled(Container)`
    width: 100%;
    @media only screen and (max-width: 600px) {
        padding: 0px 10px;
    }
`