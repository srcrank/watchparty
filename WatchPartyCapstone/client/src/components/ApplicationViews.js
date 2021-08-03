import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import EventList from "./EventList";
import EventForm from "./EventForm";
import MyEventList from "./MyEventList";
import EditMyEvent from "./EventEditForm";
import EventDetails from "./EventDetails";

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

        <Route path="/event/edit/:id">
          <EditMyEvent />
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
