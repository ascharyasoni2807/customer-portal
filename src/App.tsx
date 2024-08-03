import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CustomerList from "./components/CustomerList";
import CustomerDetail from "./components/CustomerDetail";
import "./App.css";
import { Customer } from "./type";

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const page = useRef<number>(1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchCustomers = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://hub.dummyapis.com/employee?pageNumber=${pageNumber}&noofRecords=10`
      );

      const newCustomers = response.data.map((employee: any) => ({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
      }));
      setCustomers((prev) => [...prev, ...newCustomers]);
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(page.current);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          page.current += 1;
          fetchCustomers(page.current);
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    let observeCurrent = observerRef?.current;
    return () => {
      if (observeCurrent) {
        observer.unobserve(observeCurrent);
      }
    };
  }, [loading, hasMore]);

  const handleSelectCustomer = (email: string) => {
    setSelectedCustomerEmail(email);
  };

  const selectedCustomer =
    customers.find((customer) => customer.email === selectedCustomerEmail) ||
    null;

  return (
    <>
      <h2 className="app-title">The Cube Assignment</h2>
      {
        <div className="app-container">
          <CustomerList
            customers={customers}
            selectedCustomerEmail={selectedCustomerEmail}
            onSelectCustomer={handleSelectCustomer}
            observerRef={observerRef}
            loading={loading}
          />

          <div className="detail-container">
            <CustomerDetail customer={selectedCustomer} />
          </div>
        </div>
      }
    </>
  );
};

export default App;
