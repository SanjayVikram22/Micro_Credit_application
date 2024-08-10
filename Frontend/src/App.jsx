import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/googlesignin/Signin";
import LoanForm from "./components/LoanForm/LoanForm";
import AdminForm from "./components/Admin/AdminForm";
import NotEligiblePage from "./components/NotEligible/NotEligiblePage";
import Eligible from "./components/Eligible/Eligible";
import Home from "./components/Home/Home";
import ProtectedRoute from "./components/Admin/ProtectedRoute";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    gender: "",
    age:"",
    education: "",
    employeeStatus: "",
    maritalStatus: "",
    dependents: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    reqLoanAmt: "",
    creditHist: "",
    loanRepayment: "",
    prediction: "",
    Approval: "",
  });

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminForm />
              </ProtectedRoute>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route
            path="/home/loanform"
            element={<LoanForm formData={formData} setFormData={setFormData} />}
          />
          <Route
            path="/home/loanform/eligible"
            element={<Eligible formData={formData}/>}
          />
          <Route
            path="/home/loanform/noteligible"
            element={<NotEligiblePage formData={formData} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
