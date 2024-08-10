import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DetailsTable1() {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  //fetchData function use get method to obtain the entire details from the db and store it in response
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8001/form/all");
      setData(response.data.studentlists);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const genderFormatter = (params) => {
    return params.value === 1 ? "Male" : "Female";
  };

  const educationFormatter = (params) =>
    params.value === 1 ? "Graduate" : "Not Graduate";

  const employeeStatusFormatter = (params) =>
    params.value === 1 ? "Employed" : "Not Employed";

  const maritalStatusFormatter = (params) =>
    params.value === 1 ? "Married" : "Unmarried";

  const creditHistFormatter = (params) =>
    params.value === 1 ? "All Debts Paid" : "Unpaid";

  const approvalFormatter = (params) =>
    params.value === 1 ? "Approved" : "Rejected";

  const columnDefs = [
    {
      headerName: "Name",
      field: "name",
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { headerName: "Email", field: "email" },
    { headerName: "Address", field: "address" },
    { headerName: "Gender", field: "gender", valueFormatter: genderFormatter },
    { headerName: "Age", field: "age" },
    {
      headerName: "Education",
      field: "education",
      valueFormatter: educationFormatter,
    },
    {
      headerName: "Employee Status",
      field: "employeeStatus",
      valueFormatter: employeeStatusFormatter,
    },
    {
      headerName: "Marital Status",
      field: "maritalStatus",
      valueFormatter: maritalStatusFormatter,
    },
    { headerName: "Dependents", field: "dependents" },
    { headerName: "Income Monthly", field: "monthlyIncome" },
    { headerName: "Monthly Expenses", field: "monthlyExpenses" },
    { headerName: "Requested Loan Amount", field: "reqLoanAmt" },
    {
      headerName: "Credit History",
      field: "creditHist",
      valueFormatter: creditHistFormatter,
    },
    { headerName: "Loan Repayment", field: "loanRepayment" },
    { headerName: "Model Prediction", field: "prediction" },
    {
      headerName: "Approval Status",
      field: "Approval",
      valueFormatter: approvalFormatter,
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    const selectedRows = gridApi.getSelectedRows();
    setSelectedRows(selectedRows);
  };

  const onBtnExport = useCallback(() => {
    gridApi.exportDataAsCsv({
      onlySelected: true,
    });
    toast.success("Exported Successfully");
  }, [gridApi]);

  const gridOptions = {
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 50, 100],
    onSelectionChanged: onSelectionChanged,
    suppressRowClickSelection: true,
    enableRangeSelection: true,
  };

  return (
    <div>
      <ToastContainer />
      <div
        className="ag-theme-quartz m-4"
        style={{ height: 500, width: "98%" }}
      >
        <AgGridReact
          onGridReady={onGridReady}
          gridOptions={gridOptions}
          rowData={data}
          columnDefs={columnDefs}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
          pagination={gridOptions.pagination}
          paginationPageSize={gridOptions.paginationPageSize}
          paginationPageSizeSelector={gridOptions.paginationPageSizeSelector}
          defaultColDef={{
            sortable: true,
            filter: true,
          }}
        />
      </div>
      <div className="flex justify-end gap-3">
        <button
          disabled={selectedRows.length === 0}
          color="secondary"
          size="sm"
          onClick={onBtnExport}
          variant={selectedRows.length === 0 ? "faded" : "flat"}
          className="bg-green-400 py-2 px-3 rounded-md m-3"
        >
          Export
        </button>
      </div>
    </div>
  );
}
