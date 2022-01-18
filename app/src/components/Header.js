import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const authService = require("../services/auth");

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded = jwt_decode(accessToken);
      setUser(decoded.email);
    } else {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <b>CONTACT MANAGER</b>
          </a>
          <form className="d-flex">
            {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
            {user}
            <button className="btn btn-outline-success" onClick={logout}>
              Logout
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Header;
