import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Card, Tab, Nav, Container, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa'; 
import { authEvents } from '../../App'; 

export default function AuthForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [key, setKey] = useState('login');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const from = location.state?.from || '/';

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      if (key === 'login') {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });

        const { token } = response.data;


        localStorage.setItem('token', token);
        
        authEvents.onLogin();

        setMessage('Login realizado com sucesso!');
        
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      }

      if (key === 'register') {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        });

        setMessage('Registro feito com sucesso! Você pode fazer login agora.');
        setTimeout(() => {
          setKey('login');
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Erro ao processar a requisição');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">DonFrio</h2>
            <p className="text-muted">Entre para acessar nossa plataforma</p>
          </div>
          
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Body className="p-4 p-md-5">
              <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
                <Nav variant="pills" className="mb-4 gap-2 justify-content-center">
                  <Nav.Item className="w-50">
                    <Nav.Link 
                      eventKey="login" 
                      className="text-center py-2 rounded-pill"
                    >
                      Login
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="w-50">
                    <Nav.Link 
                      eventKey="register" 
                      className="text-center py-2 rounded-pill"
                    >
                      Registro
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                
                <Tab.Content>
                  <Tab.Pane eventKey="login">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-light">
                            <FaEnvelope />
                          </InputGroup.Text>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu@email.com"
                            required
                            className="py-2"
                          />
                        </InputGroup>
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Label>Senha</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-light">
                            <FaLock />
                          </InputGroup.Text>
                          <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="py-2"
                          />
                        </InputGroup>
                        <div className="d-flex justify-content-end mt-2">
                          <a href="#" className="text-decoration-none small">Esqueceu a senha?</a>
                        </div>
                      </Form.Group>
                      
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100 py-2 rounded-pill"
                        disabled={loading}
                      >
                        {loading ? 'Entrando...' : 'Entrar'}
                      </Button>
                    </Form>
                  </Tab.Pane>

                  <Tab.Pane eventKey="register">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <Form.Label>Nome</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-light">
                            <FaUser />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Seu nome completo"
                            required
                            className="py-2"
                          />
                        </InputGroup>
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-light">
                            <FaEnvelope />
                          </InputGroup.Text>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu@email.com"
                            required
                            className="py-2"
                          />
                        </InputGroup>
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Label>Senha</Form.Label>
                        <InputGroup>
                          <InputGroup.Text className="bg-light">
                            <FaLock />
                          </InputGroup.Text>
                          <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Escolha uma senha segura"
                            required
                            className="py-2"
                          />
                        </InputGroup>
                        <Form.Text className="text-muted small">
                          Sua senha deve ter pelo menos 8 caracteres
                        </Form.Text>
                      </Form.Group>
                      
                      <Button 
                        variant="success" 
                        type="submit" 
                        className="w-100 py-2 rounded-pill"
                        disabled={loading}
                      >
                        {loading ? 'Registrando...' : 'Criar Conta'}
                      </Button>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
                {message && 
                  <Alert variant="success" className="mt-4 mb-0 text-center">
                    {message}
                  </Alert>
                }
                {error && 
                  <Alert variant="danger" className="mt-4 mb-0">
                    <div className="d-flex align-items-center">
                      <div className="me-2">❌</div>
                      <div>{error}</div>
                    </div>
                  </Alert>
                }
              </Tab.Container>
            </Card.Body>
          </Card>
          
          <div className="text-center mt-4 text-muted">
            <small>
              © {new Date().getFullYear()} DonFrio. Todos os direitos reservados.
            </small>
          </div>
        </Col>
      </Row>
    </Container>
  );
}