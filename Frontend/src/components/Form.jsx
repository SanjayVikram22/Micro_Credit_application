import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoanForm({ formData, setFormData }) {
  const navigate = useNavigate();
  const [checkAge, setCheckAge] = useState(true);
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setFormData((prevData) => ({
        ...prevData,
        email: storedEmail,
      }));
    }
  }, [setFormData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "age") {
      if (value >= 18 && value <= 55) {
        setCheckAge(true);
      } else {
        setCheckAge(false);
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response1 = await axios.post(
        "http://localhost:5000/api/sendMessage",
        formData
      );
      const updatedFormData = {
        ...formData,
        prediction: response1.data.pred,
        Approval: response1.data.approval,
      };
      setFormData(updatedFormData);
      toast.success("Prediction received successfully!");

      const response2 = await axios.post("http://localhost:8001/form", {
        condetails: updatedFormData,
      });
      toast.success("Form submitted successfully!");
      console.log(response2);

      setTimeout(() => {
        if (updatedFormData.Approval === 1) {
          navigate("/home/loanform/eligible");
        } else {
          navigate("/home/loanform/noteligible");
        }
      }, 3000);
    } catch (error) {
      toast.error("An error occurred!");
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="grid lg:grid-cols-2 m-3 gap-4">
        <div className="border-2 p-6 mx-2 rounded-2xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-lg"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-lg"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-lg"
                name="address"
                placeholder="Address"
                required
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Age <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-lg"
                name="age"
                placeholder="Age"
                required
                value={formData.age}
                onChange={handleChange}
              />
              {!checkAge && (
                <span className="text-red-500 text-sm">
                  Age must be between 18 and 55.
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Gender <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                className="mt-1 p-2 w-full border rounded-lg"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Option
                </option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Education <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                className="mt-1 p-2 w-full border rounded-lg"
                name="education"
                required
                value={formData.education}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Option
                </option>
                <option value="1">Completed</option>
                <option value="0">Not Completed</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Employed <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                className="mt-1 p-2 w-full border rounded-lg"
                name="employeeStatus"
                required
                value={formData.employeeStatus}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Option
                </option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Marital Status <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                className="mt-1 p-2 w-full border rounded-lg"
                name="maritalStatus"
                required
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Option
                </option>
                <option value="1">Married</option>
                <option value="0">Unmarried</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Dependents <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-lg"
                name="dependents"
                placeholder="Ex: (1 to 4)"
                required
                value={formData.dependents}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Income per month{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-lg"
                name="monthlyIncome"
                placeholder="Income"
                required
                value={formData.monthlyIncome}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Monthly Expenses{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-lg"
                name="monthlyExpenses"
                placeholder="Expenses"
                required
                value={formData.monthlyExpenses}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4 mb-2 text-xl font-bold">Loan Description</div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Required Loan Amount{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-lg"
                name="reqLoanAmt"
                placeholder="Your Loan Amount"
                required
                value={formData.reqLoanAmt}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Credit History <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                className="mt-1 p-2 w-full border rounded-lg"
                name="creditHist"
                required
                value={formData.creditHist}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Option
                </option>
                <option value="1">All Debts Paid</option>
                <option value="0">Not Paid</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Loan Repayment <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-lg"
                name="loanRepayment"
                placeholder="In years"
                required
                value={formData.loanRepayment}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="fbtn">
                Evaluate
              </button>
            </div>
          </form>
        </div>
        <div className="m-auto hidden lg:block">
          <img src="/i.svg" alt="Illustration" className="w-full" />
        </div>
      </div>
    </>
  );
}
