import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Tab, Tabs } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gerente.css';

const API_URL = 'https://donfriobackend.onrender.com/api/produtos';
const USUARIOS_API_URL = 'https://donfriobackend.onrender.com/api/auth/usuarios';

const Gerente = () => {

  const [produtos, setProdutos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [showAddProduto, setShowAddProduto] = useState(false);
  const [showEditProduto, setShowEditProduto] = useState(false);
  const [showDeleteProduto, setShowDeleteProduto] = useState(false);
  const [currentProduto, setCurrentProduto] = useState({});
  const [newProduto, setNewProduto] = useState({
    nome: '',
    preco: 0,
    imagem: '',
    categoria: '',
    destaque: false,
    descricao: ''
  });

  const categorias = [
    'Ar Condicionado',
    'Ventiladores',
    'Climatizadores',
    'Linha Comercial'
  ];

  const fetchProdutos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error(error);
      alert('Falha ao carregar produtos');
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(USUARIOS_API_URL);
      if (!response.ok) throw new Error('Erro ao buscar usuários');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
      alert('Falha ao carregar usuários');
    }
  };

  useEffect(() => {
    fetchProdutos();
    fetchUsuarios();
  }, []);

  const handleCloseAddProduto = () => setShowAddProduto(false);
  const handleShowAddProduto = () => setShowAddProduto(true);

  const handleCloseEditProduto = () => setShowEditProduto(false);
  const handleShowEditProduto = (produto) => {
    setCurrentProduto(produto);
    setShowEditProduto(true);
  };

  const handleCloseDeleteProduto = () => setShowDeleteProduto(false);
  const handleShowDeleteProduto = (produto) => {
    setCurrentProduto(produto);
    setShowDeleteProduto(true);
  };

  const handleAddProduto = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduto),
      });
      if (!response.ok) throw new Error('Erro ao adicionar produto');
      await fetchProdutos();
      setNewProduto({ nome: '', preco: 0, imagem: '', categoria: '', destaque: false, descricao: '' });
      handleCloseAddProduto();
    } catch (error) {
      console.error(error);
      alert('Falha ao adicionar produto');
    }
  };

  const handleEditProduto = async () => {
    try {
      const response = await fetch(`${API_URL}/${currentProduto._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduto),
      });
      if (!response.ok) throw new Error('Erro ao atualizar produto');
      await fetchProdutos();
      handleCloseEditProduto();
    } catch (error) {
      console.error(error);
      alert('Falha ao atualizar produto');
    }
  };

  const handleDeleteProduto = async () => {
    try {
      const response = await fetch(`${API_URL}/${currentProduto._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar produto');
      await fetchProdutos();
      handleCloseDeleteProduto();
    } catch (error) {
      console.error(error);
      alert('Falha ao deletar produto');
    }
  };

  const categoriasCount = produtos.reduce((acc, produto) => {
    acc[produto.categoria] = (acc[produto.categoria] || 0) + 1;
    return acc;
  }, {});
  const produtosChartData = Object.entries(categoriasCount).map(([categoria, qtd]) => ({
    name: categoria,
    produtos: qtd
  }));

  const formatarData = (data) => {
    if (!data) return 'N/A';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'online': return 'success';
      case 'offline': return 'secondary';
      case 'ausente': return 'warning';
      case 'ocupado': return 'danger';
      default: return 'secondary';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return 'danger';
      case 'gerente': return 'warning';
      case 'funcionario': return 'primary';
      case 'usuario': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <>
  <section className="gerente-header py-4">
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Painel de Gerenciamento</h1>
          <p className="text-muted">Gerencie produtos e usuários do sistema</p>
        </div>
        <div className="dashboard-date">
          <span className="fw-bold">Data: </span>
          <span>{new Date().toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
    </Container>
  </section>

      <section className="dashboard-content py-4">
        <Container>
          <Tabs 
            defaultActiveKey="produtos" 
            id="dashboard-tabs"
            className="mb-4"
          >
            <Tab eventKey="produtos" title="Gerenciamento de Produtos">
              <Row>
                <Col lg={12} className="mb-4">
                  <Card className="shadow-sm">
                    <Card.Header className="bg-white">
                      <h5 className="mb-0 fw-bold">Distribuição de Produtos por Categoria</h5>
                    </Card.Header>
                    <Card.Body>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={produtosChartData}
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
                      <h5 className="mb-0 fw-bold">Lista de Produtos</h5>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={handleShowAddProduto}
                      >
                        <i className="bi bi-plus-circle me-1"></i> Novo Produto
                      </Button>
                    </Card.Header>
                    <Card.Body>
                      <Table responsive hover className="produto-table">
                        <thead>
                          <tr>
                            <th>Imagem</th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Preço</th>
                            <th>Destaque</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {produtos.map(produto => (
                            <tr key={produto.id}>
                              <td><img src={produto.imagem} alt={produto.nome} width={60} height={60} style={{objectFit: 'cover', borderRadius: '4px'}} /></td>
                              <td>{produto.nome}</td>
                              <td>{produto.categoria}</td>
                              <td>R$ {produto.preco.toFixed(2)}</td>
                              <td>{produto.destaque ? <Badge bg="success">Sim</Badge> : <Badge bg="secondary">Não</Badge>}</td>
                              <td>{produto.descricao}</td>
                              <td>
                                <Button variant="outline-primary" size="sm" onClick={() => handleShowEditProduto(produto)} className="me-2">
                                  <i className="bi bi-pencil-square"></i> Editar
                                </Button>
                                <Button variant="outline-danger" size="sm" onClick={() => handleShowDeleteProduto(produto)}>
                                  <i className="bi bi-trash"></i> Excluir
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

            <Tab eventKey="usuarios" title="Gerenciamento de Usuários">
              <Row>
                <Col lg={12} className="mb-3">
                  <Row>
                    <Col md={12} className="mb-3">
                      <Card className="shadow-sm text-center border-start border-primary border-4">
                        <Card.Body>
                          <h3 className="text-primary mb-1">{usuarios.length}</h3>
                          <p className="text-muted mb-0">Total de Usuários</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Col>

                <Col lg={12}>
                  <Card className="shadow-sm">
                    <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 fw-bold">
                        <i className="bi bi-people me-2"></i>Lista de Usuários
                      </h5>
                      <div>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Table responsive hover className="usuario-table">
                        <thead className="table-light">
                          <tr>
                            <th style={{width: '60px'}}>#</th>
                            <th>Avatar</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Função</th>
                          </tr>
                        </thead>
                        <tbody>
                          {usuarios.length > 0 ? (
                            usuarios.map((user, index) => (
                              <tr key={user.id || index}>
                                <td className="fw-bold text-muted">#{user.id || index + 1}</td>
                                <td>
                                  <div className="bg-secondary rounded-circle d-inline-flex align-items-center justify-content-center text-white" 
                                       style={{width: '40px', height: '40px', fontSize: '0.9rem'}}>
                                    {user.username ? user.username.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
                                  </div>
                                </td>
                                <td>
                                  <div className="fw-bold">{user.username || 'Nome não informado'}</div>
                                  <small className="text-muted">ID: {user._id || 'N/A'}</small>
                                </td>
                                <td>
                                  <span className="text-muted">{user.email || 'Email não informado'}</span>
                                </td>
                                <td>
                                  <Badge bg={getRoleBadgeColor(user.role)}>
                                    {user.role || 'Usuário'}
                                  </Badge>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center py-4">
                                <div className="text-muted">
                                  <i className="bi bi-person-x-fill fs-1 d-block mb-2"></i>
                                  <p>Nenhum usuário encontrado</p>
                                  <Button variant="primary" size="sm">
                                    <i className="bi bi-person-plus me-1"></i>Adicionar Primeiro Usuário
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )}
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
      <Modal show={showAddProduto} onHide={handleCloseAddProduto}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                type="text" 
                value={newProduto.nome}
                onChange={e => setNewProduto({...newProduto, nome: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Preço</Form.Label>
              <Form.Control 
                type="number" 
                step="0.01"
                value={newProduto.preco}
                onChange={e => setNewProduto({...newProduto, preco: parseFloat(e.target.value)})}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Imagem (URL)</Form.Label>
              <Form.Control 
                type="text" 
                value={newProduto.imagem}
                onChange={e => setNewProduto({...newProduto, imagem: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Categoria</Form.Label>
              <Form.Select 
                value={newProduto.categoria}
                onChange={e => setNewProduto({...newProduto, categoria: e.target.value})}
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Check 
                type="checkbox" 
                label="Destaque" 
                checked={newProduto.destaque} 
                onChange={e => setNewProduto({...newProduto, destaque: e.target.checked})} 
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descrição</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={newProduto.descricao}
                onChange={e => setNewProduto({...newProduto, descricao: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddProduto}>Cancelar</Button>
          <Button variant="primary" onClick={handleAddProduto}>Salvar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditProduto} onHide={handleCloseEditProduto}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                type="text" 
                value={currentProduto.nome || ''}
                onChange={e => setCurrentProduto({...currentProduto, nome: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Preço</Form.Label>
              <Form.Control 
                type="number" 
                step="0.01"
                value={currentProduto.preco || 0}
                onChange={e => setCurrentProduto({...currentProduto, preco: parseFloat(e.target.value)})}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Imagem (URL)</Form.Label>
              <Form.Control 
                type="text" 
                value={currentProduto.imagem || ''}
                onChange={e => setCurrentProduto({...currentProduto, imagem: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Categoria</Form.Label>
              <Form.Select 
                value={currentProduto.categoria || ''}
                onChange={e => setCurrentProduto({...currentProduto, categoria: e.target.value})}
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Check 
                type="checkbox" 
                label="Destaque" 
                checked={currentProduto.destaque || false} 
                onChange={e => setCurrentProduto({...currentProduto, destaque: e.target.checked})} 
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descrição</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={currentProduto.descricao || ''}
                onChange={e => setCurrentProduto({...currentProduto, descricao: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditProduto}>Cancelar</Button>
          <Button variant="primary" onClick={handleEditProduto}>Salvar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteProduto} onHide={handleCloseDeleteProduto}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja deletar o produto <strong>{currentProduto.nome}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteProduto}>Cancelar</Button>
          <Button variant="danger" onClick={handleDeleteProduto}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Gerente;