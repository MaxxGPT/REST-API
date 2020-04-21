import React, { Component } from "react";
import "../Styles/sidebar.css";
//import { Nav } from "react-bootstrap";

export default class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <nav role="navigation" class="sidebar-nav" id="Sidebar-scroll">
            <div class="sidebar-nav-group NavGroup-shown">
              <ul class="sidebar-nav-times loaded"> 
                <li class>
                  <a class="sidebar-nav-item hoverable selected" href="/Developers/#intro">Introduction</a>
                </li>
                <li class>
                  <a class="sidebar-nav-item hoverable selected" href="/Developers/#authentication">Authentication</a> 
                </li>
                <li class>
                  <a class="sidebar-nav-item hoverable selected" href="/Developers/#errors">Errors</a>
                </li>
                <li class>
                  <a class="sidebar-nav-item hoverable selected" href="/Developers/#endpoints">Endpoints</a>
                </li>
                <li class> 
                  <a class="sidebar-nav-item hoverable selected" href="/Developers#libraries">Libraries</a>
                </li>
                      
              </ul>
            </div>
        </nav>
      </div>
    );
  }
}
