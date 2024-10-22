/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { FaTrash } from 'react-icons/fa'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCartItems,
  removeCartItem,
  setTotalAmount
} from '../../store/cartSlice'

function PurchaseCart({ user }) {
  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.items)

  // Calculate total price safely
  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.beats.price, 0)
    : 0

  useEffect(() => {
    dispatch(setTotalAmount(totalPrice))
  }, [dispatch, totalPrice])

  useEffect(() => {
    if (user && user.userId) {
      dispatch(fetchCartItems(user.userId))
    }
  }, [user, dispatch])

  const handleRemoveFromCart = (cartId) => {
    if (user && user.userId) {
      dispatch(removeCartItem(cartId))
    }
  }

  // Unified check for cartItems
  const cartIsEmpty = !Array.isArray(cartItems) || cartItems.length === 0

  return (
    <div className="mt-4 w-full rounded-lg border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white shadow-lg">
      <h2 className="mb-6 border-b border-gray-700 pb-3 text-3xl font-bold">
        Your Cart
      </h2>

      {cartIsEmpty ? (
        <p className="text-lg text-gray-300">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="mb-5 flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-md transition-shadow hover:shadow-lg"
            >
              <img
                // eslint-disable-next-line no-undef
                src={`${process.env.REACT_APP_API_URL}/${item.beats.image}`}
                alt={item.beats.title}
                className="size-20 rounded-md border border-gray-600 object-cover"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-md font-bold">{item.beats.title}</h3>
                <p className="text-md text-cyan-400">${item.beats.price}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="flex items-center justify-center rounded-full bg-red-600 p-2 
                text-white transition-all duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <FaTrash className="text-sm" />
              </button>
            </div>
          ))}

          <div className="mt-8">
            <p className="my-4 border-t border-gray-700 pt-4 text-2xl font-bold text-green-400">
              Total:{' '}
              <span className="text-white">${totalPrice.toFixed(2)}</span>
            </p>
            <Link
              to={{
                pathname: '/checkout'
              }}
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
