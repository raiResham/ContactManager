import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Contact from "./Contact";
import Header from "./Header";

const userService = require("../services/user");
const authService = require("../services/auth");

function Home() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [serverError, setServerError] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");

  const fetchContacts = async () => {
    try {
      const response = await userService.getContacts();
      setContacts(response.data);
    } catch (err) {
      if (err.response) {
        if (err.response.status == 500) {
          setServerError(true);
          setServerErrorMsg(
            "Oops! Something went wrong. Please try again later."
          );
        } else {
          authService.logout();
          navigate("/login");
        }
      }
    }
  };

  useEffect(async () => {
    document.title = "Home";
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetchContacts();
    } else {
      navigate("/login");
    }
  }, []);

  const editHandler = (id) => {
    navigate("/editContact/" + id);
  };

  const deleteHandler = async (id) => {
    try {
      await userService.deleteContact(id);
    } catch (err) {
      console.log("err:", err);
    }
    fetchContacts();
  };

  return (
    <div className ="container">
      {serverError && (
        <div className="alert alert-danger" role="alert">
          {serverErrorMsg}
        </div>
      )}
      {!serverError && (
        <div>
          <Header/>
          <p>Home page</p>
          <Link to="/addContact">
            <button>Add Contact</button>
          </Link>
          {contacts.length === 0 ? "No Contacts to display" : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => {
                return (
                  <Contact
                    key={contact.id}
                    contact={contact}
                    editClickHandler={editHandler}
                    deleteClickHandler={deleteHandler}
                  ></Contact>
                );
              })}
            </tbody>
          </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
