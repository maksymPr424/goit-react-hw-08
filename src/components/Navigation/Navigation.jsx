import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink className={css.link} to="/">
        Home
      </NavLink>
      <ul className={css.list}>
        <li>
          <NavLink className={css.link} to="/register">
            Register
          </NavLink>
        </li>
        <li>
          <NavLink className={css.link} to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
