import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import UserMenu from "../Menu/UserMenu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state";
import { useEffect, useState } from "react";
import { axiosClient } from "../../config/htttp";
import { setUser } from "../../state/user/actions";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../state/user";
import { Text } from "@devfedeltalabs/pibridge_uikit";
import TranslateMenu from "components/Menu/Translate/TranslateMenu";
import { GetAnInvoice, UseGetAllInvoice, UseGetAnInvoiceCore } from "state/invoice";

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

  UseGetAllInvoice()
  const items = GetAnInvoice()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await axiosClient.get("user/info");
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
            {userData?.username && (
              <Text fontWeight="600" lineHeight='2' fontSize="14px" padding="0 4px">{userData?.username}</Text>
            )}
            {
              (!userData?.username && items?.isLoading === true ) && (
              <Text mt="6px" fontSize="12px" color="textSubtle">Loading..</Text>
              )
            }
            <TranslateMenu />
            <UserMenu />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
