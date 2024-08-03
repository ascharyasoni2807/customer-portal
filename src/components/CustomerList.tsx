import React from "react";
import { Customer } from "../type";
import SpinnerLoader from "./SpinnerLoader";
import "./Css/CustomerList.css";

interface CustomerListProps {
  customers: Customer[];
  selectedCustomerEmail: string | null;
  onSelectCustomer: (email: string) => void;
  observerRef: React.RefObject<HTMLDivElement>;
  loading: boolean;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  selectedCustomerEmail,
  onSelectCustomer,
  observerRef,
  loading,
}) => {
  return (
    <div className="customer-list-wrapper">
      {customers.map((customer) => (
        <div
          key={customer.email}
          className={`card ${
            customer.email === selectedCustomerEmail ? "selected" : ""
          }`}
          onClick={() => onSelectCustomer(customer.email)}
        >
          <h3>
            {customer.firstName} {customer.lastName}
          </h3>
          <p>{customer.email}</p>
        </div>
      ))}
      <div ref={observerRef} /> {/* Observer div */}
      {loading && <SpinnerLoader />} {/* Use SpinnerLoader component */}
    </div>
  );
};

export default CustomerList;
