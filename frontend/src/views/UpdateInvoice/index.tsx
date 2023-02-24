import React, { useState } from "react";
import PageFullWidth from "components/Layout/PageFullWidth";
import styled from "styled-components";
import Container from "components/Layout/Container";
import HeaderCreateinVoice from "views/CreateInvoices/components/HeaderCreateinVoice";
import SubTab from "views/CreateInvoices/components/SubTab";
import { GetTabInvoice } from "state/invoice";
import Footer from "views/CreateInvoices/components/Footer";
import TranSlatorModal from "components/TranSlatorModal/TranSlatorModal";
import { useParams } from "react-router-dom";

const UpdateInvoices = () => {
    const [ dataTabActive ] = GetTabInvoice()
    const isActive = dataTabActive?.isActive
    const [invoice, setInvoice] = useState('')
    let { invoiceId } = useParams()
    
    return (
        <TranSlatorModal>
            <PageFullWidth>
                <CsContainer>
                    <HeaderCreateinVoice />
                    <SubTab setInvoiceId={setInvoice} isActive={isActive} invoiceId={invoiceId}/>
                </CsContainer>
            </PageFullWidth>
        </TranSlatorModal>
    )
}
export default UpdateInvoices

const CsContainer = styled(Container)`
    width: 100%;
    @media only screen and (max-width: 600px) {
        padding: 0px 10px;
    }
`