import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "./Header";
const userService = require("../services/user");

const AddContact = () => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const validate = Yup.object({
    name: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    favourite: Yup.string().oneOf(["yes", "no"]).required(),
  });

  useEffect(() => {
    document.title = "Add Contact";
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

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        favourite: "no",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        const { name, phone, favourite } = values;
        try {
          const response = await userService.addContact(name, phone, favourite);
          handleResponse(response);
        } catch (err) {
          setSuccessful(false);
          setMessage("Oops! Something went wrong. Please again later.");
        }
      }}
    >
      {({ touched, errors, dirty, isValid }) => (
        <div>
          <Header />
          <div className="row justify-content-center">
            <div className="col-4">
              <h4>Add Contact</h4>
              <Form>
                {message && (
                  <div className="form-group">
                    <div
                      className={
                        successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
                <div className="form-group mb-3">
                  <label className="form-label">Name</label>
                  <Field
                    name="name"
                    type="text"
                    className={`form-control ${
                      touched.name && errors.name ? "is-invalid" : ""
                    }`}
                  />
                </div>
                <ErrorMessage name="name" component="div" className="error" />

                <div className="form-group mb-3">
                  <label className="form-label">Phone</label>
                  <Field
                    name="phone"
                    type="text"
                    className={`form-control ${
                      touched.phone && errors.phone ? "is-invalid" : ""
                    }`}
                  />
                </div>
                <ErrorMessage name="phone" component="div" className="error" />

                <div className="form-group mb-3">
                  <label className="form-label">Favourite(yes/no)</label>
                  <Field
                    name="favourite"
                    type="text"
                    className={`form-control ${
                      touched.favourite && errors.favourite ? "is-invalid" : ""
                    }`}
                  />
                </div>
                <ErrorMessage
                  name="favourite"
                  component="div"
                  className="error"
                />

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!(dirty && isValid) || successful}
                >
                  Add
                </button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddContact;
