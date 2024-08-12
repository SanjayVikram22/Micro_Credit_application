from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

scaler = pickle.load(open('./project/scaler-2.pkl', 'rb'))
model = pickle.load(open('./project/loan_rf_model-2.pkl', 'rb'))


app = Flask(__name__)
CORS(app)


@app.route('/api/sendMessage', methods=['POST'])
def send_message():
    data = request.get_json()
    gender = data.get('gender')
    education = data.get('education')
    employee_status = data.get('employeeStatus')
    marital_status = data.get('maritalStatus')
    dependents = data.get('dependents')
    income = data.get('monthlyIncome')
    req_loan_amt = float(data.get('reqLoanAmt', 0))
    credit_hist = float(data.get('creditHist', 0))
    loan_repayment = float(data.get('loanRepayment', 0))
    monthlyexpenses = float(data.get('monthlyExpenses', 0))
    remaining = int(income)-int(monthlyexpenses)
    emi = (int(req_loan_amt)*int(loan_repayment))/1200

    features = np.array([[income, req_loan_amt, loan_repayment, monthlyexpenses, remaining, emi]])
    print(features)
    features_scaled = scaler.transform(features)
    print(emi)
    test_case = np.array([[gender, marital_status, dependents, education, employee_status, features_scaled[0][0], features_scaled[0][1], features_scaled[0][2], credit_hist, features_scaled[0][3], features_scaled[0][4], features_scaled[0][5]]])
    print(test_case)
    prediction = model.predict(test_case)
    print(prediction)
    if prediction[0] == 0:
        b = 0
    else:
        b = 1
    a = str(prediction[0])

    return jsonify({"status": "success", "message": "Form received", "pred": a, "approval": b})


if __name__ == '__main__':
    app.run(debug=True)
