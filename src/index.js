import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import DabliuContextProvider from "contexts/DabliuContextProvider";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <DabliuContextProvider>
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route path="/landing" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={Index} />
        <Redirect from="*" to="/" />
      </DabliuContextProvider>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
