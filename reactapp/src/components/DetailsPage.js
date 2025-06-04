import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DetailsPage = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchOrders();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/customers');
      setCustomers(res.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8080/orders');
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
      <ul className="mb-8">
        {customers.map((customer) => (
          <li key={customer.id} className="mb-2">
            <strong>{customer.name}</strong> - {customer.email} - {customer.phone}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="mb-2">
            Order ID: {order.id} - Customer ID: {order.customerId} - Product ID: {order.productId} - Qty: {order.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailsPage;
