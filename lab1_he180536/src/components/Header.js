import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CiShoppingCart } from "react-icons/ci";
import Badge from 'react-bootstrap/Badge';

function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="/images/logo.jpg"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-center">
                    <Nav className="gap-3">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Product</Nav.Link>
                        <Nav.Link href="#men">Men</Nav.Link>
                        <Nav.Link href="#women">Women</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text>
                    <Badge bg="secondary"><CiShoppingCart />0</Badge>
                </Navbar.Text>
            </Container>
        </Navbar>
    );
}

export default Header;