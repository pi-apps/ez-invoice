import Nav from 'react-bootstrap/Nav';
import styled from 'styled-components';
import AccountIcon from '../Svg/Icons/AccountIcon';
import HomeIcon from '../Svg/Icons/Home';
import InvoiceIcon from '../Svg/Icons/Invoice';

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

  return (
    <NavCustom

      activeKey="/"
      className="justify-content-around"
      style={styles.main}
    >
      <Nav.Item style={styles.navItem}>
        <Nav.Link className='d-flex flex-column align-items-center' style={styles.link} href="/">
            <HomeIcon style={styles.icon} />Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item style={styles.navItem}>
        <Nav.Link className='d-flex flex-column align-items-center' style={styles.link} disabled>
            <InvoiceIcon style={styles.icon}/>Invoice
        </Nav.Link>
      </Nav.Item>
      <Nav.Item style={styles.navItem}>
        <Nav.Link className='d-flex flex-column align-items-center' style={styles.link} disabled>
            <AccountIcon style={styles.icon}/>Account
        </Nav.Link>
      </Nav.Item>
    </NavCustom>
  );
}

export default Footer;