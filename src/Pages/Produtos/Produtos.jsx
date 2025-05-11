import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Breadcrumb, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Produtos.css';

const Produtos = () => {

  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [precoRange, setPrecoRange] = useState(2000);
  const [termoBusca, setTermoBusca] = useState('');

  const produtos = [
    {
      id: 1,
      nome: 'Ventilador de Teto Classic',
      preco: 289.90,
      imagem: '/images/ventilador-teto.jpg', 
      categoria: 'ventiladores',
      destaque: true,
      descricao: '3 pás, controle de velocidade e iluminação integrada'
    },
    {
      id: 2, 
      nome: 'Ventilador de Teto Premium',
      preco: 349.90,
      imagem: '/images/ventilador-teto-2.jpg',
      categoria: 'ventiladores',
      destaque: false,
      descricao: 'Design moderno com 3 pás em madeira natural'
    },
    {
      id: 3,
      nome: 'Ventilador de Mesa Turbo',
      preco: 149.90,
      imagem: '/images/ventilador-mesa.jpg',
      categoria: 'ventiladores',
      destaque: false,
      descricao: '40cm, 3 velocidades, oscilante'
    },
    {
      id: 4,
      nome: 'Ar Condicionado Split 9000 BTUs',
      preco: 1299.90,
      imagem: '/images/ar-split.jpg',
      categoria: 'ar-condicionado',
      destaque: true,
      descricao: 'Frio, classe A em economia de energia'
    },
    {
      id: 5,
      nome: 'Ar Condicionado Portátil',
      preco: 899.90,
      imagem: '/images/ar-portatil.jpg',
      categoria: 'ar-condicionado',
      destaque: false,
      descricao: '12000 BTUs, ideal para ambientes até 15m²'
    },
    {
      id: 6,
      nome: 'Climatizador de Ar Frio',
      preco: 499.90,
      imagem: '/images/climatizador.jpg',
      categoria: 'climatizadores',
      destaque: true,
      descricao: 'Função umidificador e purificador, 3 velocidades'
    },
    {
      id: 7,
      nome: 'Cortina de Ar 90cm',
      preco: 799.90,
      imagem: '/images/cortina-ar.jpg',
      categoria: 'comercial',
      destaque: false,
      descricao: 'Ideal para entradas de comércios e estabelecimentos'
    },
    {
      id: 8,
      nome: 'Ar Condicionado Janela 10000 BTUs',
      preco: 999.90,
      imagem: '/images/ar-janela.jpg',
      categoria: 'ar-condicionado',
      destaque: false,
      descricao: 'Refrigeração rápida, fácil instalação'
    }
  ];

  const produtosFiltrados = produtos.filter(produto => {

    const matchCategoria = categoriaAtiva === 'todos' || produto.categoria === categoriaAtiva;
    
    const matchPreco = produto.preco <= precoRange;
    
    const matchBusca = produto.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
                      produto.descricao.toLowerCase().includes(termoBusca.toLowerCase());
    
    return matchCategoria && matchPreco && matchBusca;
  });

  return (
    <>
      <section className="produtos-hero py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={7} className="text-white">
              <h1 className="display-4 fw-bold mb-3">O melhor do mundo da refrigeração</h1>
              <p className="lead mb-4">
                Encontre soluções completas para seu conforto térmico com qualidade e economia.
              </p>
              <Button variant="outline-light" size="lg" className="rounded-pill px-4">
                Fale com um especialista
              </Button>
            </Col>
            <Col lg={5} className="d-none d-lg-block">
              <img 
                src="/images/ar-split.jpg" 
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
                    <Button 
                      variant={categoriaAtiva === 'todos' ? 'primary' : 'outline-primary'} 
                      className="mb-2 text-start"
                      onClick={() => setCategoriaAtiva('todos')}
                    >
                      Todos os produtos
                    </Button>
                    <Button 
                      variant={categoriaAtiva === 'ar-condicionado' ? 'primary' : 'outline-primary'} 
                      className="mb-2 text-start"
                      onClick={() => setCategoriaAtiva('ar-condicionado')}
                    >
                      Ar Condicionado
                    </Button>
                    <Button 
                      variant={categoriaAtiva === 'ventiladores' ? 'primary' : 'outline-primary'} 
                      className="mb-2 text-start"
                      onClick={() => setCategoriaAtiva('ventiladores')}
                    >
                      Ventiladores
                    </Button>
                    <Button 
                      variant={categoriaAtiva === 'climatizadores' ? 'primary' : 'outline-primary'} 
                      className="mb-2 text-start"
                      onClick={() => setCategoriaAtiva('climatizadores')}
                    >
                      Climatizadores
                    </Button>
                    <Button 
                      variant={categoriaAtiva === 'comercial' ? 'primary' : 'outline-primary'} 
                      className="mb-2 text-start"
                      onClick={() => setCategoriaAtiva('comercial')}
                    >
                      Linha Comercial
                    </Button>
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

                  <hr className="my-4" />
                  
                  <div className="d-grid">
                    <Button variant="success">
                      <i className="bi bi-whatsapp me-2"></i>
                      Atendimento via WhatsApp
                    </Button>
                  </div>
                </Card.Body>
              </Card>
              
              <Card className="border-0 shadow-sm mt-4 bg-primary text-white">
                <Card.Body className="text-center p-4">
                  <h5>Precisa de ajuda?</h5>
                  <p className="mb-3">Nossos especialistas estão prontos para te auxiliar na escolha do produto ideal.</p>
                  <Button variant="light">
                    <i className="bi bi-telephone me-2"></i>
                    (11) 1234-5678
                  </Button>
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
                            src={produto.imagem} 
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
                            <small>
                              {produto.categoria === 'ar-condicionado' && 'Ar Condicionado'}
                              {produto.categoria === 'ventiladores' && 'Ventiladores'}
                              {produto.categoria === 'climatizadores' && 'Climatizadores'}
                              {produto.categoria === 'comercial' && 'Linha Comercial'}
                            </small>
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
                          <Button variant="primary" className="w-100">
                            Adicionar ao carrinho
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
          <Button variant="light" size="lg" className="rounded-pill px-4 me-2">
            <i className="bi bi-envelope me-2"></i>
            Solicitar orçamento
          </Button>
          <Button variant="outline-light" size="lg" className="rounded-pill px-4">
            <i className="bi bi-telephone me-2"></i>
            Fale conosco
          </Button>
        </Container>
      </section>
    </>
  );
};

export default Produtos;