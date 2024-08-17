import { PiPhoneCallFill } from "react-icons/pi";
import { BsPeopleFill } from "react-icons/bs";
import { BiTrash, BiPencil } from "react-icons/bi";
import { BsSendArrowUp } from "react-icons/bs";
// import { BiGlobe } from "react-icons/bi";
// import { IoIosArrowDropdown } from "react-icons/io";
// import { IoMdMail } from "react-icons/io";
// import { MdDescription } from "react-icons/md";
// import { FaLinkedin } from "react-icons/fa";

import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { delateContact, editContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import clsx from "clsx";
// import { Accordion, AccordionItem } from "@szhsin/react-accordion";

export default function Contact({
  name,
  number,
  // country,
  // note,
  // linkedIn,
  // mail,
  id,
}) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [contactChange, setContactChange] = useState({
    name,
    number,
    // country,
    // note,
    // linkedIn,
    // mail,
  });

  // console.log(contactChange);

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
      <div className={css.container}>
        {editing ? (
          <div>
            <h2 className={css.text}>
              <BsPeopleFill className={css.icon} />
              <input
                className={`${css.input} addHoverToInput`}
                name="name"
                type="text"
                value={contactChange.name}
                onChange={setInputValue}
              />
            </h2>
            <p className={css.text}>
              <PiPhoneCallFill className={css.icon} />
              <input
                className={`${css.input} addHoverToInput`}
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
            <p className={css.text}>
              <PiPhoneCallFill className={css.icon} />
              {number}
            </p>
          </div>
        )}
        <div className={css.editBox}>
          {!editing ? (
            <button
              disabled={id === 76200}
              onClick={edit}
              className={clsx(css.btn, css.editBtn)}
            >
              <BiPencil className={css.icon} />
            </button>
          ) : (
            <button onClick={submitEdit} className={clsx(css.btn, css.editBtn)}>
              <BsSendArrowUp className={css.icon} />
            </button>
          )}
          <button disabled={id === 76200} onClick={del} className={css.btn}>
            <BiTrash className={css.icon} />
          </button>
        </div>
      </div>
      {/* <Accordion className={css.accordion}>
        <AccordionItem
          className={css.list}
          header={
            <div className={css.toggleInfo}>
              <p className={css.toggleText}>More info</p>
              <IoIosArrowDropdown className={css.arrow} />
            </div>
          }
        >
          {editing ? (
            <>
              <p className={css.text}>
                <MdDescription className={css.icon} />
                <textarea
                  className={`${css.input} addHoverToInput`}
                  name="note"
                  type="text"
                  value={contactChange.note}
                  onChange={setInputValue}
                />
              </p>
              <p className={css.text}>
                <IoMdMail className={css.icon} />
                <input
                  className={`${css.input} addHoverToInput`}
                  name="mail"
                  type="text"
                  value={contactChange.mail}
                  onChange={setInputValue}
                />
              </p>
              <p className={css.text}>
                <PiPhoneCallFill className={css.icon} />
                <input
                  className={`${css.input} addHoverToInput`}
                  name="number"
                  type="text"
                  value={contactChange.number}
                  onChange={setInputValue}
                />
              </p>
              <p className={css.text}>
                <FaLinkedin className={css.icon} />
                <input
                  className={`${css.input} addHoverToInput`}
                  name="linkedIn"
                  type="text"
                  value={contactChange.linkedIn}
                  onChange={setInputValue}
                />
              </p>
            </>
          ) : (
            <>
              <p className={css.text}>
                <MdDescription className={css.icon} />
                {note ?? "Complete info"}
              </p>
              <p className={css.text}>
                <IoMdMail className={css.icon} />
                {mail ?? "Complete info"}
              </p>
              <p className={css.text}>
                <PiPhoneCallFill className={css.icon} />
                {number ?? "Complete info"}
              </p>
              <a href={linkedIn} className={css.text}>
                <FaLinkedin className={css.icon} />
                {linkedIn ? "Link to LinkedIn" : "Complete info"}
              </a>
            </>
          )}
        </AccordionItem>
      </Accordion> */}
      <Toaster />
    </>
  );
}
