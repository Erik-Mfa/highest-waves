import React, { useEffect, useState } from 'react'
import BillingForm from '../../components/Payment/BillingForm/BillingForm'
import PaymentForm from '../../components/Payment/PaymentForm/PaymentForm'
import Loading from '../../components/Loading/Loading'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../../services/stripe'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItems, setTotalAmount } from '../../store/cartSlice'
import { isAuthenticated } from '../../services/api/auth'

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const loading = useSelector((state) => state.cart.loading)
  const [user, setUser] = useState(null)
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  })

  const [showPaymentForm, setShowPaymentForm] = useState(false) // State to toggle payment form visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authenticatedUser = await isAuthenticated()
        setUser(authenticatedUser)
      } catch (error) {
        console.error('Error fetching data:', error)
        setUser(null)
      }
    }

    fetchData()
  }, [])

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

  if (loading) return <Loading />
  const cartIsEmpty = !Array.isArray(cartItems) || cartItems.length === 0

  const handleBillingInfoChange = (updatedInfo) => {
    setBillingInfo(updatedInfo) // Update billingInfo state when changed in BillingForm
  }

  // Function to handle showing the payment form
  const handleProceedToPayment = () => {
    setShowPaymentForm(true)
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto p-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Checkout</h1>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Billing Form */}
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg">
            <BillingForm onBillingInfoChange={handleBillingInfoChange} />
            <button
              onClick={handleProceedToPayment}
              className="mt-4 w-full rounded-md bg-cyan-600 px-4 py-2 text-white transition duration-300 hover:bg-cyan-700"
            >
              Proceed to Payment
            </button>
          </div>

          {/* Order Summary */}
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-6 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-white">Your Order</h2>
            {cartIsEmpty ? (
              <p className="text-lg text-gray-400">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-gray-600 bg-gray-800 p-4 shadow-md transition-shadow hover:shadow-lg"
                  >
                    <img
                      // eslint-disable-next-line no-undef
                      src={`${process.env.REACT_APP_BACKEND_URL}/${item.beats.image}`}
                      alt={item.beats.title}
                      className="size-20 rounded-md border border-gray-500 object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-bold text-white">
                        {item.beats.title}
                      </h3>
                      <p className="text-md text-cyan-400">
                        ${item.beats.price}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="mt-8 text-white">
                  <p className="mb-4 text-xl font-bold">
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {showPaymentForm && (
          <div className="mt-8 rounded-lg border border-gray-700 bg-gray-800 p-6 opacity-100 shadow-lg transition-opacity duration-700">
            <PaymentForm billingInfo={billingInfo} user={user} />
          </div>
        )}
      </div>
    </Elements>
  )
}

export default CheckoutPage
