import React, { useState } from "react";
import PageFullWidth from "components/Layout/PageFullWidth";
import styled from "styled-components";
import Container from "components/Layout/Container";
import HeaderCreateinVoice from "./components/HeaderCreateinVoice";
import SubTab from "./components/SubTab";
import { GetTabInvoice } from "state/invoice";
import Footer from "./components/Footer";
import TranSlatorModal from "components/TranSlatorModal/TranSlatorModal";

const CreateInvoices = () => {
    const [ dataTabActive ] = GetTabInvoice()
    const isActive = dataTabActive?.isActive
    const [invoiceId, setInvoiceId] = useState('')
    return (
        <TranSlatorModal>
            <PageFullWidth>
                <CsContainer>
                    <HeaderCreateinVoice />
                    <SubTab setInvoiceId={setInvoiceId} isActive={isActive}/>
                    <Footer invoiceId={invoiceId} isActive={isActive}/>
                </CsContainer>
            </PageFullWidth>
        </TranSlatorModal>
    )
}
export default CreateInvoices

const CsContainer = styled(Container)`
    width: 100%;
    @media only screen and (max-width: 600px) {
        padding: 0px 10px;
    }
`