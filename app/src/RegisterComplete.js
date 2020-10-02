import React from "react";
import { isAuth } from "./helpers/auth";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./Styles/register.css";
import AsateraLogo from "./components/AsateraLogo";

export const RegisterComplete = () => {

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      {isAuth() ? <Redirect to="/" /> : null}
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
