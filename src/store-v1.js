import { combineReducers, createStore } from "redux";

const initilalStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initilalStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initilalStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/reauestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

//customer Reducer
function customerReducer(state = initilalStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({
//   type: "account/deposit",
//   payload: 500,
// });
// store.dispatch({
//   type: "account/withdraw",
//   payload: 200,
// });
// console.log("withdraw", store.getState());

// store.dispatch({
//   type: "account/reauestLoan",
//   payload: { amount: 1000, purpose: "Buy a car" },
// });
// console.log("requestLoan", store.getState());

// store.dispatch({
//   type: "account/payLoan",
// });

// console.log("payLoan", store.getState());

///action creator which is not really necessary, what this function only do is to return action

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function reaqeustLoan(amount, purpose) {
  return {
    type: "account/reauestLoan",
    payload: { amount, purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(300));
store.dispatch(reaqeustLoan(1000, "Buy a cheap car"));
store.dispatch(payLoan());

console.log("dispatch", store.getState());

//action creators for customers
function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return {
    type: "account/updateName",
    payload: fullName,
  };
}

store.dispatch(createCustomer("Gabriel", "12dukj34"));
console.log("createCustomer", store.getState());
