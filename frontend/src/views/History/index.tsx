import React, { Fragment, useEffect, useState } from "react";
import PageFullWidth from "components/Layout/PageFullWidth";
import { Button, Flex, useModal } from "@devfedeltalabs/pibridge_uikit";
import styled from "styled-components";
import Container from "components/Layout/Container";
import HeaderMain from "components/Header";
import { Translate } from "react-auto-translate";

import HeaderHistory from "./components/Header";
import { GetDataInvoice } from "state/invoice";
import CardHistory from "./components/CardHistory";
import Footer from "components/Footer";
import DeleteModal from "components/DeleteModal";
import { getAccessToken, getUser } from "state/user";
import { GetHistory, UseGetAllInvoiceHistoryCore } from "state/history";
import { fetchStatusPreview } from "state/preview/actions";
import { AppDispatch } from "state";
import { useDispatch } from "react-redux";
import { history_text } from "translation/languages/history_text";
import { historyTranslate } from "translation/translateArrayObjects";

const History = () => {
    const [openDeleteModal] = useModal(<DeleteModal/>);
    const token = getAccessToken()
  
    UseGetAllInvoiceHistoryCore(token)
    const dataHistory = GetHistory()

    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=> {
        dispatch(fetchStatusPreview({isPreview: false}))
    }, [])

    // Translate
    const DataAb = getUser();
    const languageUserApi = DataAb?.language
    const [stateText, setStateText] = useState(history_text);
    const requestTrans = async () => {
        try {
        const resData = await historyTranslate(languageUserApi);
        setStateText(resData)
        } catch (error) {
        console.log(error)
        }
    }
    useEffect(() => {
        if (languageUserApi) {
        requestTrans();
        } else if (!languageUserApi) {
        setStateText(history_text);
        }
    }, [languageUserApi]);
    
    return (
        <PageFullWidth>
            <CsContainer>
                <HeaderMain/>
                <HeaderHistory/>
                { dataHistory?.isLoading === true || dataHistory?.listItems === null ?
                    <Flex width="100%" justifyContent="center" mt="1.5rem">
                        {stateText.text_no_data}
                    </Flex>
                :
                    <CsList>
                        {dataHistory?.listItems.map((item) => {
                            return(
                                    <CardHistory items={item} loading={dataHistory?.isLoading}/>
                                )
                        })}
                    </CsList>
                }
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