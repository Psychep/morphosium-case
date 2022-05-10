import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
