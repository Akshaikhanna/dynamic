import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function Validation() {

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(20, "Must be less than 20").required("Required"),
      email: Yup.string().email("Invalid Email Address").required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  console.log(formik.touched);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h1>Form</h1>
        <div>
          <label>Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <p>{formik.errors.name}</p>
          ) : null}
        </div>
        <div>
          <label>Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p>{formik.errors.email}</p>
          ) : null}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        {/* <p>{formik.values.name}</p><br/>
        <p>{formik.values.email}</p> */}
      </div>
    </div>
  );
}

export default Validation;
