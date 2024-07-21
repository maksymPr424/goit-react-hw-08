import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";
import { nanoid } from "nanoid";

const initValues = {
  name: "",
  email: "",
  password: "",
};

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
});

export default function RegisterForm() {
  const nameId = nanoid();
  const emailId = nanoid();
  const passwordId = nanoid();

  const registerSubmit = (values, action) => {
    action.resetForm();
  };

  return (
    <Formik
      validationSchema={registerSchema}
      initialValues={initValues}
      onSubmit={registerSubmit}
    >
      <Form className={css.form}>
        <div className={css.inputDiv}>
          <label className={css.label} htmlFor={nameId}>
            Name
          </label>
          <Field
            id={nameId}
            placeholder="Enter name"
            className={css.input}
            type="text"
            name="name"
          ></Field>
          <ErrorMessage
            className={css.errorMessage}
            name="name"
            component="span"
          />
        </div>
        <div className={css.inputDiv}>
          <label className={css.label} htmlFor={emailId}>
            Email
          </label>
          <Field
            id={emailId}
            placeholder="Enter email"
            className={css.input}
            type="email"
            name="email"
          ></Field>
          <ErrorMessage
            className={css.errorMessage}
            name="email"
            component="span"
          />
        </div>
        <div className={css.inputDiv}>
          <label className={css.label} htmlFor={passwordId}>
            Password
          </label>
          <Field
            id={passwordId}
            placeholder="Enter password"
            className={css.input}
            type="text"
            name="password"
          ></Field>
          <ErrorMessage
            className={css.errorMessage}
            name="password"
            component="span"
          />
        </div>
        <button className={css.submitBtn} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
}
