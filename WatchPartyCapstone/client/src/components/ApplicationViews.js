import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import EventList from "./EventList";
import EventForm from "./EventForm";
import MyEventList from "./MyEventList";
import EditMyEvent from "./EventEditForm";
import EventDetails from "./EventDetails";
import "../styles/Main.css";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
 
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <EventList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/event/add">
        {isLoggedIn ? <EventForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/myevents">
        {isLoggedIn ? <MyEventList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/event/edit/:id">
        {isLoggedIn ? <EditMyEvent /> : <Redirect to="/login" />}
        </Route>

        <Route path="/event/:id" exact>
          {isLoggedIn ? <EventDetails /> : <Redirect to='/login' />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}
