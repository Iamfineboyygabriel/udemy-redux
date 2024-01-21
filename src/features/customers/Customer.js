import { useSelector } from "react-redux";

function Customer() {
  //here we want to get data from a redux store we use "useSelector"
  const customer = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
