import React, { useState } from "react";
import { Link, NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { logout } from "../../managers/AuthManager";
import "./Header.css";
import logo from "../../images/watchparty1.png";

export default function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav-total-container">
      <Navbar style={{ backgroundColor: "#013328" }} light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
          {/* <NavbarBrand tag={RRNavLink} to="/" className="text-white"> */}
          <img
            alt=""
            src={logo}
            // width="30px"
            // height="30px"
            className="d-inline-block align-top nav-logo"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/" className="text-white">
                    Events
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    to="/event/add"
                    className="text-white"
                  >
                    Create Event
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    to="/myevents"
                    className="text-white"
                    activeClassName="active"
                  >
                    My Events
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav navbar>
            {isLoggedIn && (
              <>
                <NavItem>
                  <Link className="logout-link" to={`/`} onClick={logout}>
                    Logout
                  </Link>
                  {/* <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a> */}
                </NavItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink className="text-white" tag={RRNavLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="text-white"
                    tag={RRNavLink}
                    to="/register"
                  >
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
