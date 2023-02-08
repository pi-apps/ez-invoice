import { useModal } from '@phamphu19498/pibridge_uikit';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getUser } from '../../state/user';
import LoginModal from '../LoginModal';
import AccountIcon from '../Svg/Icons/AccountIcon';
import HomeIcon from '../Svg/Icons/Home';
import InvoiceIcon from '../Svg/Icons/Invoice';
import { useNavigate } from "react-router-dom";

const styles = {
    main: {
        overflow: 'hidden',
        bottom: 0,
        width: '100%',
        padding: '10px 0px',
        boxShadow: 'rgb(32 28 28 / 27%) 0px -5px 5px -5px'
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
    position: fixed;
`

const Footer = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [openLoginModal] = useModal(<LoginModal />)
    const userData = getUser();

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
        <Nav.Link className='d-flex flex-column align-items-center' style={styles.link} href="/">
            <HomeIcon style={styles.icon} />{t('home')}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item style={styles.navItem}>
        <Nav.Link className='d-flex flex-column align-items-center' style={styles.link} onClick={!userData ? openLoginModal : () => handleMenu('invoice')}>
            <InvoiceIcon style={styles.icon}/>{t('invoice')}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item style={styles.navItem}>
        <Nav.Link className='d-flex flex-column align-items-center' style={styles.link} onClick={!userData ? openLoginModal : () => handleMenu('account')}>
            <AccountIcon style={styles.icon}/>{t('account')}
        </Nav.Link>
      </Nav.Item>
    </NavCustom>
  );
}

export default Footer;