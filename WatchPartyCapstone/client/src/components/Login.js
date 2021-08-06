import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { login } from "../managers/AuthManager";
import "../styles/Main.css"
import "../styles/Login.css"

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  //className="list-total-container"

  return (
    <div >
      <div className="all-mighty-container"></div> 
      <div className="container--login">
    <Form className="form--login" onSubmit={loginSubmit}>
      <fieldset >
        <FormGroup>
          <Label for="email">Email</Label>
          <Input className="loginForm-control" id="email" type="text" class="w-25" autoFocus onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input className="loginForm-control" id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button className="login-button">Login</Button>
        </FormGroup>
        <em>
          Don't have an account?{" "}<Link className= "signUp-Link" to="/register">{" "}Sign up</Link>
        </em>
      </fieldset>
    </Form>
    </div>
    </div>
    
  );
}