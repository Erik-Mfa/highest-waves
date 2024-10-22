import React, { useEffect, useState } from 'react'
import { getOrders, deleteOrders } from '../../../services/api/orders'
import { handleRefund } from '../../../services/api/payment'
import Loading from '../../Loading/Loading'
import ConfirmMessage from '../../Messages/ConfirmMessage/ConfirmMessage'
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaUndoAlt,
  FaTrash
} from 'react-icons/fa'

const ManagePayments = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState(null) // State for selected order to delete

  const handleRefundClick = async (orderId) => {
    setLoading(true)
    try {
      const message = await handleRefund(orderId)
      alert(message)

      const updatedOrders = await getOrders()
      setOrders(updatedOrders)
    } catch (error) {
      console.error('Error processing refund:', error)
      alert('Failed to process refund.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await deleteOrders(orderId)
      if (response) {
        setOrders(orders.filter((order) => order.id !== orderId))
        fetchOrders()
      } else {
        console.error('Failed to delete order')
      }
    } catch (error) {
      console.error('Error deleting order:', error)
    }
  }

  const fetchOrders = async () => {
    try {
      const data = await getOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const confirmDeleteOrder = (orderId) => {
    setOrderToDelete(orderId)
  }

  const cancelDelete = () => {
    setOrderToDelete(null)
  }

  const confirmDelete = async () => {
    if (orderToDelete) {
      await handleDeleteOrder(orderToDelete.id)
      setOrderToDelete(null)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="m-10 mx-auto max-w-6xl rounded-lg text-gray-200 shadow-lg">
      {orderToDelete && (
        <ConfirmMessage
          message={`Are you sure that you want to delete order "${orderToDelete.id}"? All the information related will also be deleted`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order._id}
            className="shadow-header-shadow rounded-lg border border-gray-700 bg-gray-800 p-4"
          >
            <h2 className="mb-4 flex items-center justify-center text-2xl font-bold">
              <span className="text-gray-300">{order.id}</span>
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Column 1: Order Information */}
              <div className="space-y-6 rounded-lg bg-gray-600 p-4 shadow-lg">
                {/* Order Info Section */}
                <div className="rounded-md bg-gray-800 p-4 shadow-md">
                  <div className="text-md space-y-2">
                    <p className="text-white">
                      <strong className="text-teal-500">User:</strong>{' '}
                      {order.user.username}
                    </p>
                    <p className="text-white">
                      <strong className="text-teal-500">Email:</strong>{' '}
                      {order.user.email}
                    </p>
                    <p className="text-white">
                      <strong className="text-teal-500">Created At:</strong>{' '}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Billing Information Section */}
                <div className="rounded-md bg-gray-800 p-4 shadow-md">
                  <h3 className="mb-3 text-xl font-semibold">
                    Billing Information
                  </h3>
                  <div className="text-md space-y-2">
                    <p className="text-white">
                      <strong className="text-teal-500">Name:</strong>{' '}
                      {order.billingInfo.name}
                    </p>
                    <p className="text-white">
                      <strong className="text-teal-500">Address:</strong>{' '}
                      {order.billingInfo.address}
                    </p>
                    <p className="text-white">
                      <strong className="text-teal-500">City:</strong>{' '}
                      {order.billingInfo.city}
                    </p>
                    <p className="text-white">
                      <strong className="text-teal-500">Postal Code:</strong>{' '}
                      {order.billingInfo.postalCode}
                    </p>
                    <p className="text-white">
                      <strong className="text-teal-500">Country:</strong>{' '}
                      {order.billingInfo.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 2: Beat Information */}
              <div>
                <div className="md:col-span-2 md:ml-auto">
                  <ul className="space-y-6">
                    {order.beats.map((beat) => (
                      <li
                        key={beat._id}
                        className="relative rounded-lg border border-gray-600 bg-gray-700 p-4 shadow-lg"
                      >
                        {/* Beat Image on Top */}
                        <div className="mb-2 flex justify-center">
                          <img
                            // eslint-disable-next-line no-undef
                            src={`${process.env.REACT_APP_API_URL}/${beat.image}`}
                            alt={beat.title}
                            className="size-16 rounded-lg object-cover shadow-md"
                          />
                        </div>
                        {/* Beat Title and Details */}
                        <div className="space-y-2 text-center">
                          <h4 className="text-md font-semibold text-teal-300">
                            {beat.title}
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p>
                              <strong className="text-gray-400">Price:</strong>{' '}
                              ${beat.price}
                            </p>
                            <p>
                              <strong className="text-gray-400">
                                Description:
                              </strong>{' '}
                              {beat.description}
                            </p>
                            <p>
                              <strong className="text-gray-400">Owner:</strong>{' '}
                              {beat.owner.username}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 3: Payment Information */}
              <div className="flex h-full flex-col space-y-6">
                {/* Payment Status with Icons */}
                <p className=" items-center justify-items-stretch">
                  <span
                    className={`text-sm font-bold px-3 py-1 ml-2 rounded-full flex items-center 
                        ${
                          order.paymentStatus === 'Completed'
                            ? 'bg-teal-800 text-green-100'
                            : order.paymentStatus === 'Pending'
                              ? 'bg-yellow-600 text-yellow-900'
                              : order.paymentStatus === 'Failed'
                                ? 'bg-red-800 text-red-100'
                                : order.paymentStatus === 'Refunded'
                                  ? 'bg-teal-700 text-teal-100'
                                  : 'bg-sky-800'
                        }`}
                  >
                    {order.paymentStatus === 'Completed' && (
                      <FaCheckCircle className="mr-1" />
                    )}
                    {order.paymentStatus === 'Pending' && (
                      <FaExclamationTriangle className="mr-1" />
                    )}
                    {order.paymentStatus === 'Failed' && (
                      <FaTimesCircle className="mr-1" />
                    )}
                    {order.paymentStatus === 'Refunded' && (
                      <FaUndoAlt className="mr-1" />
                    )}
                    <span>{order.paymentStatus}</span>
                  </span>
                </p>

                {/* Payment History */}
                <ul className="space-y-2">
                  {order.paymentHistory.map((entry, index) => (
                    <li
                      key={index}
                      className={`text-sm ${entry.status === 'Completed' ? 'text-green-300' : 'text-red-300'}`}
                    >
                      {new Date(entry.date).toLocaleString()}:{' '}
                      <strong>{entry.status}</strong> - {entry.message}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleRefundClick(order.id)}
                  className={`bg-teal-700 text-white text-lg px-4 py-2 rounded-lg 
                        hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50 transition-all 
                        duration-300 transform hover:scale-110 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                  disabled={loading}
                >
                  {loading ? <Loading /> : 'Refund'}
                </button>

                <div className="flex items-center">
                  {/* Price Display */}
                  <p className="my-2 mr-auto text-3xl font-extrabold text-teal-400 md:text-4xl">
                    ${order.price}
                  </p>
                </div>

                <button
                  onClick={() => confirmDeleteOrder(order)}
                  className="flex items-center justify-center rounded-full bg-red-600 p-2 text-white transition-all duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ManagePayments
