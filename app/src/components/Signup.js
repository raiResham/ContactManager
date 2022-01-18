import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, replace } from "formik";
import * as Yup from "yup";
import {  Link } from "react-router-dom";

const authService = require("../services/auth");

function Signup() {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Signup";
  });

  const handleResponse = (response) => {
    if (response.data) {
      if (response.data.error) {
        setSuccessful(false);
        setMessage(response.data.message);
      } else {
        setSuccessful(true);
        setMessage(response.data.message);
      }
    }
  };

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        const { email, password, confirmPassword } = values;
        try {
          const response = await authService.signup(
            email,
            password,
            confirmPassword
          );
          handleResponse(response);
        } catch (err) {
          setSuccessful(false);
          setMessage("Oops! Something went wrong. Please again later.");
        }
      }}
    >
      {({ touched, errors, dirty, isValid }) => (
        <div className="row justify-content-center">
          <div className="col-4">
            <h4>Signup page</h4>
            <Form>
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}

              <div className="form-group mb-3">
                <label className="form-label">Email</label>
                <Field
                  name="email"
                  type="email"
                  className={`form-control ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                />
              </div>
              <ErrorMessage name="email" component="div" className="error" />
              <div className="form-group mb-3">
                <label className="form-label">Password</label>
                <Field
                  name="password"
                  type="password"
                  className={`form-control ${
                    touched.password && errors.password ? "is-invalid" : ""
                  }`}
                />
              </div>
              <ErrorMessage name="password" component="div" className="error" />
              <div className="form-group mb-3">
                <label className="form-label">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={`form-control ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "is-invalid"
                      : ""
                  }`}
                />
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!(dirty && isValid) || successful}
              >
                Signup
              </button>
              <p>
                Already have an Account. <Link to="/login">Log In</Link>
              </p>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Signup;
