/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { FaTrash } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCartItems,
  removeCartItem
} from '../../store/cartSlice'

function PurchaseCart({ user }) {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  const loading = useSelector((state) => state.cart.loading)
  const error = useSelector((state) => state.cart.error)
  const [deletingItems, setDeletingItems] = useState(new Set())

  useEffect(() => {
    if (user && user.userId) {
      dispatch(fetchCartItems(user.userId))
    }
  }, [user, dispatch])

  const handleRemoveFromCart = async (cartId) => {
    if (user && user.userId) {
      try {
        setDeletingItems(prev => new Set([...prev, cartId]))
        await dispatch(removeCartItem(cartId, user.userId))
      } catch (error) {
        console.error('Error removing item from cart:', error)
      } finally {
        setDeletingItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(cartId)
          return newSet
        })
      }
    }
  }

  if (loading) {
    return (
      <div className="mt-4 w-full rounded-lg border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white shadow-lg">
        <h2 className="mb-6 border-b border-gray-700 pb-3 text-3xl font-bold">
          Your Cart
        </h2>
        <div className="animate-pulse">
          <div className="mb-5 flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div className="size-20 rounded-md bg-gray-700"></div>
            <div className="ml-4 flex-1">
              <div className="h-4 w-3/4 rounded bg-gray-700"></div>
              <div className="mt-2 h-3 w-1/2 rounded bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-4 w-full rounded-lg border border-red-700 bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white shadow-lg">
        <h2 className="mb-6 border-b border-gray-700 pb-3 text-3xl font-bold">
          Your Cart
        </h2>
        <p className="text-red-400">Error loading cart: {error}</p>
      </div>
    )
  }

  // Filter out invalid items
  const validItems = cartItems?.filter(item => item && item.beats) || []

  return (
    <div className="mt-4 w-full rounded-lg border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white shadow-lg">
      <h2 className="mb-6 border-b border-gray-700 pb-3 text-3xl font-bold">
        Your Cart
      </h2>

      {validItems.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-300">Your cart is empty.</p>
          <Link
            to="/beats"
            className="mt-4 inline-block rounded-md border border-transparent bg-cyan-600 px-6 py-4 text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-cyan-700"
          >
            Browse Beats
          </Link>
        </div>
      ) : (
        <div>
          {validItems.map((item) => (
            <div
              key={item.id}
              className={`mb-5 flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-md transition-all duration-300 ${
                deletingItems.has(item.id) ? 'opacity-50' : ''
              }`}
            >
              {deletingItems.has(item.id) ? (
                <div className="animate-pulse flex w-full items-center">
                  <div className="size-20 rounded-md bg-gray-700"></div>
                  <div className="ml-4 flex-1">
                    <div className="h-4 w-3/4 rounded bg-gray-700"></div>
                    <div className="mt-2 h-3 w-1/2 rounded bg-gray-700"></div>
                  </div>
                </div>
              ) : (
                <>
                  {item.beats?.image && (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/${item.beats.image}`}
                      alt={item.beats?.title || 'Beat'}
                      className="size-20 rounded-md border border-gray-600 object-cover"
                    />
                  )}
                  <div className="ml-4 flex-1">
                    <h3 className="text-md font-bold">{item.beats?.title || 'Untitled Beat'}</h3>
                    <p className="text-md text-cyan-400">${item.finalPrice?.toFixed(2) || '0.00'}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    disabled={deletingItems.has(item.id)}
                    className="flex items-center justify-center rounded-full bg-red-600 p-2 
                    text-white transition-all duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </>
              )}
            </div>
          ))}

          <div className="mt-8">
            <p className="my-4 border-t border-gray-700 pt-4 text-2xl font-bold text-green-400">
              Total: <span className="text-white">${totalAmount?.toFixed(2) || '0.00'}</span>
            </p>
            <Link
              to="/checkout"
              className="block w-full rounded-md border border-transparent bg-cyan-600 px-6 py-4 text-center text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-cyan-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default PurchaseCart
