// ManagePayments.js
import React, { useEffect, useState } from 'react';
import { getOrders } from '../../../services/api/orders';

const ManagePayments = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Payments</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order._id} className="p-4 border border-gray-700 rounded-lg bg-gray-800 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Order ID: <span className="text-gray-400">{order._id}</span></h2>
            <div className="text-sm mb-2">
              <p><strong>User:</strong> {order.user.username}</p>
              <p><strong>Email:</strong> {order.user.email}</p>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <p>
                <strong>Payment Status:</strong>
                <span className={order.paymentStatus === 'paid' ? 'text-green-400' : 'text-red-400'}> {order.paymentStatus}</span>
              </p>
              <p>
                <strong>Total Price:</strong> <span className="font-bold">${order.price}</span>
              </p>
            </div>
            <p className="text-sm mb-2">
              <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
            <h3 className="mt-2 text-lg font-semibold">Beats:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {order.beats.map((beat) => (
                <li key={beat._id} className="flex flex-col p-3 border border-gray-600 rounded-md bg-gray-700 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-md font-medium">{beat.title}</h4>
                    <img
                      src={`http://localhost:3001/${beat.image}`}
                      alt={beat.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <p><strong>Price:</strong> ${beat.price}</p>
                    <p><strong>BPM:</strong> {beat.bpm}</p>
                    <p><strong>Tone:</strong> {beat.tone}</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePayments;
