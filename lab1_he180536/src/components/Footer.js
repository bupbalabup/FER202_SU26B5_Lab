import { Container, Row, Col } from "react-bootstrap";

function Footer() {
    return (
        <Container fluid className="text-white bg-secondary p-3" >
            <Row>
                <Col className="text-center">
                    Student Name: Dang Trung Hieu
                </Col>

                <Col className="text-center">
                    Student ID: HE180536
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    Class Name: FER202_M_BL5
                </Col>

                <Col className="text-center">
                    Email Address: hieudthe180536@fpt.edu.vn
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;