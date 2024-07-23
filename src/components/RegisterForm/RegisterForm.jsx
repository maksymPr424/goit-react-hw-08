import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import clsx from "clsx";

const initValues = {
  name: "",
  email: "",
  password: "",
};

const initState = {
  hard: false,
  middle: false,
  easy: false,
};

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(8, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
});

export default function RegisterForm() {
  const nameId = nanoid();
  const emailId = nanoid();
  const passwordId = nanoid();
  const dispatch = useDispatch();
  const [color, setColor] = useState(initState);
  const [passValue, setValue] = useState("");

  const hasLetters = /[a-zA-Z]/.test(passValue);
  const hasDigits = /\d/.test(passValue);
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(passValue);

  const isRedClass = clsx(
    passValue.length < 8 && passValue.length !== 0 && css.red
  );

  const firstClass = clsx(
    css.message,
    isRedClass ||
      (color.hard && css.green) ||
      (color.middle && css.yellow) ||
      (color.easy && css.red)
  );

  const secondClass = clsx(
    css.message,
    isRedClass,
    (color.hard && css.green) || (color.middle && css.yellow)
  );

  const thirdClass = clsx(css.message, isRedClass, color.hard && css.green);

  const changeInput = (e) => {
    const inputValue = e.target.value.trim();
    const filteredValue = inputValue
      .split("")
      .filter((item) => item !== " ")
      .join("");
    setValue(filteredValue);
  };

  useEffect(() => {
    const typesCount = [hasDigits, hasLetters, hasSymbols].filter(
      Boolean
    ).length;

    switch (typesCount) {
      case 3:
        setColor((prev) => {
          return {
            ...prev,
            hard: true,
          };
        });

        break;
      case 2:
        setColor((prev) => {
          return {
            ...prev,
            middle: true,
            hard: false,
          };
        });
        break;
      case 1:
        setColor((prev) => {
          return {
            ...prev,
            easy: true,
            middle: false,
            hard: false,
          };
        });
        break;
      default:
        setColor(initState);
        break;
    }
  }, [hasDigits, hasLetters, hasSymbols]);

  const notifyError = () =>
    toast.error("Something went wrong. Please try again!");

  const registerSubmit = (values, action) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        action.resetForm();
      })
      .catch(() => {
        notifyError();
      });
  };

  return (
    <>
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
              onChange={changeInput}
              value={passValue}
              id={passwordId}
              className={css.input}
              placeholder="Enter password"
              type="password"
              name="password"
            />
            <div className={css.output}>
              <div className={firstClass}></div>
              <div className={secondClass}></div>
              <div className={thirdClass}></div>
            </div>
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
      <Toaster />
    </>
  );
}
