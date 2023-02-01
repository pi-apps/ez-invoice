import { Flex } from "@phamphu19498/pibridge_uikit";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from 'state'
import { tabActive } from "state/invoice/actions";

interface PropsSubTab{
    isSent:boolean
}

const SubTab:React.FC<PropsSubTab> = ({isSent}) => {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <ContainerSubTab>
            <TabButton isActive={isSent === !false} onClick={()=> dispatch(tabActive({isSent:true}))}>
                Sent
            </TabButton>
            <TabButton isActive={isSent === false} onClick={()=> dispatch(tabActive({isSent:false}))}>
                Received
            </TabButton>
        </ContainerSubTab>
    )
}
export default SubTab

const ContainerSubTab = styled(Flex)`
    width:100%;
    height:70px;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding:0px 12px;
    margin-top:1rem;
`
const TabButton = styled(Flex)<{isActive:boolean}>`
    width: 50%;
    height: 100%;
    cursor: pointer;
    justify-content:center;
    align-items:center;
    border-bottom: 2px solid ${({ isActive }) => isActive ? "#0F172A" : "none"};
    color: ${({ isActive, theme }) => isActive ? "#0F172A" : theme.colors.textSubtle};
`