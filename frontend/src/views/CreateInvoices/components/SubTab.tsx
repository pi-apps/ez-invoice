import { Button, Flex, Text } from "@phamphu19498/pibridge_uikit";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from 'state'
import { tabActiveNewInvoice } from "state/invoice/actions";
import { useState } from "react";
import FormTabOne from "./FormTabOne";
import FormTabTwo from "./FormTabTwo";
import FormTabThree from "./FormTabThree";

interface PropsSubTab{
    isActive:number
}

const SubTab:React.FC<PropsSubTab> = ({isActive}) => {
 
    const dispatch = useDispatch<AppDispatch>()

    const handleMinusTabActive = () => {
        if(isActive > 1 && isActive <= 3){
            dispatch(tabActiveNewInvoice({isActive: isActive - 1}))
        }
    }

    const handlePlusTabActive = () => {
        if( 1 <= isActive && isActive < 3 ){
            dispatch(tabActiveNewInvoice({isActive: isActive + 1}))
        }
    }

    const renderScreens = ( isActive) => {
        if(isActive === 1){
            return <FormTabOne/>
        }
        if(isActive === 2){
            return <FormTabTwo/>
        }
        if(isActive === 3){
            return <FormTabThree/>
        }
    }

    return (
        <>
        <HeadingTab>Create Invoice</HeadingTab>
        <ContainerSubTab>
            <CsButton onClick={handleMinusTabActive}>
                &lt;
            </CsButton>
            <CsTab>
                <TabButton isActive={isActive === 1} onClick={() => dispatch(tabActiveNewInvoice({isActive:1})) }>
                    1
                </TabButton>
                <TabButton isActive={isActive === 2} onClick={() => dispatch(tabActiveNewInvoice({isActive:2})) }>
                    2
                </TabButton>
                <TabButton isActive={isActive === 3} onClick={() => dispatch(tabActiveNewInvoice({isActive:3})) }>
                    3
                </TabButton>
            </CsTab>
            <CsButton onClick={handlePlusTabActive}>
                &gt;
            </CsButton>
        </ContainerSubTab>
        <Flex>{renderScreens(isActive)}</Flex>
        </>
    )
}
export default SubTab

const ContainerSubTab = styled(Flex)`
    width:100%;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding:0px 12px;
    margin-top:1rem;
    margin-bottom:1rem;
`
const CsTab = styled(Flex)`
    width: fit-content;
    align-items: center;
`
const CsButton = styled(Button)`
    background: transparent;
    border-radius: 50%;
    color: #94A3B8;
    font-size: 20px;
    height: 35px;
    width: 35px;
    padding: 0;
    &:hover{
        color: #6B39F4;
    }
    &:active{
        color: #6B39F4;
    }
`

const TabButton = styled(Flex)<{isActive:boolean}>`
    cursor: pointer;
    justify-content:center;
    align-items:center;
    height: 29px;
    width: 29px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 50%;
    margin: 0 5px;
    color: ${({ isActive }) => isActive ? "#FFFFFF" : '#94A3B8'};
    background: ${({ isActive }) => isActive ? "#6B39F4" : '#F8F9FD'};
`
const HeadingTab = styled(Text)`
    text-align: center;
    font-weight: 700;
    margin-top: 14px;
`