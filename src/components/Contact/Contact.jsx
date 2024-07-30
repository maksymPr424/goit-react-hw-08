import css from "./Contact.module.css";
import { PiPhoneCallFill } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { delateContact, editContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { BiTrash, BiPencil } from "react-icons/bi";
import { BsSendArrowUp } from "react-icons/bs";
import clsx from "clsx";

export default function Contact({ name, number, id }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [contactChange, setContactChange] = useState({
    name,
    number,
  });

  const notifySuccess = () => toast.success("Success operation!");
  const notifyError = () =>
    toast.error("Something went wrong. Please try again!");

  const del = () => {
    dispatch(delateContact(id));
  };
  const edit = () => {
    setEditing(true);
  };

  const setInputValue = (e) => {
    const targetInput = e.target.name;
    const targetValue = e.target.value;
    setContactChange((prev) => {
      return {
        ...prev,
        [targetInput]: targetValue,
      };
    });
  };

  const submitEdit = () => {
    dispatch(editContact({ id, contactChange }))
      .unwrap()
      .then(() => {
        notifySuccess();
      })
      .catch(() => {
        notifyError();
      })
      .finally(() => {
        setEditing(false);
      });
  };

  return (
    <>
      {editing ? (
        <div>
          <h2 className={css.text}>
            <BsPeopleFill className={css.icon} />{" "}
            <input
              className={css.input}
              name="name"
              type="text"
              value={contactChange.name}
              onChange={setInputValue}
            />
          </h2>
          <p className={css.text}>
            <PiPhoneCallFill className={css.icon} />
            <input
              className={css.input}
              name="number"
              type="text"
              value={contactChange.number}
              onChange={setInputValue}
            />
          </p>
        </div>
      ) : (
        <div>
          <h2 className={css.text}>
            <BsPeopleFill className={css.icon} /> {name}
          </h2>
          <a href={`tel:${number}`} className={css.text}>
            <PiPhoneCallFill className={css.icon} />
            {number}
          </a>
        </div>
      )}
      <div>
        {!editing ? (
          <button onClick={edit} className={css.btn}>
            <BiPencil className={css.icon} />
          </button>
        ) : (
          <button onClick={submitEdit} className={css.btn}>
            <BsSendArrowUp className={css.icon} />
          </button>
        )}
        <button onClick={del} className={clsx(css.btn, css.delBtn)}>
          <BiTrash className={css.icon} />
        </button>
      </div>
      <Toaster />
    </>
  );
}
