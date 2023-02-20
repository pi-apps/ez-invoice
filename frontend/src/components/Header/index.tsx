import TranslateMenu from "components/Menu/Translate/TranslateMenu";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { GetAnInvoice, UseGetAllInvoice } from "state/invoice";
import { axiosClient } from "../../config/htttp";
import { AppDispatch } from "../../state";
import { getAccessToken, getUser } from "../../state/user";
import { setUser } from "../../state/user/actions";
import UserMenu from "../Menu/UserMenu";

const styles = {
  navbar: {
    padding: 10,
    width: "100%",
    borderBottom: "1px solid #E6E6E6",
  },
  loginButton: {
    width: "53px",
    height: "28px",
    background: "#6B39F4",
    fontSize: "12px",
    fontWeight: "700",
    padding: "0px",
  },
};

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = getUser();
  const accessToken = getAccessToken()
  UseGetAllInvoice(accessToken);
  const items = GetAnInvoice();
  const isLoading = items?.isLoading

  useEffect(() => {
    const fetchUser = async () => {
      const user = await axiosClient.get("user/info", {
        headers: {
          'Authorization': accessToken,
        }
      });
      if (user) {
        dispatch(setUser(user.data));
      }
    };
    fetchUser();
  }, []);

  return (
    <>
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
            {/* {userData?.username && (
              <Text
                fontWeight="600"
                lineHeight="2"
                fontSize="14px"
                padding="0 4px"
              >
                {userData?.username}
              </Text>
            )}
            {loading && (
              <Text mt="6px" fontSize="12px" color="textSubtle">
                <Translate>Loading..</Translate>
              </Text>
            )} */}
            <TranslateMenu />
            <UserMenu isLoading={isLoading}/>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
