import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { isAuth } from "./helpers/auth";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/register.css";
import AsateraLogo from "./components/AsateraLogo";

export const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  //handle change from inputs
  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  //submit data to the backend
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userData.name && userData.email && userData.password) {
      if (userData.password === userData.password2) {
        axios
          .post(`/api/auth`, userData)
          .then((res) => {
            setUserData({
              ...userData,
              name: "",
              email: "",
              password: "",
              password2: "",
            });

            toast.success(res.data.messages);
          })
          .catch((err) => {
            toast.error(err.response.data.error);
          });
      } else {
        toast.error("Password does not match");
      }
    } else {
      toast.error("Fill in all the data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <Container className="rounded-big shadow mt-5">
        <Row>
          <Col className="pt-5 m-5">
            <AsateraLogo />
            <h1 className="mt-5">Create Account</h1>
            <Form onSubmit={handleSubmit} className="mb-5">
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword2">
                <Form.Label>Password Confirm</Form.Label>
                <Form.Control
                  type="password"
                  name="password2"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" size="lg" block>
                Create an account
              </Button>
            </Form>
            <Row>
              <Col>
                <p className="label">
                  Or sign wth email <Link to="/Login">Sign In</Link>
                </p>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex align-items-stretch bg-blue rounded-big-r">
            <img src="/assets/login_logo.svg" alt="logo" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
