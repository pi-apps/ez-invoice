import { Button, Flex } from "@phamphu19498/pibridge_uikit"
import PageFullWidth from "components/Layout/PageFullWidth"
import styled from "styled-components"
import AlertLoginModal from "./components/ModalAlertLogin"

const Home = () => {
   
    return (
        <PageFullWidth>
            <CsContainer>
                <CsCardVideo>
                    <img src="/images/ImgPi/demo_videos.png" alt="images" style={{width:"100%", height:"100%"}}/>
                </CsCardVideo>
                <Button mt="1.5rem" width="100%">
                    Start now
                </Button>
            </CsContainer>
            {/* <AlertLoginModal isAuthencation={!false}/> */}
        </PageFullWidth>
    )
}

export default Home

const CsContainer = styled(Flex)`
    width: 100%;
    flex-direction:column;
    min-height: 100vh;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 0px 30px;
    @media only screen and (max-width: 600px) {
        padding: 0px 10px;
        min-height: 80vh;
    }
    @media only screen and (min-width: 768px) {
        max-width: 600px;
        min-height: 80vh;
    }
`

const CsCardVideo = styled(Flex)`
    width: 100%;
    padding:12px;
    border-radius:12px;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    > img {
        border-radius:12px;
    }
`