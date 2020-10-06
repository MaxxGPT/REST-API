import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/register.css";
import AsateraLogo from "../../components/AsateraLogo";

export const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  //handle change from inputs
  const handleChange = (event) => {
    const value = ["terms"].includes(event.target.name) ? event.target.checked : event.target.value
    setUserData({ ...userData, [event.target.name]: value });
  };

  //submit data to the backend
  const handleSubmit = (event) => {
    event.preventDefault();

    if (userData.name && userData.email && userData.password) {
      if(userData.terms){
        if (userData.password === userData.password2) {
          axios
            .post(`/api/auth`, userData)
            .then((res) => {
                window.location.href = "/register-complete";
            })
            .catch((err) => {
              console.log("err", err);
              if (err.request.status === 400) {
                toast.error("Something went wrong");
              } else if (err.request.status === 405) {
                toast.warning("Email is already registered");
              }
            });
        } else {
          toast.error("Password does not match");
        }
      } else {
        toast.error("You must agree to the terms and conditions");
      }
    } else {
      toast.error("Fill in all the data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col className="pt-3 pt-sm-3 m-sm-3 rounded-big shadow col-xs-12 col-md-8 ">
            <AsateraLogo />
            <h1 className="mt-3">Create an Account</h1>
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
              <Form.Group controlId="formBasicTerms">
                <label>
                  <input type="checkbox" className="mr-2" name="terms" onChange={handleChange} />
                  I agree with <Link to="/terms">terms and conditions</Link>
                </label>
              </Form.Group>
              <Button variant="primary" type="submit" size="lg" block>
                Create an account
              </Button>
            </Form>
            <Row>
              <Col>
                <p className="label text-center">
                  Already have an account? <Link to="/Login">Login</Link>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
