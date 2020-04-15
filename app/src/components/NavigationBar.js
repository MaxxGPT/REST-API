import React, {useEffect, useState} from 'react';
import {Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { request } from '../services/Request';

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;

        &:hover {
            color: white;
        }
    }
`;

export const NavigationBar = () => {

    const [isLogin,setLogin] = useState(false);

    useEffect(()=>{
        request('/api/users/me', {noRedirect:true}).then((result)=>{
            if(result.data){
                setLogin(true);
                console.log(isLogin);
            }
        });
    }, []);

    const logout = () => {
        request('/api/register/logout', {}).then((result)=>{
            window.location.href = "/login";
        });
    }

    return (
        <Styles>
            <Navbar expand="lg">
                <Navbar.Brand href="/"> AsaTera </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">         
                        <Nav.Item><Nav.Link href="/Developers">Developers</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/Pricing">Pricing</Nav.Link></Nav.Item>
                        { !isLogin &&
                            <Nav.Item><Nav.Link href="/Login">Login</Nav.Link></Nav.Item>       
                        }
                        { isLogin &&
                            <Nav.Item><Nav.Link onClick={logout}>Logout</Nav.Link></Nav.Item>       
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    );
}