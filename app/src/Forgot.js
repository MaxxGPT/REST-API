import React, {useState} from 'react'
import { Alert, Button, Form, Container, Row, Col } from "react-bootstrap";
import { request } from './services/Request';
import AsateraLogo from "./components/AsateraLogo";

export const Forgot = () => {

    const [resetData,setResetData] = useState({});
    const [emailSent,setEmailSent] = useState(false);

    const handleChange = (event) => {
          // update the state;
          let _resetData = resetData;
          _resetData[event.target.name] = event.target.value;
          setResetData( _resetData );
    }

    const handleSubmit = (event) => {
          event.preventDefault();
          const data = JSON.stringify( resetData );
          const result = request("/api/auth/reset", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
          });
          result.then( (result) =>{
              setEmailSent(true);
          });
    }

    return (
        <Container className="rounded-big shadow mt-5 login">
            <Row>
                <Col className="pt-3 pt-sm-5 m-sm-5">
                    <AsateraLogo />
                    <h1 className="mt-5">Reset Password</h1>
                    <h3>Enter email to reset your password</h3>
                    { !emailSent && (
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
                            <Button variant="primary" type="submit" size="lg" block>
                                Send email
                            </Button>
                        </Form>
                        )
                    }
                    { emailSent && (
                        <Alert variant="success">You will get an email with instructions to reset your password</Alert>
                    )}
                </Col>
                <Col className="d-none d-sm-flex align-items-stretch bg-blue rounded-big-r">
                    <img src="/assets/forgot.svg" alt="logo" />
                </Col>
            </Row>
         </Container>
        );

 };


export default Forgot;
