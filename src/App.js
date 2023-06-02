import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarGit from "./components/NavBarGit";
import HomePage from "./components/HomePage";
import About from "./components/About";
import SignUp from "./components/SignUp";
import LogIn from "./components/Login";
import Complain from "./components/Complain";
import ComplainTable from "./components/ComplainTable";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <NavBarGit />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/complain" element={<Complain />} />

        <Route path="/tasks" element={<ComplainTable />} />
      </Routes>
      <Footer />
    </BrowserRouter> //used for navigating without rendering pages again and again
  );
};

export default App;
