import { AutoRenewIcon, Button, useModal } from "@devfedeltalabs/pibridge_uikit";
import { useContext, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import DownloadModal from "components/DownloadModal";
import { Translate } from "react-auto-translate";
import { InvoiceIdContext } from "contexts/InVoiceIdContext";
import { getInvoiceId } from "state/newInvoiceId";
import { getUser } from "state/user";
import { GetTranslateHolder } from "hooks/TranSlateHolder";
import { createInvoiceTranslate } from "translation/translateArrayObjects";
import { createInvoice_text } from "translation/languages/createInvoice_text";

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

const Footer = ({ isActive, invoiceId, onHandleCreate, loadingPreview }) => {
  console.log("loadingPreview", loadingPreview)
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openLoginModal] = useModal(<DownloadModal invoiceId={invoiceId}/>);

  const DataAb = getUser();
  const languageUserApi = DataAb?.language
   // Translate
   const [stateText, setStateText] = useState(createInvoice_text);
   const requestTrans = async () => {
     try {
       const resData = await createInvoiceTranslate(languageUserApi);
       setStateText(resData)
     } catch (error) {
       console.log(error)
     }
   }
   useEffect(() => {
     if (languageUserApi) {
       requestTrans();
     } else if (!languageUserApi) {
       setStateText(createInvoice_text);
     }
   }, [languageUserApi]);

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
        <NavLink to="/history">
          <CsButton style={{ background: "#F8F5FF" }}>
            {stateText.text_histoty}
          </CsButton>
        </NavLink>
      </Nav.Item>

      <Nav.Item style={styles.navItem}>
        <CsButtonDownload 
          disabled={(isActive === 1 || isActive === 2) || !invoiceId}
          onClick={openLoginModal}
        >
            {stateText.text_download}
          </CsButtonDownload>
      </Nav.Item>

      <Nav.Item style={styles.navItem}>
          <CsButton
            disabled={(isActive === 1 || isActive === 2) || loadingPreview}
            onClick={onHandleCreate}
            endIcon={loadingPreview ? < AutoRenewIcon color="textDisabled" spin/> : null}

          >
            {stateText.text_send}
          </CsButton>
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
