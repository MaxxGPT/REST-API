import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { isAuth } from "./helpers/auth";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

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
    <Container>
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <Row>
        <Col>
          <h1 className="text-2xl xl:text-3xl font-extrabold">Register</h1>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row>
        <Col>
          <p>
            Or sign wth email <Link to="/Login">Sign In</Link>
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src="/assets/login_logo.svg" alt="logo" />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
