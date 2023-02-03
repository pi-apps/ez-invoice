import { Button, Flex } from "@phamphu19498/pibridge_uikit"
import PageFullWidth from "components/Layout/PageFullWidth"
import styled from "styled-components"
import ReactPlayer from 'react-player';
import { Link } from "react-router-dom";

const Home = () => {
   
    return (
        <PageFullWidth>
            <CsContainer>
                <CsCardVideo>
                    <ContainerPlayVideo>
                        <ReactPlayer
                            url='https://youtu.be/OvpOC6bsv2U'
                            width="100%"
                            height="100%"
                            playing={true}
                            controls={true}
                        />
                    </ContainerPlayVideo>
                </CsCardVideo>
                <Flex width="100%">
                    <Link to="invoice" style={{width:"100%"}}>
                        <Button mt="1.5rem" width="100%">
                            Start now
                        </Button>
                    </Link>
                </Flex>
            </CsContainer>
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
        padding: 0px 24px;
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
const ContainerPlayVideo = styled(Flex)`
    height: 250px;
    width: 100%;
    border-radius:8px;
    overflow:hidden;
`