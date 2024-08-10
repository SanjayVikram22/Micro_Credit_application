import React from "react";

export default function NotEligibleForm({ formData }) {
  const netMonthlyIncome = formData.monthlyIncome;
  const monthlyexp = formData.monthlyExpenses;
  const loanTenureYears = formData.loanRepayment;
  const annualInterestRate = 12;
  const debtToIncomeRatio = 100;

  // Calculate Net Monthly Income
  const netIncome = netMonthlyIncome - monthlyexp;

  // Determine the EMI
  const maxEMI = netIncome * (debtToIncomeRatio / 100);

  // Convert Annual Interest Rate to Monthly Interest Rate
  const monthlyRate = annualInterestRate / (12 * 100);

  // Calculate Loan Tenure in Months
  const loanTenureMonths = loanTenureYears * 12;

  // Calculate Loan Amount using the EMI formula for a fixed-rate loan
  const loanAmount = (
    (maxEMI * (1 - Math.pow(1 + monthlyRate, -loanTenureMonths))) /
    monthlyRate
  ).toFixed(2);

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 m-12">
        <div>
          <h1 className="font-bold text-2xl">Sorry, {formData.name}!</h1>
          <h2 className="font-semibold text-xl p-4">
            You are not eligible for a loan with the requested amount of ₹
            {formData.reqLoanAmt}.
          </h2>
          <h2 className="font-semibold text-xl p-4">
            However, you can avail of a loan amount of ₹{loanAmount}.
          </h2>
          <h2 className="font-semibold text-xl p-4">
            For further details, please reach out to the bank.
          </h2>
        </div>
        <div className="m-auto hidden lg:block">
          <img src="/k.svg" alt="Reach" />
        </div>
      </div>
    </>
  );
}
