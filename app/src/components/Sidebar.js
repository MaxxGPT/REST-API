import React, { Component } from "react";
import "../Styles/sidebar.css";
import { Nav } from "react-bootstrap";

export default class Sidebar extends Component {
  render() {
    return (
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home">Active</Nav.Link>
        <Nav.Link href="/link">Link</Nav.Link>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav>
    );
  }
}
