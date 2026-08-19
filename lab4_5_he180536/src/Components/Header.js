import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar className="shadow-sm rounded d-flex">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Courses</Nav.Link>
            <Nav.Link href="#">Projects</Nav.Link>
            <Nav.Link href="#">Review</Nav.Link>
            <Nav.Link href="#">Title Confirmation</Nav.Link>
            <Nav.Link href="#">Reference</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;