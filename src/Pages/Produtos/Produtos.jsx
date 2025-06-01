import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Produtos.css';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [precoRange, setPrecoRange] = useState(2000);
  const [termoBusca, setTermoBusca] = useState('');


  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('https://donfriobackend.onrender.com/api/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const produtosFiltrados = produtos.filter(produto => {
    const matchCategoria = categoriaAtiva === 'todos' || produto.categoria === categoriaAtiva;
    const matchPreco = produto.preco <= precoRange;
    const matchBusca = produto.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
                       produto.descricao.toLowerCase().includes(termoBusca.toLowerCase());
    return matchCategoria && matchPreco && matchBusca;
  });

  return (
    <>
      <section className="produtos-hero">
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={7} className="text-white text-center text-lg-start mb-4 mb-lg-0">
              <h1 className="display-5 fw-bold mb-3">O melhor do mundo da refrigeração</h1>
              <p className="lead mb-4">
                Encontre soluções completas para seu conforto térmico com qualidade e economia.
              </p>
              <Button variant="outline-light" size="lg" className="rounded-pill px-4" href='https://web.whatsapp.com/' >
                Fale com um especialista
              </Button>
            </Col>
            <Col lg={5} className="d-none d-lg-block">
              <img 
                src="/Images/produtos-refrigeracao.webp" 
                alt="Produtos de refrigeração" 
                className="img-fluid rounded shadow-lg" 
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-light py-4">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Buscar produtos..."
                  className="me-2"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                />
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row>
            <Col lg={3} className="mb-4 mb-lg-0">
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">Filtros</h5>
                </Card.Header>
                <Card.Body>
                  <h6 className="mb-3">Categorias</h6>
                  <div className="d-flex flex-column">
                    {['todos', 'ar-condicionado', 'ventiladores', 'climatizadores', 'comercial'].map(cat => (
                      <Button 
                        key={cat}
                        variant={categoriaAtiva === cat ? 'primary' : 'outline-primary'} 
                        className="mb-2 text-start"
                        onClick={() => setCategoriaAtiva(cat)}
                      >
                        {cat === 'todos' && 'Todos os produtos'}
                        {cat === 'ar-condicionado' && 'Ar Condicionado'}
                        {cat === 'ventiladores' && 'Ventiladores'}
                        {cat === 'climatizadores' && 'Climatizadores'}
                        {cat === 'comercial' && 'Linha Comercial'}
                      </Button>
                    ))}
                  </div>

                  <hr className="my-4" />
                  
                  <h6 className="mb-3">Faixa de Preço</h6>
                  <Form.Label>Até R$ {precoRange.toFixed(2)}</Form.Label>
                  <Form.Range 
                    min={100} 
                    max={2000} 
                    step={100}
                    value={precoRange}
                    onChange={(e) => setPrecoRange(Number(e.target.value))}
                  />
                  <div className="d-flex justify-content-between">
                    <small>R$ 100,00</small>
                    <small>R$ 2.000,00</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={9}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Nossos Produtos</h2>
                <div className="text-muted">
                  Exibindo {produtosFiltrados.length} de {produtos.length} produtos
                </div>
              </div>

              <Row className="g-4">
                {produtosFiltrados.length > 0 ? (
                  produtosFiltrados.map(produto => (
                    <Col md={6} lg={4} key={produto.id}>
                      <Card className="h-100 produto-card border-0 shadow-sm">
                        {produto.destaque && (
                          <div className="produto-destaque">
                            <Badge bg="danger" pill>Destaque</Badge>
                          </div>
                        )}
                        <div className="produto-img-container">
                          <Card.Img 
                            variant="top" 
                            src={produto.imagem || '/images/produto-padrao.jpg'} 
                            alt={produto.nome}
                            className="produto-img"
                          />
                          <div className="produto-overlay">
                            <Button variant="primary" size="sm" className="me-2">
                              <i className="bi bi-eye"></i>
                            </Button>
                            <Button variant="success" size="sm">
                              <i className="bi bi-cart-plus"></i>
                            </Button>
                          </div>
                        </div>
                        <Card.Body className="d-flex flex-column">
                          <div className="produto-categoria mb-2 text-muted">
                            <small>{produto.categoria}</small>
                          </div>
                          <Card.Title className="mb-2">{produto.nome}</Card.Title>
                          <Card.Text className="text-muted mb-3 flex-grow-1">
                            {produto.descricao}
                          </Card.Text>
                          <div className="produto-preco mb-3">
                            <h4 className="text-primary mb-0">R$ {produto.preco.toFixed(2)}</h4>
                            <small className="text-muted">
                              ou 10x de R$ {(produto.preco / 10).toFixed(2)}
                            </small>
                          </div>
                          <Button variant="primary" className="w-100" href='https://web.whatsapp.com/'>
                            Atendimento via Whatsapp
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col>
                    <div className="text-center py-5">
                      <i className="bi bi-search display-1 text-muted"></i>
                      <h3 className="mt-3">Nenhum produto encontrado</h3>
                      <p className="text-muted">Tente outros filtros ou termos de busca.</p>
                      <Button 
                        variant="outline-primary"
                        onClick={() => {
                          setCategoriaAtiva('todos');
                          setPrecoRange(2000);
                          setTermoBusca('');
                        }}
                      >
                        Limpar filtros
                      </Button>
                    </div>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-primary text-white py-5">
        <Container className="text-center">
          <h2 className="mb-4">Não encontrou o que procura?</h2>
          <p className="lead mb-4">
            Entre em contato com nossa equipe para soluções personalizadas
          </p>
          <Button variant="light" size="lg" className="rounded-pill px-4 me-2" href='https://web.whatsapp.com/' >
            <i className="bi bi-envelope me-2"></i>
            Solicitar orçamento
          </Button>
          <Button variant="outline-light" size="lg" className="rounded-pill px-4" href='https://web.whatsapp.com/'>
            <i className="bi bi-telephone me-2"></i>
            Fale conosco
          </Button>
        </Container>
      </section>
    </>
  );
};

export default Produtos;
