import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import { register } from "../managers/AuthManager";
import "../styles/Register.css"
import "../styles/Main.css"

export default function RegisterUser() {
  const history = useHistory();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Oopsie.");
    } else {
      const userProfile = { firstName, lastName, displayName, email };
      register(userProfile, password)
        .then(() => history.push("/"));
    }
 };

  return (
    <div> 
      <div className="all-mighty-container"></div> 
    <Form className="form--login" onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input className="loginForm-control" id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input className="loginForm-control" id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input className="loginForm-control" id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input className="loginForm-control" id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input className="loginForm-control" id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input className="loginForm-control" id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button className="login-button">Register</Button>
          <em>
          Already have an account?{" "}<Link className= "signUp-Link" to="/login">{" "}Login</Link>
        </em>
        </FormGroup>
      </fieldset>
    </Form>
    </div>
  );
}