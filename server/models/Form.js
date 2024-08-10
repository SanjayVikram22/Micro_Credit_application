const mongoose = require("mongoose");
const schema = mongoose.Schema;

const formSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: Number,
      required: true,
    },
    age:{
      type:Number,
      required:true,
    },
    education: {
      type: Number,
      required: true,
    },
    employeeStatus: {
      type: Number,
      required: true,
    },
    maritalStatus: {
      type: Number,
      required: true,
    },
    dependents: {
      type: Number,
      required: true,
    },
    monthlyIncome: {
      type: Number,
      required: true,
    },
    monthlyExpenses: {
      type: Number,
      required: true,
    },
    reqLoanAmt: {
      type: Number,
      required: true,
    },
    creditHist: {
      type: Number,
      required: true,
    },
    loanRepayment: {
      type: Number,
      required: true,
    },
    prediction: {
      type: Number,
      required: true,
    },
    Approval: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("FormData", formSchema);

module.exports = Form;
