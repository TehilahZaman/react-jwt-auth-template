import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import SignInForm from "./components/SignInForm/SignInForm";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;
