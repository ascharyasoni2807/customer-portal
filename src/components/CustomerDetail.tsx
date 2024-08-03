import React from "react";

import "./Css/CustomerDetail.css";
import { Customer } from "../type";
import PhotoGrid from "./PhotoGrid";

interface CustomerDetailProps {
  customer: Customer | null;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer }) => {
  if (!customer)
    return (
      <div className="detail-container">Select a customer to view details</div>
    );

  return (
    <div className="detail-container">
      <h2>
        <strong> {customer.firstName}</strong>
      </h2>
      <p>
        <strong>Address:</strong> {customer.email}
      </p>
      <PhotoGrid />
    </div>
  );
};

export default CustomerDetail;
