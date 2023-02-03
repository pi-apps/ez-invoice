import styled from "styled-components"
import Footer from "../Footer"
import Header from "../Header"

const Wrapper = styled.div``

const MainLayout: React.FC<React.HTMLAttributes<HTMLDivElement>>  = ({ children, ...props }) => {
    return  <Wrapper  {...props}>
        <Header />
        {children}
        <Footer />
    </Wrapper>

}

export default MainLayout;