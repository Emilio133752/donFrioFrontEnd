import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import AuthForm from './Pages/Login/AuthForm';
import Inicio from './Pages/Inicio/Inicio';
import Produtos from './Pages/Produtos/Produtos';
import Sobre from './Pages/SobreNos/SobreNos'
import Gerente from './Pages/Gerente/Gerente';
import PrivateRoute from './Components/PrivateRoute';
import Colaborador from './Pages/Colaborador/Colaborador';
import axios from 'axios';

export const authEvents = {
  onLogin: () => window.dispatchEvent(new Event('user:login')),
  onLogout: () => window.dispatchEvent(new Event('user:logout'))
};

const NavigationBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const checkUserAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados do usuário:', error);
        localStorage.removeItem('token');
        setUser(null);
      });
    } else {
      setUser(null); 
    }
  };

  useEffect(() => {
    checkUserAuth();
    window.addEventListener('user:login', checkUserAuth);
    window.addEventListener('user:logout', checkUserAuth);

    return () => {
      window.removeEventListener('user:login', checkUserAuth);
      window.removeEventListener('user:logout', checkUserAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    authEvents.onLogout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">DonFrio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Início</Nav.Link>
            <Nav.Link as={Link} to="/produtos">Produtos</Nav.Link>
            <Nav.Link as={Link} to="/sobre-nos">Sobre</Nav.Link>

            {user?.role === 'gerente' && (
              <Nav.Link as={Link} to="/gerente">Gerência</Nav.Link>
            )}

            {user?.role === 'colaborador' && (
              <Nav.Link as={Link} to="/colaborador">Colaborador</Nav.Link>
            )}

            {!user ? (
              <Button variant="primary" onClick={() => navigate('/login')}>Login</Button>
            ) : (
              <div className="d-flex align-items-center">
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <NavigationBar user={user} setUser={setUser} />
      <Container>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/sobre-nos" element={<Sobre />} />
          <Route path="/colaborador" element={
            <PrivateRoute user={user} allowedRoles={['colaborador']}>
              <Colaborador />
            </PrivateRoute>
          }/>
          <Route path="/gerente" element={
            <PrivateRoute user={user} allowedRoles={['gerente']}>
              <Gerente />
            </PrivateRoute>
          }/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
