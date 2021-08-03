import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import EventList from "./EventList";
import EventForm from "./EventForm";
import MyEventList from "./MyEventList";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <EventList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/event/add">
          <EventForm />
        </Route> 

        <Route path="/myevents">
          <MyEventList />
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
};