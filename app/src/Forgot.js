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
        <Container className="mt-5 forgot">
            <Row className="justify-content-md-center ">
                <Col className="pt-3 pt-sm-5 m-sm-5 rounded-big shadow col-xs-12 col-md-8">
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
            </Row>
         </Container>
        );

 };


export default Forgot;
