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
import { FaCreditCard, FaCalendarAlt, FaLock, FaShieldAlt } from 'react-icons/fa'

// eslint-disable-next-line react/prop-types
const PaymentForm = ({ billingInfo, user }) => {
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const cartItems = useSelector((state) => state.cart.items)
  const loading = useSelector((state) => state.cart.loading)
  const [processing, setProcessing] = React.useState(false)

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + (item.finalPrice || 0), 0)
    : 0

  // Debug logging
  console.log('Cart items:', cartItems)
  console.log('Total price calculated:', totalPrice)

  if (loading) return <Loading />

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      console.error('Stripe or elements not loaded')
      return
    }

    if (processing) {
      console.log('Payment already in progress')
      return
    }

    setProcessing(true)

    try {
      const paymentInfo = {
        price: totalPrice,
        user: user.userId,
        cart: cartItems,
        billingInfo
      }

      console.log('Payment info being sent:', paymentInfo)

      const response = await save(paymentInfo)
      console.log('Payment API response:', response)

      if (!response || !response.clientSecret) {
        console.error('No clientSecret received from server:', response)
        alert('Payment setup failed. Please try again.')
        return
      }

      const { clientSecret } = response
      console.log('Using clientSecret:', clientSecret)

      // Validate card element before payment
      const cardElement = elements.getElement(CardNumberElement)
      if (!cardElement) {
        console.error('Card element not found')
        alert('Card information is incomplete. Please check your card details.')
        return
      }

      console.log('Attempting to confirm payment with clientSecret:', clientSecret)
      console.log('Billing details:', billingInfo)

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: billingInfo.name,
              email: billingInfo.email,
              address: {
                line1: billingInfo.address,
                city: billingInfo.city,
                country: billingInfo.country,
                postal_code: billingInfo.postalCode
              }
            }
          }
        }
      )

      console.log('Stripe response:', { error: stripeError, paymentIntent })

      if (stripeError) {
        console.error('Stripe payment error:', stripeError)
        alert(`Payment failed: ${stripeError.message}`)
        
        // Handle different types of errors
        switch (stripeError.type) {
          case 'card_error':
            console.error('Card error:', stripeError.message)
            break
          case 'validation_error':
            console.error('Validation error:', stripeError.message)
            break
          default:
            console.error('Payment error:', stripeError.message)
        }
        
        navigate('/failed')
      } else {
        console.log('Payment successful:', paymentIntent)
        navigate('/success')
      }
    } catch (error) {
      console.error('Error creating payment intent:', error)
      alert('Payment failed. Please try again.')
      navigate('/error')
    } finally {
      setProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#9ca3af',
        },
        backgroundColor: 'transparent',
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444'
      }
    }
  }

  return (
    <div className="rounded-2xl bg-gray-800/90 border border-gray-700/50 p-8 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <FaShieldAlt className="text-2xl text-brand-blue" />
        <h2 className="text-2xl font-bold text-white">Payment Information</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Number */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
            <FaCreditCard className="text-brand-blue" />
            <span>Card Number</span>
          </label>
          <div className="relative">
            <div className="rounded-xl border-2 border-gray-600/50 bg-gray-700/50 px-4 py-3 transition-all duration-300 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/50">
              <CardNumberElement options={cardElementOptions} />
            </div>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <FaLock className="text-gray-400 text-sm" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Expiry Date */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
              <FaCalendarAlt className="text-brand-blue" />
              <span>Expiration Date</span>
            </label>
            <div className="rounded-xl border-2 border-gray-600/50 bg-gray-700/50 px-4 py-3 transition-all duration-300 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/50">
              <CardExpiryElement options={cardElementOptions} />
            </div>
          </div>

          {/* CVC */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
              <FaLock className="text-brand-blue" />
              <span>CVC</span>
            </label>
            <div className="rounded-xl border-2 border-gray-600/50 bg-gray-700/50 px-4 py-3 transition-all duration-300 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/50">
              <CardCvcElement options={cardElementOptions} />
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center space-x-3 rounded-xl bg-brand-blue-dark/20 border border-brand-blue/20 p-4">
          <FaShieldAlt className="text-brand-blue text-lg" />
          <div className="text-sm text-gray-300">
            <p className="font-medium text-brand-blue">Secure Payment</p>
            <p>Your payment information is encrypted and secure</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-brand-blue via-brand-blue-dark to-brand-blue p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-blue/25 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!stripe || processing}
        >
          <div className="flex items-center justify-center space-x-3 rounded-xl bg-gray-900 px-8 py-4 transition-all duration-300 group-hover:bg-transparent group-disabled:bg-gray-800">
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-blue"></div>
                <span className="text-lg font-semibold text-brand-blue">Processing...</span>
              </>
            ) : (
              <>
                <FaCreditCard className="text-xl text-brand-blue group-hover:text-white transition-colors duration-300" />
                <span className="text-lg font-semibold text-brand-blue group-hover:text-white transition-colors duration-300">
                  Pay ${totalPrice.toFixed(2)}
                </span>
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  )
}

export default PaymentForm
