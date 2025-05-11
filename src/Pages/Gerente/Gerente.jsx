import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Tab, Tabs } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gerente.css';

const Gerente = () => {

  const [categorias, setCategorias] = useState([
    { id: 1, nome: 'Ar-condicionado', descricao: 'Equipamentos de ar-condicionado', status: 'Ativo', produtos: 15 },
    { id: 2, nome: 'Geladeiras', descricao: 'Refrigeradores residenciais', status: 'Ativo', produtos: 8 },
    { id: 3, nome: 'Freezers', descricao: 'Freezers verticais e horizontais', status: 'Ativo', produtos: 6 },
    { id: 4, nome: 'Bebedouros', descricao: 'Bebedouros e purificadores', status: 'Inativo', produtos: 4 },
    { id: 5, nome: 'Acessórios', descricao: 'Peças e acessórios para refrigeração', status: 'Ativo', produtos: 22 },
  ]);

  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Ana Silva', email: 'ana.silva@email.com', role: 'Admin', ultimoAcesso: '10/05/2025', status: 'Online' },
    { id: 2, nome: 'Carlos Mendes', email: 'carlos.m@email.com', role: 'Gerente', ultimoAcesso: '09/05/2025', status: 'Offline' },
    { id: 3, nome: 'Juliana Costa', email: 'ju.costa@email.com', role: 'Vendedor', ultimoAcesso: '08/05/2025', status: 'Offline' },
    { id: 4, nome: 'Roberto Almeida', email: 'rob.almeida@email.com', role: 'Suporte', ultimoAcesso: '10/05/2025', status: 'Online' },
    { id: 5, nome: 'Mariana Santos', email: 'mari.santos@email.com', role: 'Vendedor', ultimoAcesso: '07/05/2025', status: 'Offline' },
    { id: 6, nome: 'Eduardo Lima', email: 'edu.lima@email.com', role: 'Suporte', ultimoAcesso: '09/05/2025', status: 'Online' },
    { id: 7, nome: 'Fernanda Dias', email: 'fer.dias@email.com', role: 'Gerente', ultimoAcesso: '10/05/2025', status: 'Online' },
  ]);

  const [showAddCategoria, setShowAddCategoria] = useState(false);
  const [showEditCategoria, setShowEditCategoria] = useState(false);
  const [showDeleteCategoria, setShowDeleteCategoria] = useState(false);
  const [currentCategoria, setCurrentCategoria] = useState({});
  const [newCategoria, setNewCategoria] = useState({ nome: '', descricao: '', status: 'Ativo' });

  const handleCloseAddCategoria = () => setShowAddCategoria(false);
  const handleShowAddCategoria = () => setShowAddCategoria(true);
  
  const handleCloseEditCategoria = () => setShowEditCategoria(false);
  const handleShowEditCategoria = (categoria) => {
    setCurrentCategoria(categoria);
    setShowEditCategoria(true);
  };
  
  const handleCloseDeleteCategoria = () => setShowDeleteCategoria(false);
  const handleShowDeleteCategoria = (categoria) => {
    setCurrentCategoria(categoria);
    setShowDeleteCategoria(true);
  };
  
  const handleAddCategoria = () => {
    const novaCategoria = {
      id: categorias.length + 1,
      ...newCategoria,
      produtos: 0
    };
    setCategorias([...categorias, novaCategoria]);
    setNewCategoria({ nome: '', descricao: '', status: 'Ativo' });
    handleCloseAddCategoria();
  };
  
  const handleEditCategoria = () => {
    const updatedCategorias = categorias.map(cat => 
      cat.id === currentCategoria.id ? currentCategoria : cat
    );
    setCategorias(updatedCategorias);
    handleCloseEditCategoria();
  };
  
  const handleDeleteCategoria = () => {
    const filteredCategorias = categorias.filter(cat => cat.id !== currentCategoria.id);
    setCategorias(filteredCategorias);
    handleCloseDeleteCategoria();
  };
  const categoriasChartData = categorias.map(cat => ({
    name: cat.nome,
    produtos: cat.produtos
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const roleData = [
    { name: 'Admin', value: usuarios.filter(u => u.role === 'Admin').length },
    { name: 'Gerente', value: usuarios.filter(u => u.role === 'Gerente').length },
    { name: 'Vendedor', value: usuarios.filter(u => u.role === 'Vendedor').length },
    { name: 'Suporte', value: usuarios.filter(u => u.role === 'Suporte').length }
  ];

  const statusData = [
    { name: 'Online', value: usuarios.filter(u => u.status === 'Online').length },
    { name: 'Offline', value: usuarios.filter(u => u.status === 'Offline').length }
  ];

  return (
    <>
      <section className="gerente-header py-4">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold">Painel de Gerenciamento</h1>
              <p className="text-muted">Gerencie categorias e usuários do sistema</p>
            </div>
            <div className="dashboard-date">
              <span className="fw-bold">Data: </span>
              <span>10/05/2025</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="dashboard-content py-4">
        <Container>
          <Tabs 
            defaultActiveKey="categorias" 
            id="dashboard-tabs"
            className="mb-4"
          >
            <Tab eventKey="categorias" title="Gerenciamento de Categorias">
              <Row>
                <Col lg={12} className="mb-4">
                  <Card className="shadow-sm">
                    <Card.Header className="bg-white">
                      <h5 className="mb-0 fw-bold">Distribuição de Produtos por Categoria</h5>
                    </Card.Header>
                    <Card.Body>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={categoriasChartData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="produtos" fill="#8884d8" name="Quantidade de Produtos" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={12}>
                  <Card className="shadow-sm">
                    <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 fw-bold">Lista de Categorias</h5>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={handleShowAddCategoria}
                      >
                        <i className="bi bi-plus-circle me-1"></i> Nova Categoria
                      </Button>
                    </Card.Header>
                    <Card.Body>
                      <Table responsive hover className="categoria-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Status</th>
                            <th>Produtos</th>
                            <th>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categorias.map((categoria) => (
                            <tr key={categoria.id}>
                              <td>{categoria.id}</td>
                              <td>{categoria.nome}</td>
                              <td>{categoria.descricao}</td>
                              <td>
                                <Badge 
                                  bg={categoria.status === 'Ativo' ? 'success' : 'secondary'}
                                >
                                  {categoria.status}
                                </Badge>
                              </td>
                              <td>{categoria.produtos}</td>
                              <td>
                                <Button 
                                  variant="outline-primary" 
                                  size="sm" 
                                  className="me-2"
                                  onClick={() => handleShowEditCategoria(categoria)}
                                >
                                  Editar
                                </Button>
                                <Button 
                                  variant="outline-danger" 
                                  size="sm"
                                  onClick={() => handleShowDeleteCategoria(categoria)}
                                >
                                  Excluir
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="usuarios" title="Visualização de Usuários">
              <Row>
                <Col lg={6} className="mb-4">
                  <Card className="shadow-sm h-100">
                    <Card.Header className="bg-white">
                      <h5 className="mb-0 fw-bold">Distribuição por Nível de Acesso</h5>
                    </Card.Header>
                    <Card.Body className="d-flex align-items-center justify-content-center">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={roleData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {roleData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} usuário(s)`, 'Quantidade']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col lg={6} className="mb-4">
                  <Card className="shadow-sm h-100">
                    <Card.Header className="bg-white">
                      <h5 className="mb-0 fw-bold">Status de Atividade</h5>
                    </Card.Header>
                    <Card.Body className="d-flex align-items-center justify-content-center">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#4CAF50" />
                            <Cell fill="#9E9E9E" />
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} usuário(s)`, 'Quantidade']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={12}>
                  <Card className="shadow-sm">
                    <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 fw-bold">Lista de Usuários</h5>
                      <Form.Control
                        type="search"
                        placeholder="Buscar usuário..."
                        className="w-auto"
                      />
                    </Card.Header>
                    <Card.Body>
                      <Table responsive hover className="usuario-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Nível de Acesso</th>
                            <th>Último Acesso</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                              <td>{usuario.id}</td>
                              <td>{usuario.nome}</td>
                              <td>{usuario.email}</td>
                              <td>
                                <Badge 
                                  bg={
                                    usuario.role === 'Admin' ? 'danger' : 
                                    usuario.role === 'Gerente' ? 'warning' : 
                                    usuario.role === 'Vendedor' ? 'info' : 'secondary'
                                  }
                                >
                                  {usuario.role}
                                </Badge>
                              </td>
                              <td>{usuario.ultimoAcesso}</td>
                              <td>
                                <Badge 
                                  bg={usuario.status === 'Online' ? 'success' : 'secondary'}
                                >
                                  {usuario.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Container>
      </section>
      <Modal show={showAddCategoria} onHide={handleCloseAddCategoria}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Nova Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nome da categoria"
                value={newCategoria.nome}
                onChange={(e) => setNewCategoria({...newCategoria, nome: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Descrição da categoria"
                value={newCategoria.descricao}
                onChange={(e) => setNewCategoria({...newCategoria, descricao: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newCategoria.status}
                onChange={(e) => setNewCategoria({...newCategoria, status: e.target.value})}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddCategoria}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddCategoria}>
            Adicionar Categoria
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditCategoria} onHide={handleCloseEditCategoria}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nome da categoria"
                value={currentCategoria.nome || ''}
                onChange={(e) => setCurrentCategoria({...currentCategoria, nome: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Descrição da categoria"
                value={currentCategoria.descricao || ''}
                onChange={(e) => setCurrentCategoria({...currentCategoria, descricao: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={currentCategoria.status || 'Ativo'}
                onChange={(e) => setCurrentCategoria({...currentCategoria, status: e.target.value})}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditCategoria}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEditCategoria}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteCategoria} onHide={handleCloseDeleteCategoria}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza que deseja excluir a categoria <strong>{currentCategoria.nome}</strong>?</p>
          <p className="text-danger">Esta ação não pode ser desfeita.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteCategoria}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteCategoria}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Gerente;