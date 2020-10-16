import React from 'react'
import {Col, Container, Row , Accordion,Card,Button} from "react-bootstrap";
import "./Styles/pricing.css"

export const Pricing = () => (
    <div>
        <div className="header-bg-img">
            <section className="mt-5 pt-5">
                <Container className="mt-5 mb-5">
                    <Row className="justify-content-md-center mt-5 pt-5">
                        <Col className="col-sm-12 col-12 col-12">
                            <h1 className="header-heading">Our pricing plan made simple. </h1>
                            <p className="header-sub-heading">All types of businesses need access to development resources, so we give you the option to decide how much you need to use.</p>
                            <div className="price-div-row">
                                <div className="price-item">
                                    <p className="price-t">Monthly</p>
                                </div>
                                <div className="price-item">
                                    <label className="switch" name="switch">
                                        <input type="checkbox" checked="" className="check_time" htmlFor="switch"/>
                                        <span className="slider round"></span>
                                    </label></div>
                                <div className="price-item">
                                    <p className="price-t">Annually</p>
                                </div>

                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center5 position-relative">
                        <img src="/assets/Oval-full.png" className="oval-over-img"/>
                        <Col className="col-sm-12 col-md-4 col-lg-4">
                            <div className="card price-card mb-5">
                                <div className="card-body">
                                    <h4 className="card-title">$0 <span>/month</span></h4>
                                    <h4 className="card-title2">Free Forever</h4>
                                    <p className="card-text">All the basics for businesses that are just getting started.</p>
                                    <hr />
                                    <ul className="feature-ul">
                                        <li>Single project use</li>
                                        <li>Basic dashboard</li>
                                    </ul>
                                    <a href="#" className="btn price-card-btn">Get standard</a>
                                </div>
                            </div>
                        </Col>
                        <Col className="col-sm-12 col-md-4 col-lg-4">
                            <div className="card price-card mb-5">
                                <div className="card-body">
                                    <h4 className="card-title color-1">$99 <span>/month</span></h4>
                                    <h4 className="card-title2">Developer</h4>
                                    <p className="card-text">Better for growing businesses that want more customers.</p>
                                    <hr />
                                    <ul className="feature-ul">
                                        <li>Unlimited project use</li>
                                        <li>Advanced dashboard</li>
                                        <li>All components included</li>
                                        <li>Advanced insight</li>
                                    </ul>
                                    <a href="#" className="btn price-card-btn">Get essential</a>
                                </div>
                            </div>
                        </Col>
                        <Col className="col-sm-12 col-md-4 col-lg-4">
                            <div className="card price-card mb-5">
                                <div className="card-body">
                                    <h4 className="card-title color-2">$339 <span>/month</span></h4>
                                    <h4 className="card-title2">Enterprise</h4>
                                    <p className="card-text">Advanced features for pros who need more customization.</p>
                                    <hr />
                                    <ul className="feature-ul">
                                        <li>Unlimited project use</li>
                                        <li>Advanced dashboard</li>
                                        <li>Mutlivariate components</li>
                                        <li>Phone Support</li>
                                        <li>Guaranteed 100% uptime</li>
                                        <li>Unlimited users</li>
                                    </ul>
                                    <a href="#" className="btn price-card-btn">Get premium</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
        <section className="section-top">
            <Container className="mt-5 mb-5">
                <Row className="justify-content-md-center mt-5 pt-5">
                    <Col className="col-sm-12 col-12 col-12">
                        <h1 className="plan-heading mt-5 pt-5">All subscription plans include these features</h1>

                    </Col>
                </Row>
                <Row className="justify-content-md-center5 mt-5 position-relative">

                    <Col className="col-sm-12 col-md-6 col-lg-6">
                        <div className="card plan-div mb-5">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 col-lg-3 col-sm-12">
                                        <img src="/assets/Group10.png" className="plan-icon-img"/>
                                    </div>
                                    <div className="col-md-8 col-lg-9 col-sm-12">
                                        <h4 className="card-title2">Feature 1</h4>
                                        <p className="card-text">Materials, education and campaigns to help you share with current and future clients.</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="col-sm-12 col-md-6 col-lg-6">
                        <div className="card plan-div mb-5">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 col-lg-3 col-sm-12">
                                        <img src="/assets/Group12.png" className="plan-icon-img"/>
                                    </div>
                                    <div className="col-md-8 col-lg-9 col-sm-12">
                                        <h4 className="card-title2">Feature 2</h4>
                                        <p className="card-text">Digital employee records, quoting, enrollment, and reporting in English and Indonesian.</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col><Col className="col-sm-12 col-md-6 col-lg-6">
                    <div className="card plan-div mb-5">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 col-lg-3 col-sm-12">
                                    <img src="/assets/Group11.png" className="plan-icon-img"/>
                                </div>
                                <div className="col-md-8 col-lg-9 col-sm-12">
                                    <h4 className="card-title2">Feature 3</h4>
                                    <p className="card-text">Access to our team of industry experts, personal training, support line and help desk.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                    <Col className="col-sm-12 col-md-6 col-lg-6">
                        <div className="card plan-div mb-5">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 col-lg-3 col-sm-12">
                                        <img src="/assets/Group13.png" className="plan-icon-img"/>
                                    </div>
                                    <div className="col-md-8 col-lg-9 col-sm-12">
                                        <h4 className="card-title2">Feature 4</h4>
                                        <p className="card-text">We can help you set up and manager your groups if you are become our partner.</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>


                </Row>
                <Row className="justify-content-md-center mt-5">
                    <Col className="col-sm-12 col-12 col-12">
                        <button type="submit" className="plan-btn btn">All features</button>
                    </Col>
                </Row>
            </Container>
        </section>
        <section className="overflow-hidden">
            <Container className="mt-5 mb-5">
                <Row className="justify-content-md-center mt-5 pt-5">
                    <Col className="col-sm-12 col-12 col-12">
                        <h1 className="plan-heading mt-5 pt-5">Some questions they
                            ask us often</h1>

                    </Col>
                </Row>
                <Row className="justify-content-md-center5 mt-5 position-relative">
                    <img src="/assets/Oval-half.png" className="oval-half" />
                    <img src="/assets/dot-bg.png" className="dot" />
                    <img src="/assets/dot-bg.png" className="dot-2" />
                    <Col className="col-sm-12 col-md-12 col-lg-12">
                        <Accordion defaultActiveKey="0">
                            <Card className="faq">
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        How do I pay for the Essentials or Premium plan?
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>You can pay with a credit card or via net banking (if you’re in United States). We will renew your subscription automatically at the end of every billing cycle.</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="faq">
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Can I cancel my Essentials or Premium plan subscription at any time?
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veniam.y</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="faq">
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        We need to add new users to our team. How will that be billed?
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veniam.y</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="faq">
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        My team wants to cancel its subscription. How do we do that? Can we get a refund?
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veniam.y</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card className="faq">
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Do you offer discounts for non-profit organizations or educational institutions?
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veniam.y</Card.Body>
                                </Accordion.Collapse>
                            </Card>

                        </Accordion>
                    </Col>

                </Row>

            </Container>
        </section>
    </div>


)