import React from "react";
import PageFullWidth from "components/Layout/PageFullWidth";
import styled from "styled-components";
import Container from "components/Layout/Container";
import Header from "./components/Header";
import SubTab from "./components/SubTab";
import { GetDataInvoice } from "state/invoice";
const Invoices = () => {
    const [ dataInvoice ] = GetDataInvoice()
    return (
        <PageFullWidth>
            <CsContainer>
                <Header/>
                <SubTab isSent={dataInvoice?.isSent}/>
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