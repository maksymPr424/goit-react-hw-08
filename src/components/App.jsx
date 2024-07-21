import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import Navigation from "./Navigation/Navigation";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RestrictedRoute = lazy(() => import("./RestrictedRoute"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
// import css from "./App.module.css";

// import ContactList from "./ContactList/ContactList";
// import SearchBox from "./SearchBox/SearchBox";
// import ContactForm from "./ContactForm/ContactForm";

function App() {
  return (
    // <div className={css.container}>
    //   <h1 className={css.title}>Phonebook</h1>
    //   <div className={css.forms}>
    //     <ContactForm />
    //     <SearchBox />
    //   </div>
    //   <ContactList />
    // </div>
    <>
      <Navigation />
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={<RestrictedRoute component={<RegisterPage />} />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute component={<LoginPage />} />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
