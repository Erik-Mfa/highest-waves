import React, { useEffect, useState } from 'react';
import { getOrders } from '../../../services/api/orders';
import { handleRefund } from '../../../services/api/payment'; 
import Loading from '../../Loading/Loading';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaUndoAlt  } from 'react-icons/fa'; 

const ManagePayments = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); 

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
    setLoading(true);
    try {
      const message = await handleRefund(orderId);
      alert(message); 

      const updatedOrders = await getOrders();
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error processing refund:', error);
      alert('Failed to process refund.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto m-10 text-gray-200 rounded-lg shadow-lg">
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order._id} className="p-4 border border-gray-700 rounded-lg bg-gray-800 shadow-md">
            <h2 className="text-2xl flex items-center justify-center font-bold mb-4">
              <span className="text-gray-300">{order.id}</span>
            </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {/* Column 1: Order Information */}
                  <div className="space-y-6 p-4 rounded-lg bg-gray-600 shadow-lg">
                    {/* Order Info Section */}
                    <div className="bg-gray-800 p-4 rounded-md shadow-md">
                      <div className="text-md space-y-2">
                        <p className="text-white"><strong className="text-teal-500">User:</strong> {order.user.username}</p>
                        <p className="text-white"><strong className="text-teal-500">Email:</strong> {order.user.email}</p>
                        <p className="text-white"><strong className="text-teal-500">Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Billing Information Section */}
                    <div className="bg-gray-800 p-4 rounded-md shadow-md">
                      <h3 className="text-xl font-semibold mb-3">
                        Billing Information
                      </h3>
                      <div className="text-md space-y-2">
                        <p className="text-white"><strong className="text-teal-500">Name:</strong> {order.billingInfo.name}</p>
                        <p className="text-white"><strong className="text-teal-500">Address:</strong> {order.billingInfo.address}</p>
                        <p className="text-white"><strong className="text-teal-500">City:</strong> {order.billingInfo.city}</p>
                        <p className="text-white"><strong className="text-teal-500">Postal Code:</strong> {order.billingInfo.postalCode}</p>
                        <p className="text-white"><strong className="text-teal-500">Country:</strong> {order.billingInfo.country}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Column 2: Beat Information */}
                  <div>
                    <div className="md:col-span-2 md:ml-auto">
                        <ul className="space-y-6">
                          {order.beats.map((beat) => (
                            <li key={beat._id} className="relative p-4 border border-gray-600 rounded-lg bg-gray-700 shadow-lg">
                              {/* Beat Image on Top */}
                              <div className="flex justify-center mb-2">
                                <img
                                  src={`http://localhost:3001/${beat.image}`}
                                  alt={beat.title}
                                  className="w-16 h-16 object-cover rounded-lg shadow-md"
                                />
                              </div>
                              {/* Beat Title and Details */}
                              <div className="text-center space-y-2">
                                <h4 className="text-md font-semibold text-teal-300">{beat.title}</h4>
                                <div className="text-sm space-y-1">
                                  <p><strong className="text-gray-400">Price:</strong> ${beat.price}</p>
                                  <p><strong className="text-gray-400">Tone:</strong> {beat.description}</p>
                                  <p><strong className="text-gray-400">Owner:</strong> {beat.owner.username}</p>
                                </div>
                              </div>

                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  {/* Column 3: Payment Information */}
                  <div className="space-y-6 flex flex-col h-full">
                    {/* Payment Status with Icons */}
                    <p className=" items-center justify-items-stretch">
                      <span
                        className={`text-sm font-bold px-3 py-1 ml-2 rounded-full flex items-center 
                        ${order.paymentStatus === 'Completed' ? 'bg-teal-800 text-green-100' 
                          : order.paymentStatus === 'Pending' ? 'bg-yellow-600 text-yellow-900' 
                          : order.paymentStatus === 'Failed' ? 'bg-red-800 text-red-100' 
                          : order.paymentStatus === 'Refunded' ? 'bg-teal-700 text-teal-100'
                          : 'bg-sky-800'}`}
                      >
                        {order.paymentStatus === 'Completed' && <FaCheckCircle className="mr-1" />}
                        {order.paymentStatus === 'Pending' && <FaExclamationTriangle className="mr-1" />}
                        {order.paymentStatus === 'Failed' && <FaTimesCircle className="mr-1" />}
                        {order.paymentStatus === 'Refunded' && <FaUndoAlt className="mr-1" />}
                        <span>{order.paymentStatus}</span>
                      </span>
                    </p>

                    {/* Payment History */}
                    <ul className="space-y-2">
                      {order.paymentHistory.map((entry, index) => (
                        <li key={index} className={`text-sm ${entry.status === 'Completed' ? 'text-green-300' : 'text-red-300'}`}>
                          {new Date(entry.date).toLocaleString()}: <strong>{entry.status}</strong> - {entry.message}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => handleRefundClick(order.id)} 
                      className={`bg-teal-700 text-white text-lg px-4 py-2 rounded-lg 
                        hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50 transition-all 
                        duration-300 transform hover:scale-110 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={loading}
                    > 
                      {loading ? (
                        <Loading />
                      ) : 'Refund'}
                    </button>

                    <div className="flex items-center">
                      {/* Price Display */}
                      <p className="font-extrabold text-3xl md:text-4xl text-teal-400 mt-2 mb-2 mr-auto">
                        ${order.price}
                      </p>
                    </div>

                  </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePayments;
