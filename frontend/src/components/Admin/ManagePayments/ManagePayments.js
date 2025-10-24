import React, { useEffect, useState } from 'react'
import { getOrders, deleteOrders } from '../../../services/api/orders'
import { handleRefund } from '../../../services/api/payment'
import Loading from '../../Loading/Loading'
import ConfirmMessage from '../../Messages/ConfirmMessage/ConfirmMessage'
import DeleteAllConfirmMessage from '../../Messages/DeleteAllConfirmMessage/DeleteAllConfirmMessage'
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
  const [orderToDelete, setOrderToDelete] = useState(null)
  const [error, setError] = useState(null)
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false)
  const [deletingAll, setDeletingAll] = useState(false)

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
      setError(null)
    } catch (error) {
      console.error('Error fetching orders:', error)
      setError('Failed to fetch orders')
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

  const handleDeleteAllOrders = async () => {
    setDeletingAll(true)
    try {
      // Delete all orders one by one
      const deletePromises = orders.map(order => deleteOrders(order.id))
      await Promise.all(deletePromises)
      
      // Refresh the orders list
      await fetchOrders()
      setShowDeleteAllConfirm(false)
      alert(`Successfully deleted all ${orders.length} orders!`)
    } catch (error) {
      console.error('Error deleting all orders:', error)
      alert('Failed to delete all orders. Some orders may have been deleted.')
      // Refresh to show current state
      await fetchOrders()
    } finally {
      setDeletingAll(false)
    }
  }

  const confirmDeleteAll = () => {
    setShowDeleteAllConfirm(true)
  }

  const cancelDeleteAll = () => {
    setShowDeleteAllConfirm(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>
  }

  return (
    <div className="m-4 md:m-10 rounded-xl bg-white shadow-xl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-t-xl p-8">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">Manage Payments</h1>
            <p className="text-brand-gray-light opacity-90">Monitor and manage payment transactions ({orders.length} orders)</p>
          </div>
          {orders.length > 0 && (
            <button
              onClick={confirmDeleteAll}
              disabled={deletingAll}
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-red-600 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <FaTrash className="w-4 h-4" />
              <span>{deletingAll ? 'Deleting...' : 'Delete All Orders'}</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="p-8">
      {orderToDelete && (
        <ConfirmMessage
          message={`Are you sure that you want to delete order "${orderToDelete.id}"? All the information related will also be deleted`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      {showDeleteAllConfirm && (
        <DeleteAllConfirmMessage
          itemType="orders"
          itemCount={orders.length}
          onConfirm={handleDeleteAllOrders}
          onCancel={cancelDeleteAll}
          isDeleting={deletingAll}
        />
      )}

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 text-brand-gray">💳</div>
            <h3 className="text-xl font-semibold text-brand-blue mb-2">No orders yet</h3>
            <p className="text-brand-gray">Orders will appear here when customers make purchases</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-brand-gray-light rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-brand-gray-light p-4 border-b border-brand-gray-light">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-brand-blue">
                      Order #{order.id}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.paymentStatus === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : order.paymentStatus === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.paymentStatus === 'Failed'
                        ? 'bg-red-100 text-red-800'
                        : order.paymentStatus === 'Refunded'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.paymentStatus || 'Unknown'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Column 1: Order Information */}
                    <div className="space-y-4">
                      {/* Order Info Section */}
                      <div className="bg-brand-gray-light rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-brand-blue-dark mb-3">Order Details</h3>
                        <div className="space-y-2">
                          <p className="text-brand-blue-dark">
                            <span className="font-medium text-brand-blue">User:</span>{' '}
                            {order.user?.username || 'N/A'}
                          </p>
                          <p className="text-brand-blue-dark">
                            <span className="font-medium text-brand-blue">Email:</span>{' '}
                            {order.user?.email || 'N/A'}
                          </p>
                          <p className="text-brand-blue-dark">
                            <span className="font-medium text-brand-blue">Created:</span>{' '}
                            {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                          </p>
                        </div>
                      </div>

                      {/* Billing Information Section */}
                      <div className="bg-brand-gray-light rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-brand-blue-dark mb-3">
                          Billing Information
                        </h3>
                        <div className="space-y-2">
                          <p className="text-brand-blue-dark">
                            <span className="font-medium text-brand-blue">Name:</span>{' '}
                            {order.billingInfo?.name || 'N/A'}
                          </p>
                          <p className="text-brand-blue-dark">
                            <span className="font-medium text-brand-blue">Address:</span>{' '}
                            {order.billingInfo?.address || 'N/A'}
                          </p>
                          <p className="text-brand-blue-dark">
                            <span className="font-medium text-brand-blue">City:</span>{' '}
                            {order.billingInfo?.city || 'N/A'}
                          </p>
                          <p className="text-brand-blue-dark">
                            <span className="font-medium text-brand-blue">Postal Code:</span>{' '}
                            {order.billingInfo?.postalCode || 'N/A'}
                          </p>
                          <p className="text-brand-blue-dark">
                            <span className="font-medium text-brand-blue">Country:</span>{' '}
                            {order.billingInfo?.country || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Beat Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-brand-blue-dark mb-4">Purchased Beats</h3>
                      <div className="space-y-4">
                        {order.beats?.map((beat) => (
                          <div
                            key={beat._id}
                            className="bg-brand-gray-light rounded-lg p-4 border border-brand-gray-light"
                          >
                            <div className="flex items-center space-x-4">
                              <img
                                src={`${process.env.REACT_APP_BACKEND_URL}/${beat.image}`}
                                alt={beat.title}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-brand-blue-dark mb-1">
                                  {beat.title}
                                </h4>
                                <p className="text-sm text-brand-gray mb-2">
                                  {beat.description}
                                </p>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-brand-blue font-semibold">
                                    ${beat.price}
                                  </span>
                                  <span className="text-brand-gray">
                                    by {beat.owner?.username || 'N/A'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Payment Actions */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-brand-blue-dark mb-4">Payment Actions</h3>

                      {/* Payment History */}
                      <div className="bg-brand-gray-light rounded-lg p-4">
                        <h4 className="font-semibold text-brand-blue-dark mb-3">Payment History</h4>
                        <div className="space-y-2">
                          {order.paymentHistory?.map((entry, index) => (
                            <div
                              key={index}
                              className={`text-sm p-2 rounded ${
                                entry.status === 'Completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              <div className="font-medium">{entry.status}</div>
                              <div className="text-xs opacity-75">
                                {new Date(entry.date).toLocaleString()}
                              </div>
                              <div>{entry.message}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleRefundClick(order.id)}
                        className={`w-full bg-brand-blue text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-brand-blue-dark hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-blue/30 ${
                          loading ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                        disabled={loading}
                      >
                        {loading ? <Loading /> : 'Process Refund'}
                      </button>

                      {/* Price and Delete */}
                      <div className="bg-brand-gray-light rounded-lg p-4">
                        <div className="text-center mb-4">
                          <div className="text-3xl font-bold text-brand-blue">
                            ${order.price || '0.00'}
                          </div>
                          <div className="text-sm text-brand-gray">Total Amount</div>
                        </div>
                        
                        <button
                          onClick={() => confirmDeleteOrder(order)}
                          className="w-full bg-red-500 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-red-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/30 flex items-center justify-center space-x-2"
                        >
                          <FaTrash className="w-4 h-4" />
                          <span>Delete Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ManagePayments