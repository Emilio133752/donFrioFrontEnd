import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Inicio.css';

const Inicio = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('https://donfriobackend.onrender.com/api/produtos');
        const todosProdutos = response.data;
        const produtosAleatorios = todosProdutos
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        setProdutos(produtosAleatorios);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);


  return (
    <>
      <section className="hero-section">
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={6} className="text-center text-lg-start mb-4 mb-lg-0">
              <h1 className="display-5 fw-bold mb-3">Bem vindo!</h1>
              <p className="lead mb-4">Encontre os melhores produtos para refrigeração e conforto térmico</p>
            </Col>
            <Col lg={6} className="text-center">
              <img 
                src="../Images/logo.jpg" 
                alt="Produtos de refrigeração" 
                className="img-fluid hero-image rounded shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="popular-products">
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className="fw-bold position-relative d-inline-block pb-2">Produtos populares</h2>
          </div>
          <Row>
            {produtos.map((produto, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <Card className="product-card h-100 border-0 shadow-sm">
                  <div className="product-img-wrapper">
                    <Card.Img
                      variant="top"
                      src={produto.imagem || '/images/default.jpg'}
                      alt={produto.nome}
                      className="product-img"
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold">{produto.nome}</Card.Title>
                    <Card.Text>
                      <small className="text-muted">A partir de</small>
                      <div className="price mb-3">R$ {parseFloat(produto.preco).toFixed(2)}</div>
                    </Card.Text>
                    <Button variant="primary" className="px-4 rounded-pill" href='http://localhost:5173/produtos'>Ver detalhes</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className="why-us py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className="fw-bold position-relative d-inline-block pb-2">Somos 5 ⭐</h2>
            <p className="text-muted mt-2">5 motivos para escolher nossos produtos</p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <div className="feature-box text-center p-4 h-100">
                <div className="feature-icon mx-auto mb-4">
                  <span className="number">1</span>
                </div>
                <h4 className="mb-3">Garantia estendida</h4>
                <p className="text-muted mb-0">Nossos produtos possuem garantia acima da média do mercado</p>
              </div>
            </Col>

            <Col md={4}>
              <div className="feature-box text-center p-4 h-100">
                <div className="feature-icon mx-auto mb-4">
                  <span className="number">2</span>
                </div>
                <h4 className="mb-3">Entrega expressa</h4>
                <p className="text-muted mb-0">Entregas rápidas para todo o Brasil com rastreamento total</p>
              </div>
            </Col>

            <Col md={4}>
              <div className="feature-box text-center p-4 h-100">
                <div className="feature-icon mx-auto mb-4">
                  <span className="number">3</span>
                </div>
                <h4 className="mb-3">Suporte técnico</h4>
                <p className="text-muted mb-0">Atendimento especializado para tirar todas as suas dúvidas</p>
              </div>
            </Col>

            <Row className="g-4 justify-content-center">
              <Col md={4}>
                <div className="feature-box text-center p-4 h-100">
                  <div className="feature-icon mx-auto mb-4">
                    <span className="number">4</span>
                  </div>
                  <h4 className="mb-3">Qualidade certificada</h4>
                  <p className="text-muted mb-0">Trabalhamos com produtos testados e aprovados, garantindo segurança e durabilidade.</p>
                </div>
              </Col>

              <Col md={4}>
                <div className="feature-box text-center p-4 h-100">
                  <div className="feature-icon mx-auto mb-4">
                    <span className="number">5</span>
                  </div>
                  <h4 className="mb-3">Pagamento facilitado</h4>
                  <p className="text-muted mb-0">Aceitamos diversas formas de pagamento com possibilidade de parcelamento sem juros.</p>
                </div>
              </Col>
            </Row>


          </Row>
        </Container>
      </section>

      <section className="feedback">
        <Container>
          <div className="section-header text-center mb-5">
            <h2 className="fw-bold position-relative d-inline-block pb-2">Feedback</h2>
          </div>
          
          <div className="feedback-container">
            <Row className="g-4">
              <Col lg={6} className="mb-4">
                <Card className="testimonial-card h-100 border-0 shadow">
                  <Card.Body className="p-4">
                    <div className="d-flex mb-4">
                      <div className="testimonial-img me-3">
                        <img src="/images/casal-feedback.jpeg" alt="Cliente satisfeito" className="rounded-circle" />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">João e Maria Silva</h5>
                        <p className="text-muted">Compraram uma geladeira no mês passado</p>
                      </div>
                    </div>
                    <blockquote className="blockquote mb-0">
                      <p className="fst-italic">
                        "Estamos muito satisfeitos com a qualidade do produto e a rapidez na entrega. Superou nossas expectativas!"
                      </p>
                    </blockquote>
                    <div className="rating mt-3">
                      ★★★★★
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={6} className="mb-4">
                <Card className="testimonial-card h-100 border-0 shadow">
                  <Card.Body className="p-4">
                    <div className="d-flex mb-4">
                      <div className="testimonial-img me-3">
                        <img src="/images/tecnico-feedback.avif" alt="Técnico de conserto" className="rounded-circle" />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">Ricardo Oliveira</h5>
                        <p className="text-muted">Adquiriu ar-condicionado com instalação</p>
                      </div>
                    </div>
                    <blockquote className="blockquote mb-0">
                      <p className="fst-italic">
                        "A instalação foi rápida e o técnico muito profissional. O equipamento funciona perfeitamente e está economizando energia."
                      </p>
                    </blockquote>
                    <div className="rating mt-3">
                      ★★★★★
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <section className="installers">
        <Container>
          <div className="installers-box text-center p-5 rounded">
            <h2 className="fw-bold mb-3">Se interesse por instalações</h2>
            <p className="lead mb-4">Profissionais qualificados para instalar seu equipamento com segurança e garantia</p>
            <Button variant="light" size="lg" className="fw-bold px-4" href='https://web.whatsapp.com/'>Saiba mais</Button>
          </div>
        </Container>
      </section>

      <footer className="footer">
        <Container>
          <Row className="py-4">
            <Col lg={3} md={6} className="mb-4 mb-lg-0">
              <h5 className="fw-bold mb-3">Empresa</h5>
              <p className="mb-1">EMPRESA - REFRIGERAÇÃO LTDA</p>
              <p className="text-muted">CNPJ: 00.000.000/0001-00</p>
            </Col>
            
            <Col lg={3} md={6} className="mb-4 mb-lg-0">
              <h5 className="fw-bold mb-3">Endereço</h5>
              <p className="mb-1">Av. Principal, 1000</p>
              <p className="text-muted">Centro - Cidade/UF</p>
            </Col>
            
            <Col lg={3} md={6} className="mb-4 mb-lg-0">
              <h5 className="fw-bold mb-3">Suporte</h5>
              <p className="mb-1">suporte@empresa.com</p>
              <p className="text-muted">0800 123 4567</p>
            </Col>
            
            <Col lg={3} md={6}>
              <h5 className="fw-bold mb-3">Legal</h5>
              <p className="mb-1">Termos de uso</p>
              <p className="text-muted">Política de privacidade</p>
            </Col>
          </Row>
          <div className="text-center py-3 border-top">
            <p className="mb-0 text-muted">&copy; 2025 EMPRESA - Todos os direitos reservados</p>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Inicio;