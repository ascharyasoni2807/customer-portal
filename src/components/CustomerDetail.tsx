import React from "react";

import "./Css/CustomerDetail.css";
import { Customer } from "../type";
import PhotoGrid from "./PhotoGrid";

interface CustomerDetailProps {
  customer: Customer | null;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer }) => {
  if (!customer) return <div>Select a customer to view details</div>;

  return (
    <div>
      <h2>
        <strong> {customer.firstName}</strong>
      </h2>
      <p>
        <strong>Address:</strong> {customer.email}
      </p>
      <PhotoGrid customer={customer} />
    </div>
  );
};

export default CustomerDetail;
