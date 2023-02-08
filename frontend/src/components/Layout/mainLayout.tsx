import { Outlet } from "react-router-dom"
import styled from "styled-components"
import Footer from "../Footer"
import Header from "../Header"

const Wrapper = styled.div``

const MainLayout = () => {
    return  <Wrapper>
        <Header />
        <Outlet />
        <Footer />
    </Wrapper>

}

export default MainLayout;