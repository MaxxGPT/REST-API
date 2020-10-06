import React from "react";
import { isAuth } from "../../helpers/auth";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../Styles/register.css";
import AsateraLogo from "../../components/AsateraLogo";

export const RegisterComplete = () => {

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      {isAuth() ? <Redirect to="/" /> : null}
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col className="py-5 pt-sm-5 m-sm-5 rounded-big shadow col-xs-12 col-md-8">
            <AsateraLogo />
            <Row>
              <Col className="d-flex align-items-stretch my-5">
                <p className="label text-center">
                    Registeration Completed. Please confirm
                    your email id by clicking on the link sent
                    to your email.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterComplete;
