import Nav from 'react-bootstrap/Nav';

const styles = {
    main: {
        
    }
}

const Footer = () => {

  return (
    <Nav

      activeKey="/"
      className="justify-content-between"
      style={{}}
    >
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" disabled>Invoice</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" disabled>Account</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Footer;