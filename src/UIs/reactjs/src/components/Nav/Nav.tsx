import React from "react";
import { NavLink } from "react-router-dom";

import { isAuthenticated } from "../../containers/Auth/authService";
import classes from "./Nav.module.css";

const Nav = () => {
  const pageTitle = "ClassifiedAds.React";
  return (
    <nav
      className={"navbar navbar-expand navbar-light bg-light " + classes.Nav}
      style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
    >
      <a className="navbar-brand" href="/">
        {pageTitle + " " + React.version}
      </a>
      <ul className="nav nav-pills">
        <li>
          <NavLink className="nav-link" to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/settings">
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/files">
            Files
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/auditlogs">
            Audit Logs
          </NavLink>
        </li>

        {!isAuthenticated() ? (
          <li>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
        ) : null}

        {isAuthenticated() ? (
          <li>
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Nav;
