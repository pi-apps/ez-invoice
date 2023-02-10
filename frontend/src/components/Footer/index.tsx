import { useModal } from '@phamphu19498/pibridge_uikit';
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getUser } from '../../state/user';
import LoginModal from '../LoginModal';
import AccountIcon from '../Svg/Icons/AccountIcon';
import HomeIcon from '../Svg/Icons/Home';
import InvoiceIcon from '../Svg/Icons/Invoice';
import { useLocation, useNavigate } from "react-router-dom";
import _ from 'lodash';

const styles = {
    main: {
        overflow: 'hidden',
        bottom: 0,
        width: '100%',
        padding: '10px 0px',
        boxShadow: 'rgb(32 28 28 / 27%) 0px -5px 5px -5px',
        background: 'white'
    },
    navItem: {
       
    },
    icon: {
      marginBottom: '20px'
    },
    activeColor: {
      color: "#6B39F4",
      stroke: "#6B39F4"
    },
    link: {
        fontSize: '12px',
        lineHeight: '22px',
        color: "#94A3B8"
    }
}

const NavCustom = styled(Nav)`
    position: fixed;
`

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const [openLoginModal] = useModal(<LoginModal />)
    const userData = getUser();
    const [activeTab, setActiveTab] = useState({
      home: true,
      invoice: false,
      account: false
    })

    useEffect(() => {
      switch (location.pathname) {
        case "/":
          setActiveTab({...{
            home: true,
            invoice: false,
            account: false
          }})
          break;
        case "/invoice":
          setActiveTab({...{
            home: false,
            invoice: true,
            account: false
          }})
          break;
        case "/account":
          setActiveTab({...{
            home: false,
            invoice: false,
            account: true
          }})
          break;      
        default:
          setActiveTab({...{
            home: true,
            invoice: false,
            account: false
          }})
          break;
      }
     
    }, [location.pathname])
    

    const handleMenu = (eventKey) => {
      switch (eventKey) {
        case "home":
          navigate("/");
          break;
        case "invoice":
          if(userData && !_.isEmpty(userData)){
            navigate("/invoice");
          }else {
            openLoginModal();
          }
          
          break;
        case "account":
          if(userData && !_.isEmpty(userData)){
            navigate("/account");
          }else {
            openLoginModal();
          }
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
      onSelect={(selectedKey) => handleMenu(selectedKey)}
    >
      <Nav.Item style={styles.navItem}>
        <Nav.Link className='d-flex flex-column align-items-center' style={activeTab.home ? {...styles.link, ...styles.activeColor} :styles.link} eventKey="home">
            <HomeIcon style={styles.icon} actived={activeTab.home}/>{t('home')}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item style={styles.navItem}>
        <Nav.Link className='d-flex flex-column align-items-center' style={activeTab.invoice ? {...styles.link, ...styles.activeColor} :styles.link} eventKey="invoice">
            <InvoiceIcon style={styles.icon} actived={activeTab.invoice}/>{t('invoice')}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item style={styles.navItem}>
        <Nav.Link className='d-flex flex-column align-items-center' style={activeTab.account ? {...styles.link, ...styles.activeColor} :styles.link} eventKey="account">
            <AccountIcon  style={styles.icon} actived={activeTab.account}/>{t('account')}
        </Nav.Link>
      </Nav.Item>
    </NavCustom>
  );
}

export default Footer;