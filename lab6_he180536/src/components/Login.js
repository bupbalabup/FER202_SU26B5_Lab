import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/accounts').then((response) => setAccounts(response.data))
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        try {
            const account = accounts.find(
                (item) => item.email === email && item.password === password
            );

            if (!account) {
                setError('Email hoặc mật khẩu không đúng');
                return;
            }

            if (account.status.trim().toLowerCase() === 'inactive') {
                setError('Tài khoản bị khoá');
                return;
            }

            localStorage.setItem('account', JSON.stringify(account));
            navigate('/syllabus');
        } catch (requestError) {
            setError('Không thể kết nối đến hệ thống');
        }
    };

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
            <Card style={{ width: '30rem' }}>
                <Card.Header className="text-center">Sign In</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email of student or lecturer"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Button variant="primary" type="submit">Login</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;
