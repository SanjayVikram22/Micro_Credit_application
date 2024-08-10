import React, { useEffect } from "react";
import j from "/j.svg";

export default function EligibleForm({ formData }) {
  const monthlyRate = 0.01;
  const months = formData.loanRepayment * 12;
  const principal = formData.reqLoanAmt;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);


  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 m-10">
      <div>
        <h1 className="font-bold text-2xl">
          Congratulations, {formData.name}!
        </h1>
        <h2 className="font-semibold text-xl p-4">
          You are eligible for a loan with the loan amount of ₹{principal}.
        </h2>
        <h2 className="font-semibold text-xl p-4">
          Your Monthly EMI for the loan amount of ₹{formData.reqLoanAmt} will be
          ₹{emi.toFixed(2)}.
        </h2>
      </div>
      <div className="m-auto hidden lg:block">
        <img src={j} alt="Illustration" />
      </div>
    </div>
  );
}
