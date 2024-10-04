// ManagePayments.js
import React, { useEffect, useState } from 'react';
import { getOrders } from '../../../services/api/orders';
import { handleRefund } from '../../../services/api/payment'; // Import the handleRefund function
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa'; // Import icons from react-icons

const ManagePayments = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // To track loading state

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

  const handleRefundClick = async (orderId) => {
    setLoading(true); // Start loading state
    try {
      const message = await handleRefund(orderId);
      alert(message); // Show a success message
      // Optionally refresh the orders or update the state after refund
      const updatedOrders = await getOrders(); // Re-fetch orders to get updated data
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error processing refund:', error);
      alert('Failed to process refund.');
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Payments</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order._id} className="p-6 border border-gray-700 rounded-lg bg-gray-800 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Column 1: Purchase Information */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">Order: <span className="text-gray-400">{order.id}</span></h2>
                <div className="text-sm">
                  <p><strong>User:</strong> {order.user.username}</p>
                  <p><strong>Email:</strong> {order.user.email}</p>
                </div>
                <p className="text-sm">
                  <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
                </p>
                {/* Billing Information */}
                <h3 className="text-lg font-semibold mt-4">Billing Information</h3>
                <div className="text-sm">
                  <p><strong>Name:</strong> {order.billingInfo.name}</p>
                  <p><strong>Address:</strong> {order.billingInfo.address}</p>
                  <p><strong>City:</strong> {order.billingInfo.city}</p>
                  <p><strong>Postal Code:</strong> {order.billingInfo.postalCode}</p>
                  <p><strong>Country:</strong> {order.billingInfo.country}</p>
                </div>
              </div>

              {/* Column 2: Beat Information */}
              <div>
                <h3 className="text-lg font-semibold">Beats</h3>
                <ul className="space-y-3">
                  {order.beats.map((beat) => (
                    <li key={beat._id} className="p-3 border border-gray-600 rounded-md bg-gray-700 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-md font-medium">{beat.title}</h4>
                        <img
                          src={`http://localhost:3001/${beat.image}`}
                          alt={beat.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </div>
                      <div className="text-sm">
                        <p><strong>BPM:</strong> {beat.bpm}</p>
                        <p><strong>Tone:</strong> {beat.tone}</p>
                        <p><strong>Owner:</strong> {beat.owner.username}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Payment Information */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Payment Information</h3>
                <div className="text-lg">
                  <p>
                    <strong>Total Price:</strong> <span className="font-bold">${order.price}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <strong>Payment Status:</strong>
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full 
                      ${order.paymentStatus === 'Completed' ? 'bg-teal-800 text-green-100' 
                        : order.paymentStatus === 'Pending' ? 'bg-yellow-600 text-yellow-900' 
                        : 'bg-red-800 text-red-100'}`}
                    >
                      {order.paymentStatus === 'Completed' && (
                        <FaCheckCircle className="inline-block mr-2" />
                      )}
                      {order.paymentStatus === 'Pending' && (
                        <FaExclamationTriangle className="inline-block mr-2" />
                      )}
                      {order.paymentStatus === 'Failed' && (
                        <FaTimesCircle className="inline-block mr-2" />
                      )}
                      {order.paymentStatus}
                    </span>
                  </p>
                  {order.paymentFailureReason && (
                    <p className="text-red-400"><strong>Failure Reason:</strong> {order.paymentFailureReason}</p>
                  )}
                  {/* Payment History */}
                  <h4 className="text-lg font-semibold mt-4">Payment History</h4>
                  <ul className="space-y-2">
                    {order.paymentHistory.map((entry, index) => (
                      <li key={index} className={`text-sm ${entry.status === 'Completed' ? 'text-green-300' : 'text-red-300'}`}>
                        {entry.date}: <strong>{entry.status}</strong> - {entry.message}
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => handleRefundClick(order.id)} 
                  className={`mt-4 bg-red-500 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? 'Processing...' : 'Refund Order'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePayments;
