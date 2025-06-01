import React from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SobreNos.css';

const SobreNos = () => {
  return (
    <>
      <section className="hero-section">
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={7} className="text-center text-lg-start mb-4 mb-lg-0">
              <div className="pe-lg-4">
                <h1 className="display-5 fw-bold mb-3">Sobre Nós</h1>
                <p className="lead mb-4">
                  Uma empresa com tradição e qualidade no mercado há mais de 20 anos, 
                  oferecendo soluções em refrigeração com excelência e compromisso.
                </p>
              <Button variant="outline-light" href='http://localhost:5173/produtos' size="lg" className="rounded-pill px-4">
                  Conheça nossos produtos
                </Button>
              </div>
            </Col>
            <Col lg={4} className="text-center">
              <Image 
                src="/Images/sobre-nos.jpg" 
                alt="Imagem de pessoas negociando" 
                className="img-fluid rounded shadow-lg" 
                style={{ maxHeight: '350px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="section-title position-relative pb-3 mb-4">
                Nossa História
                <span className="position-absolute start-50 bottom-0 translate-middle-x" 
                      style={{ width: '80px', height: '3px', background: 'var(--bs-primary)' }}></span>
              </h2>
              <p className="text-muted">
                Desde 2003, nossa empresa tem se destacado no mercado de refrigeração, 
                com um compromisso inabalável com a qualidade e a inovação. 
                Começamos como uma pequena oficina e hoje somos referência nacional.
              </p>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col lg={8} className="mx-auto">
              <Card className="border-0 shadow-sm p-4">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={4} className="text-center mb-4 mb-md-0">
                      <Image 
                        src="/Images/ronildo.jpg" 
                        alt="Foto do representante" 
                        className="rounded-circle img-thumbnail shadow" 
                        width="150" 
                        height="150" 
                      />
                    </Col>
                    <Col md={8}>
                      <h4 className="mb-2">Ronildo Xavier</h4>
                      <p className="text-muted mb-3">Presidente e Fundador</p>
                      <p className="fst-italic mb-3">
                        "Trabalhamos para oferecer os melhores produtos de refrigeração do mercado, 
                        sempre priorizando a satisfação dos nossos clientes e o respeito ao meio ambiente."
                      </p>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm">
                          <i className="bi bi-linkedin me-1"></i> LinkedIn
                        </Button>
                        <Button variant="outline-primary" size="sm">
                          <i className="bi bi-envelope me-1"></i> Contato
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-light py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="section-title position-relative pb-3 mb-4">
                Nossos Valores
                <span className="position-absolute start-50 bottom-0 translate-middle-x" 
                      style={{ width: '80px', height: '3px', background: 'var(--bs-primary)' }}></span>
              </h2>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm text-center hover-card">
                <Card.Body className="p-4">
                  <div className="icon-container mb-3 mx-auto rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" 
                       style={{ width: '80px', height: '80px' }}>
                    <span className="fs-1">😊</span>
                  </div>
                  <h4 className="mb-3">Compromisso</h4>
                  <p className="text-muted">
                    Dedicação total aos nossos clientes e à qualidade dos produtos.
                    Respeitamos prazos e oferecemos suporte contínuo.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm text-center hover-card">
                <Card.Body className="p-4">
                  <div className="icon-container mb-3 mx-auto rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" 
                       style={{ width: '80px', height: '80px' }}>
                    <span className="fs-1">🏆</span>
                  </div>
                  <h4 className="mb-3">Excelência</h4>
                  <p className="text-muted">
                    Buscamos sempre os melhores resultados em tudo que fazemos.
                    Investimos em inovação e treinamento contínuo.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm text-center hover-card">
                <Card.Body className="p-4">
                  <div className="icon-container mb-3 mx-auto rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" 
                       style={{ width: '80px', height: '80px' }}>
                    <span className="fs-1">🌎</span>
                  </div>
                  <h4 className="mb-3">Sustentabilidade</h4>
                  <p className="text-muted">
                    Compromisso com o meio ambiente e práticas sustentáveis.
                    Buscamos reduzir nosso impacto ambiental em todas as operações.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="section-title position-relative pb-3 mb-4">
                Nos Acompanhe nas Redes
                <span className="position-absolute start-50 bottom-0 translate-middle-x" 
                      style={{ width: '80px', height: '3px', background: 'var(--bs-primary)' }}></span>
              </h2>
              <p className="text-muted mb-5">
                Siga nossas redes sociais para ficar por dentro das novidades, 
                promoções e dicas sobre refrigeração.
              </p>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={10}>
              <Row className="g-4 align-items-center">
                <Col md={6}>
                  <div className="social-card p-4 border rounded shadow-sm bg-white">
                    <div className="d-flex align-items-center mb-3">
                      <Image 
                        src="/Images/instagram.png" 
                        alt="Instagram" 
                        width="40" 
                        height="40" 
                        className="me-2" 
                      />
                      <h5 className="mb-0">@refrigeracao_oficial</h5>
                    </div>

                    <p className="text-muted mb-3">
                      Novos produtos chegando em nossa loja! Confira as promoções especiais
                      de lançamento e aproveite para renovar seu sistema de refrigeração.
                    </p>
                    <Button variant="outline-primary" className="w-100">
                      <i className="bi bi-instagram me-2"></i> Seguir no Instagram
                    </Button>
                  </div>
                </Col>
                
                <Col md={6}>
                  <Row className="g-4">
                    <Col xs={12}>
                      <div className="social-link-card p-4 border rounded shadow-sm bg-white">
                        <div className="d-flex align-items-center">
                      <Image 
                        src="/Images/facebook.webp" 
                        alt="Facebook" 
                        width="50" 
                        height="50" 
                        className="me-2" 
                      />
                          
                          <div>
                            <h5 className="mb-1">Facebook</h5>
                            <p className="mb-0 text-muted">@refrigeracao.oficial</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    
                    <Col xs={12}>
                      <div className="social-link-card p-4 border rounded shadow-sm bg-white">
                        <div className="d-flex align-items-center">
                      <Image 
                        src="/Images/youtube.avif" 
                        alt="Youtube" 
                        width="50" 
                        height="50" 
                        className="me-2" 
                      />
                          <div>
                            <h5 className="mb-1">YouTube</h5>
                            <p className="mb-0 text-muted">Canal Refrigeração</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    
                    <Col xs={12}>
                      <div className="social-link-card p-4 border rounded shadow-sm bg-white">
                        <div className="d-flex align-items-center">
                      <Image 
                        src="/Images/linkedin.avif" 
                        alt="Linkedin" 
                        width="50" 
                        height="50" 
                        className="me-2" 
                      />
                          <div>
                            <h5 className="mb-1">LinkedIn</h5>
                            <p className="mb-0 text-muted">Empresa Refrigeração Ltda</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <footer className="bg-white text-dark py-5 w-100">
        <Container fluid className="px-4 px-md-5">
          <Row className="g-4">
            <Col lg={4}>
              <h5 className="mb-4 text-primary">Empresa Refrigeração</h5>
              <p className="mb-4 text-muted">
                Soluções completas em refrigeração comercial e industrial há mais de 20 anos.
              </p>
              <p className="mb-1 text-muted">
                <i className="bi bi-geo-alt me-2"></i>
                Av. Principal, 1000 - Centro
              </p>
              <p className="mb-1 text-muted">
                <i className="bi bi-telephone me-2"></i>
                (11) 1234-5678
              </p>
              <p className="mb-1 text-muted">
                <i className="bi bi-envelope me-2"></i>
                contato@refrigeracao.com.br
              </p>
            </Col>
            
            <Col sm={6} lg={4}>
              <h5 className="mb-4 text-primary">Links Rápidos</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-decoration-none text-muted hover-primary">Home</a></li>
                <li className="mb-2"><a href="#" className="text-decoration-none text-muted hover-primary">Produtos</a></li>
                <li className="mb-2"><a href="#" className="text-decoration-none text-muted hover-primary">Serviços</a></li>
                <li className="mb-2"><a href="#" className="text-decoration-none text-muted hover-primary">Blog</a></li>
                <li className="mb-2"><a href="#" className="text-decoration-none text-muted hover-primary">Contato</a></li>
              </ul>
            </Col>
            
            <Col sm={6} lg={4}>
              <h5 className="mb-4 text-primary">Newsletter</h5>
              <p className="text-muted mb-4">
                Inscreva-se em nossa newsletter para receber novidades e promoções especiais.
              </p>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Seu e-mail" />
                <Button variant="primary">
                  <i className="bi bi-send"></i>
                </Button>
              </div>
              <div className="d-flex gap-3 mt-4">
                <a href="#" className="text-primary fs-5"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-primary fs-5"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-primary fs-5"><i className="bi bi-youtube"></i></a>
                <a href="#" className="text-primary fs-5"><i className="bi bi-linkedin"></i></a>
              </div>
            </Col>
          </Row>
          
          <hr className="my-4" />
          
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <small className="text-muted">
                © 2023 EMPRESA - REFRIGERAÇÃO LTDA | CNPJ: 00.000.000/0001-00
              </small>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <small>
                <a href="#" className="text-decoration-none text-muted me-3 hover-primary">Termos de uso</a>
                <a href="#" className="text-decoration-none text-muted hover-primary">Política de privacidade</a>
              </small>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default SobreNos;