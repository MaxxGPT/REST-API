import React, {useState} from 'react'
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { request } from './services/Request';
import "./Styles/login.scss"
import AsateraLogo from "./components/AsateraLogo";
import { ToastContainer, toast } from "react-toastify";

export const Login = () => {

    const [loginData,setLoginData] = useState({});

    const handleChange = (event) => {
          // update the state;
          let currentLoginData = loginData;
          currentLoginData[event.target.name] = event.target.value;
          setLoginData( currentLoginData );
    }

    const handleSubmit = (event) => {
          event.preventDefault();
          const data = JSON.stringify( loginData );
          const result = request("/api/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
          });
          result.then( (result) =>{
              if(result.error){
                toast.error("Email or password incorrect");
              }else{
                  window.location.href="/dashboard";
              }
          });
    }

    return (
        <Container className="rounded-big shadow mt-5 login">
            <ToastContainer />
            <Row>
                <Col className="pt-3 pt-sm-5 m-sm-5">
                    <AsateraLogo />
                    <h1 className="mt-5">Welcome Back!</h1>
                    <h3>Sign in to continue</h3>
                    <Form onSubmit={handleSubmit} className="mb-5">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                            type="text"
                            name="email"
                            onChange={handleChange}
                            required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            type="password"
                            name="password"
                            onChange={handleChange}
                            required
                            />
                        </Form.Group>
                        <div className="forgot text-right my-3">
                            <Link to="/forgot">forgot password?</Link>
                        </div>
                        <Button variant="primary" type="submit" size="lg" block>
                            Login
                        </Button>
                        <Button href="/register" variant="outline-secondary" size="lg" block className="mt-3">Create an account</Button>
                    </Form>
                </Col>
                <Col className="d-none d-sm-flex align-items-stretch bg-blue rounded-big-r">
                    <img src="/assets/login_logo.svg" alt="logo" />
                </Col>
            </Row>
         </Container>
        );

 };
