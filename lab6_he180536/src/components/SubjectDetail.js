import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SyllabusDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [subject, setSubject] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:9000/subjects/${id}`).then(({ data }) => setSubject(data));
    }, [id]);

    if (!subject) {
        return null;
    }
    
    return (
        <>
            <Navbar className="px-4">
                <Navbar.Brand>Subject Detail Management</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="outline-dark" onClick={() => navigate(`/syllabus`)}>
                        Back to List
                    </Button>
                </Navbar.Collapse>
            </Navbar>
            <Container>
                <Card className="mx-auto mt-5 p-3" style={{ maxWidth: '45rem' }}>
                    <Card.Title>Subject Information</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="text" value={subject.code} disabled readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={subject.name} disabled readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Curriculum</Form.Label>
                            <Form.Control type="text" value={subject.curriculum} disabled readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Semester</Form.Label>
                            <Form.Control type="text" value={subject.semester} disabled readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Credits</Form.Label>
                            <Form.Control type="text" value={subject.credits} disabled readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Pre-requisites (cách nhau bởi dấu phẩy)</Form.Label>
                            <Form.Control type="text" value={subject.preRequisites.join(', ')} disabled readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={subject.description} disabled readOnly />
                        </Form.Group>
                    </Form>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </Card>
            </Container>
        </>
    );
}

export default SyllabusDetail;
