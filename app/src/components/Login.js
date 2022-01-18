import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const authService = require("../services/auth");

function Login() {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const handleResponse = (response) => {
    if (response.data) {
      if (response.data.error) {
        setSuccessful(false);
        setMessage(response.data.message);
      } else {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        navigate("/");
      }
    }
  };

  useEffect(async () => {
    document.title = "Login";
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/");
    }
  }, []);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        const { email, password } = values;
        try {
          const response = await authService.login(email, password);
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
            <h4>Login page</h4>
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
                  type="text"
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

              <button
                type="submit"
                className="btn btn-primary"
                disabled={!(dirty && isValid) || successful}
              >
                Login
              </button>
              <p>
                Don't have an Account. <Link to="/signup">Signup</Link>
              </p>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;
