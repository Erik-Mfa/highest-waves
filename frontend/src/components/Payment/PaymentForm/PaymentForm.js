/* eslint-disable react/prop-types */
import React from 'react'
import Loading from '../../Loading/Loading'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js'
import { save } from '../../../services/api/payment'

// eslint-disable-next-line react/prop-types
const PaymentForm = ({ billingInfo, user }) => {
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const cartItems = useSelector((state) => state.cart.items)
  const loading = useSelector((state) => state.cart.loading)

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.beats.price, 0)
    : 0

  if (loading) return <Loading />

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    try {
      const paymentInfo = {
        price: totalPrice,
        user: user.userId,
        cart: cartItems,
        billingInfo
      }

      const { clientSecret } = await save(paymentInfo)

      const { error: stripeError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: billingInfo.name,
              address: {
                // eslint-disable-next-line react/prop-types
                line1: billingInfo.address,
                city: billingInfo.city,
                country: billingInfo.country,
                postal_code: billingInfo.postalCode
              }
            }
          }
        }
      )

      if (stripeError) {
        navigate('/failed')
      } else {
        navigate('/success')
      }
    } catch (error) {
      console.error('Error creating payment intent:', error)
      navigate('/error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg bg-gray-800 p-6 shadow-md"
    >
      <h2 className="mb-4 text-2xl font-bold text-white">
        Payment Information
      </h2>

      {/* Payment Fields */}
      <div>
        <label className="mb-1 block text-white">Card Number</label>
        <CardNumberElement className="rounded-md border border-gray-600 bg-gray-700 p-3 text-white" />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="mb-1 block text-white">
            Expiration Date (MM/YY)
          </label>
          <CardExpiryElement className="rounded-md border border-gray-600 bg-gray-700 p-3 text-white" />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-white">CVC</label>
          <CardCvcElement className="rounded-md border border-gray-600 bg-gray-700 p-3 text-white" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-md border border-transparent bg-cyan-600 px-6 py-4 text-sm font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:bg-cyan-700"
        disabled={!stripe}
      >
        Pay ${totalPrice.toFixed(2)}
      </button>
    </form>
  )
}

export default PaymentForm
