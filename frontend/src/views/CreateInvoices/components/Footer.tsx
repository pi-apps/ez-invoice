import { Button, useModal } from "@devfedeltalabs/pibridge_uikit";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import DownloadModal from "components/DownloadModal";

const styles = {
  main: {
    overflow: "hidden",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    padding: "14px 0px 30px",
    position: "fixed",
    background: "#fff",
  },
  navItem: {},
  icon: {
    marginBottom: "20px",
  },
  link: {
    fontSize: "12px",
    lineHeight: "22px",
  },
};

const NavCustom = styled(Nav)``;

const Footer = ({ isActive }) => {
  console.log("isActive", isActive === 1 || isActive === 2);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openLoginModal] = useModal(<DownloadModal />);

  const handleMenu = (action) => {
    switch (action) {
      case "invoice":
        navigate("/invoice");
        break;
      default:
        navigate("/");
        break;
    }
  };

  return (
    <NavCustom
      activeKey="/"
      className="justify-content-around"
      style={styles.main}
    >
      <Nav.Item style={styles.navItem}>
        <Navbar.Brand href="/history">
          <CsButton style={{ background: "#F8F5FF" }}>History</CsButton>
        </Navbar.Brand>
      </Nav.Item>

      <Nav.Item style={styles.navItem}>
        <Navbar.Brand onClick={openLoginModal}>
          <CsButtonDownload disabled={isActive === 1 || isActive === 2}>
            Download
          </CsButtonDownload>
        </Navbar.Brand>
      </Nav.Item>

      <Nav.Item style={styles.navItem}>
        <Navbar.Brand href="newInvoice/send">
          <CsButton disabled={isActive === 1 || isActive === 2}>Send</CsButton>
        </Navbar.Brand>
      </Nav.Item>
    </NavCustom>
  );
};
const CsButton = styled(Button)<{ isActive: boolean }>`
  width: 101px;
  height: 48px;
  background: ${({ isActive }) => (isActive ? "#6B39F4" : "#F8F5FF")};
  color: #6b39f4;
  &:disabled {
    background-color: #f8f5ff;
    color: #d8cafd;
  }
`;
const CsButtonDownload = styled(Button)<{}>`
  width: 101px;
  height: 48px;
  background: #6b39f4;
  color: #fff;
  &:disabled {
    background-color: #f8f5ff;
    color: #d8cafd;
  }
`;
export default Footer;
