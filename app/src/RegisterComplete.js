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

export const RegisterComplete = () => {
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

            toast.success(res.data.msg);
          })
          .catch((err) => {
            console.log("err", err.request);
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
      toast.error("Fill in all the data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      {isAuth() ? <Redirect to="/" /> : null}
      <ToastContainer />
      <Container className="rounded-big shadow mt-5">
        <Row>
          <Col className="pt-3 pt-sm-5 m-sm-5">
            <AsateraLogo />
            <Row>
              <Col className="d-flex align-items-stretch mt-5">
                <p className="label text-center">
                    Registeration Completed. Please confirm
                    your email id by clicking on the link sent
                    to your email.
                </p>
              </Col>
            </Row>
          </Col>
          <Col className="d-none d-sm-flex align-items-stretch bg-blue rounded-big-r">
            <img src="/assets/registration-completed.svg" className="my-5" alt="logo" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterComplete;
