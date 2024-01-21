//here we work with the old redux

// import { applyMiddleware, combineReducers, createStore } from "redux";
// import { thunk } from "redux-thunk";
// import accountReducer from "./features/accounts/accountSlice";
// import customerReducer from "./features/customers/customerSlice";
// // import { composeWithDevTools } from "redux-devtools-extension";

// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// //after doing this , you ten head to the acttion creatore(accountSlice.js) file

// export default store;

// //npm install redux-devtools-extension --force























//HERE WE WORK WE DEDUX TOOLKIT

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;

//What we did here was just to install redux toolkit and it took care of the rest