import React, { useState } from "react";
import PageFullWidth from "components/Layout/PageFullWidth";
import { Button, Flex, useModal } from "@devfedeltalabs/pibridge_uikit";
import styled from "styled-components";
import Container from "components/Layout/Container";
import HeaderMain from "components/Header";
import HeaderHistory from "./components/Header";
import { GetDataInvoice } from "state/invoice";
import CardHistory from "./components/CardHistory";
import Footer from "components/Footer";
import DeleteModal from "components/DeleteModal";

const data = [
    {
        id: 1,
        name: 'Pibridge',
        price: 11.00,
    },
    {
        id: 2,
        name: 'RUN',
        price: 11.00,
    },
    {
        id: 3,
        name: 'BAMI',
        price: 11.00,
    },
    {
        id: 4,
        name: 'Live trade',
        price: 11.00,
    },
    {
        id: 5,
        name: 'Pibridge',
        price: 11.00,
    },
    {
        id: 6,
        name: 'RUN',
        price: 11.00,
    },
    {
        id: 7,
        name: 'BAMI',
        price: 11.00,
    }
]
const History = () => {
    const [listHistory, setListHistory] = useState(data)
    const [openDeleteModal] = useModal(<DeleteModal/>);
    
    const handleDeleteItem = (item) => {
        openDeleteModal();
        setListHistory(
            listHistory?.filter((it) => it.id !== item)
            )
    }

    const handleDeleteAll = () => {
        setListHistory([])
    }

    return (
        <PageFullWidth>
            <CsContainer>
                <HeaderMain/>
                <HeaderHistory/>

                {/* list item */}
                <CsList>
                    {listHistory?.map((item) => {
                        return(
                            <CardHistory item={item} handleDeleteItem={handleDeleteItem}/>
                            )
                    })}
                </CsList>
                
                {/* delete all button */}
                <Flex width='100%' padding='0 12px'>
                    <CsButtonDeleteAll onClick={handleDeleteAll}>Delete all</CsButtonDeleteAll>
                </Flex>
                <Footer/>
            </CsContainer>
        </PageFullWidth>
    )
}

export default History

const CsContainer = styled(Container)`
    width: 100%;
    @media only screen and (max-width: 600px) {
        padding: 0px 10px;
    }
`
const CsList =  styled(Flex)`
    margin-top: 2rem;
    padding: 0 12px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    /* overflow-y: scroll;
    height: calc(100vh - 250px); */
`

const CsButtonDeleteAll = styled(Button)`
    width: 100%;
    height: 56px;
    background: #FFEEEE;
    border-radius: 12px;
    color: #CE1D1D;
    padding: 0 12px;
    margin-top: 20px;
`