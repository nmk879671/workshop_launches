import React from "react";
import ReactDom from "react-dom";
import Router from "./page/route";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar } from "react-bootstrap";
import logo from "./assets/images/logo.svg";

ReactDom.render(
  <>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect={true}>
      <Navbar.Brand href="#home">
        <div className="ps-3 align-me">
          <Navbar.Brand href="/home/listLaunches">
            <img src={logo} alt="" height="40px" />
          </Navbar.Brand>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/home/listLaunches">Home</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div className="pt-4 ps-5 pe-5">
      <div className="p-4 mb-4 bg-light rounded-3">
        <Router />
      </div>
    </div>
  </>,
  document.getElementById("root")
);
