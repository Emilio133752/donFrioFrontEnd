import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import AuthForm from './Pages/Login/AuthForm';
import Inicio from './Pages/Inicio/Inicio';
import Produtos from './Pages/Produtos/Produtos';
import Sobre from './Pages/SobreNos/SobreNos';
import Gerente from './Pages/Gerente/Gerente';
import PrivateRoute from './Components/PrivateRoute';
import axios from 'axios';
import './App.css';

export const authEvents = {
  onLogin: () => window.dispatchEvent(new Event('user:login')),
  onLogout: () => window.dispatchEvent(new Event('user:logout'))
};

const NavigationBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const checkUserAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://donfriobackend.onrender.com/api/auth/me', {
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

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <Navbar bg="light" expand="lg" className="navbar-grande">
      <Container className="d-flex flex-wrap align-items-center justify-content-between">
        <Navbar.Brand as={Link} to="/">DonFrio</Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center gap-3 flex-wrap menu-sem-collapse">
          <Nav.Link as={Link} to="/" onClick={() => handleNavClick('/')}>Início</Nav.Link>
          <Nav.Link as={Link} to="/produtos" onClick={() => handleNavClick('/produtos')}>Produtos</Nav.Link>
          <Nav.Link as={Link} to="/sobre-nos" onClick={() => handleNavClick('/sobre-nos')}>Sobre</Nav.Link>

          {user?.role === 'gerente' && (
            <Nav.Link as={Link} to="/gerente" onClick={() => handleNavClick('/gerente')}>Gerência</Nav.Link>
          )}

          {!user ? (
            <Button variant="primary" onClick={() => handleNavClick('/login')}>
              Login
            </Button>
          ) : (
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <NavigationBar user={user} setUser={setUser} />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/sobre-nos" element={<Sobre />} />
          <Route 
            path="/gerente" 
            element={
              <PrivateRoute user={user} allowedRoles={['gerente']}>
                <Gerente />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
