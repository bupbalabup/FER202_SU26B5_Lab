import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Button, Container, Form, Navbar, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function SyllabusList() {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [searchBy, setSearchBy] = useState('code');
    const account = JSON.parse(localStorage.getItem('account'));

    useEffect(() => {
        axios.get('http://localhost:9000/subjects').then((response) => setSubjects(response.data));
    }, []);

    const filteredSubjects = useMemo(() => {
        return subjects.filter((subject) => {
            const matchCode = searchBy === 'code' || subject.code === searchBy;
            const matchKeyword = subject.code.toLowerCase().includes(keyword.trim().toLowerCase());
            return matchCode && matchKeyword;
        });
    }, [keyword, searchBy, subjects]);

    const handleLogout = () => {
        localStorage.removeItem('account');
        navigate('/login');
    };

    return (
        <>
            <Navbar className="px-4">
                <Navbar.Brand>FPT Education Learning Materials Portal</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="me-3">
                        Hello, <strong>{account.fullName}</strong> ({account.role})
                    </Navbar.Text>
                    <Button variant="outline-dark" onClick={handleLogout}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Navbar>

            <Container className="py-4">
                <h3>Syllabus Management</h3>

                <div className="d-flex align-items-end gap-2 mb-4">
                    <Form.Group style={{ width: '180px' }}>
                        <Form.Label>Search by:</Form.Label>
                        <Form.Select
                            value={searchBy}
                            onChange={(event) => setSearchBy(event.target.value)}
                        >
                            <option value="code">Code</option>

                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.code}>
                                    {subject.code}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="flex-grow-1">
                        <Form.Label>Keyword</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter keyword..."
                            value={keyword}
                            onChange={(event) => setKeyword(event.target.value)}
                        />
                    </Form.Group>
                </div>
                <h4>Subject List</h4>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Curriculum</th>
                            <th>Semester</th>
                            <th>Credits</th>
                            <th>Pre-requisites</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubjects.map((subject) => (
                            <tr key={subject.id}>
                                <td>
                                    <Link
                                        to={`/subject/${subject.id}`}
                                    >
                                        {subject.code}
                                    </Link>
                                </td>
                                <td>{subject.name}</td>
                                <td>{subject.curriculum}</td>
                                <td>{subject.semester}</td>
                                <td>{subject.credits}</td>
                                <td>{subject.preRequisites?.join(', ')}</td>
                                <td>{subject.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default SyllabusList;
