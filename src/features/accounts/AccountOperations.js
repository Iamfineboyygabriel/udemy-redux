import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  //first thing to do is to get access to our dispatch function
  const dispatch = useDispatch();

  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    balance,
    isLoading,
  } = useSelector((store) => store.account); // we need to read from the store the entrire account from the accountSlice.js

  console.log(balance);

  function handleDeposit() {
    if (!depositAmount) return;

    dispatch(deposit(depositAmount, currency)); //here we dispatch out action which is the (deposit)  coming from the account slice and dont forget to import it to out reducer
    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? "Converting..." : `Deposit $ {depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {currentLoan > 0 && (
          <div>
            <span>
              Pay back ${currentLoan}( {currentLoanPurpose})
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;

//first thing to do is to get access to our dispatch function
//seconddly we dispatch our action in the function and dont forget to import it
//third, we need to read from the store the entrire account from the accountSlice.jd

//PLEASE NOTE WHEN DEALING WITH DATA FETCHING IN REDUX , WE MAKE USE OF REDUX THUNK WHICH IS A MIDDLE WAY .
//USING THIS, DISPATCHING ACTION WILL GET  TO THE THUNK FIRST BEFORE HEADING ANYWHERE ELSE
//SO BASICALLY, THE THUNK ALLOWS REDUX TO WAIT BEFORE DISPATCHIN THE FETCH DATA INTO THE STORE

//HERE WE WOULD BE USING REDUX THUNK TO IMPLEMENT A FEATURE WHERE THE USER CAN DEPOSIT MONEY IN FOREIGN CURRENCY AND ITLL BE CONVERTED BY CALLING AN EXTERNAL API
//so when a user want to deposit money they can selet which cureency they want then it ill be converted to usd before being deposited

/**in order to use middleware in redux for data fetching , first we need to instal the middle ware package

then we apply the middle ware in our store then we apply the midle ware in our action creatore

so first we install middleware using 
"npm i redux-thunk"

after that , we import it in out "store.js" file 








...lastly we apply that to our store by passing another argument here

const store = createStore(rootReducer, applyMiddleware)*/
