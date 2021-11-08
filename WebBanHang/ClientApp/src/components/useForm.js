import React, { useState } from "react";

import { Formik } from "formik";

export function Form(props) {
  const { initialValues, validationSchema, onSubmit, children, ...other } =
    props;
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {props.children}
    </Formik>
  );
}
