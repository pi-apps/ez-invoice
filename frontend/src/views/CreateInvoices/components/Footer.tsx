import { Button, useModal } from '@phamphu19498/pibridge_uikit';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';

const styles = {
    main: {
        overflow: 'hidden',
        left:0,
        right: 0,
        bottom: 0,
        width: '100%',
        padding: '14px 0px 30px',
        position: 'fixed',
        background: '#fff'

    },
    navItem: {
    },
    icon: {
        marginBottom: '20px'
    },
    link: {
        fontSize: '12px',
        lineHeight: '22px'
    }
}

const NavCustom = styled(Nav)`
`

const Footer = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleMenu = (action) => {
      switch (action) {
        case "invoice":
          navigate("/invoice");
          break;
        case "account":
          navigate("/register");
          break;      
        default:
          navigate("/");
          break;
      }
    }
    
  return (
    <NavCustom
      activeKey="/"
      className="justify-content-around"
      style={styles.main}
    >
      <Nav.Item style={styles.navItem}>
        <Navbar.Brand href="/history">
          <CsButton style={{background: '#F8F5FF'}} >
            History
          </CsButton>
        </Navbar.Brand>
      </Nav.Item>

      <Nav.Item style={styles.navItem}>
        <Navbar.Brand href="/history">
          <CsButton >
            Download
          </CsButton>
        </Navbar.Brand>
      </Nav.Item>

      <Nav.Item style={styles.navItem}>
        <Navbar.Brand href="/history">
          <CsButton>
            Send
          </CsButton>
        </Navbar.Brand>
      </Nav.Item>
    </NavCustom>
  );
}
const CsButton = styled(Button)<{isActive:boolean}>`
  width: 101px;
  height: 48px;
  background: ${({ isActive }) => isActive ? "#6B39F4" : '#F8F9FD'};
  color: #D8CAFD;
  &:hover{
        color: #6B39F4;
    }
    &:active{
        color: #6B39F4;
    }
`
export default Footer;