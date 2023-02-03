import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import UserMenu from '../Menu/UserMenu';

const styles = {
    navbar: {
        padding: 10, 
        width: "100%", 
        borderBottom: "1px solid #E6E6E6"
    },
    loginButton: {
        width: "53px",
        height: "28px",
        background: "#6B39F4",
        fontSize: "12px",
        fontWeight: "700",
        padding: "0px"
    }
    
}

const Header = () => {
    return <>
        <Navbar bg="transparent" style={styles.navbar}>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt="ezinvoice-logo"
                        src="/images/ImgPi/logo.png"
                        height="auto"
                        width="100px"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Nav className="justify-content-end">
                    <UserMenu />
                </Nav>
            </Container>

        </Navbar>
    </>
}


export default Header