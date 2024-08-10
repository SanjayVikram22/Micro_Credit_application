import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [data, setData] = useState([]);
  const emailId = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleNewForm = () => {
    navigate("/home/loanform");
  };

  useEffect(() => {
    if (emailId) {
      fetch("http://localhost:8001/get-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data received from server:", data);
          setData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [emailId]);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-7">Welcome, {emailId}!</h2>
      {data.length > 0 ? (
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-lg font-medium mb-2">{item.name}</h3>
              <p className="text-sm text-gray-700 flex gap-2">
                <strong>Email: </strong> {item.email}
              </p>
              <p className="text-sm text-gray-700 flex gap-2">
                <strong>Address: </strong> {item.address}
              </p>
              <p className="text-sm text-gray-700 flex gap-2">
                <strong>Monthly Income: </strong>₹
                {item.monthlyIncome.toLocaleString()}
              </p>
              <p className="text-sm text-gray-700 flex gap-2">
                <strong>Requested Loan Amount: </strong>₹
                {item.reqLoanAmt.toLocaleString()}
              </p>
              <p className="text-sm text-gray-700 flex gap-2">
                <strong>Approval Status: </strong>
                {item.Approval ? (
                  <span className="text-green-500">Approved</span>
                ) : (
                  <span className="text-red-600">Not Approved</span>
                )}
              </p>
            </div>
          ))}
          <div
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex items-center justify-center cursor-pointer"
            onClick={handleNewForm}
          >
            <button className="w-full h-full focus:outline-none">
              New Application
            </button>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 lg:grid-cols-3">
          <div
            className="bg-white shadow-md rounded-lg p-20 border border-gray-200 flex items-center justify-center cursor-pointer"
            onClick={handleNewForm}
          >
            <button className="w-full h-full focus:outline-none">
              New Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
