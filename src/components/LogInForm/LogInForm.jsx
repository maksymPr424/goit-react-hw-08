import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./LogInForm.module.css";
import { nanoid } from "nanoid";

const initValues = {
  email: "",
  password: "",
};

export default function LogInForm() {
  const emailId = nanoid();
  const passwordId = nanoid();

  const registerSubmit = (values, action) => {
    action.resetForm();
  };

  return (
    <Formik initialValues={initValues} onSubmit={registerSubmit}>
      <Form className={css.form}>
        <div className={css.inputDiv}>
          <label className={css.label} htmlFor={emailId}>
            Name
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
            Name
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
          Login
        </button>
      </Form>
    </Formik>
  );
}
