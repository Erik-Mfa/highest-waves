import React, { useEffect, useState } from 'react'
import BillingForm from '../../components/Payment/BillingForm/BillingForm'
import PaymentForm from '../../components/Payment/PaymentForm/PaymentForm'
import Loading from '../../components/Loading/Loading'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../../services/stripe'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItems } from '../../store/cartSlice'
import { isAuthenticated } from '../../services/api/auth'
import { FaShoppingCart, FaArrowRight, FaCrown, FaStar, FaGem, FaMedal } from 'react-icons/fa'

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  const loading = useSelector((state) => state.cart.loading)
  const [user, setUser] = useState(null)
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  })

  const [showPaymentForm, setShowPaymentForm] = useState(false)

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

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchCartItems(user.id))
    }
  }, [user, dispatch])

  if (loading) return <Loading />
  const cartIsEmpty = !Array.isArray(cartItems) || cartItems.length === 0

  const handleBillingInfoChange = (updatedInfo) => {
    setBillingInfo(updatedInfo)
  }

  const handleProceedToPayment = () => {
    setShowPaymentForm(true)
  }

  // License styling
  const getLicenseStyle = (licenseIcon) => {
    const licenseStyles = {
      gold: {
        icon: <FaMedal className="text-yellow-400" />,
        bgColor: "bg-yellow-600/20",
        textColor: "text-yellow-400",
        borderColor: "border-yellow-400/30"
      },
      platinum: {
        icon: <FaStar className="text-slate-400" />,
        bgColor: "bg-slate-600/20",
        textColor: "text-slate-400",
        borderColor: "border-slate-400/30"
      },
      diamond: {
        icon: <FaGem className="text-teal-400" />,
        bgColor: "bg-teal-600/20",
        textColor: "text-teal-400",
        borderColor: "border-teal-400/30"
      },
      exclusive: {
        icon: <FaCrown className="text-purple-400" />,
        bgColor: "bg-purple-600/20",
        textColor: "text-purple-400",
        borderColor: "border-purple-400/30"
      }
    };
    return licenseStyles[licenseIcon] || licenseStyles.gold;
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gradient-to-br from-sky-950 to-black py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-4">
              Checkout
            </h1>
            <p className="text-gray-300 text-lg">Complete your purchase and get your beats</p>
          </div>

          {/* Order Summary Section */}
          {!cartIsEmpty && (
            <div className="mb-8">
              <div className="rounded-2xl bg-gray-800/90 border border-gray-700/50 p-8 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <FaShoppingCart className="text-2xl text-teal-400" />
                  <h2 className="text-2xl font-bold text-white">Your Order</h2>
                </div>
                
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const licenseStyle = getLicenseStyle(item.license?.icon);
                    return (
                      <div
                        key={item._id}
                        className="flex items-center space-x-4 rounded-xl bg-gray-700/50 border border-gray-600/50 p-4 transition-all duration-300 hover:bg-gray-700/70"
                      >
                        <img
                          src={`${process.env.REACT_APP_BACKEND_URL}/${item.beats.image}`}
                          alt={item.beats.title}
                          className="w-16 h-16 rounded-lg object-cover border border-gray-500"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-white truncate">
                            {item.beats.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            by {item.beats.owner?.username || 'Unknown Artist'}
                          </p>
                        </div>
                        
                        {item.license && (
                          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${licenseStyle.bgColor} ${licenseStyle.borderColor} border`}>
                            {licenseStyle.icon}
                            <span className={`text-sm font-medium ${licenseStyle.textColor}`}>
                              {item.license.name}
                            </span>
                          </div>
                        )}
                        
                        <div className="text-right">
                          <p className="text-xl font-bold text-teal-400">
                            ${item.finalPrice}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-600/50">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">Total:</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {cartIsEmpty ? (
            <div className="text-center py-16">
              <FaShoppingCart className="text-6xl text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">Add some beats to your cart to continue</p>
              <a 
                href="/beats" 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300"
              >
                <span>Browse Beats</span>
                <FaArrowRight />
              </a>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Billing Information */}
              <div>
                <BillingForm onBillingInfoChange={handleBillingInfoChange} />
                
                {!showPaymentForm && (
                  <button
                    onClick={handleProceedToPayment}
                    className="group relative mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-500/25"
                  >
                    <div className="flex items-center justify-center space-x-3 rounded-xl bg-gray-900 px-8 py-4 transition-all duration-300 group-hover:bg-transparent">
                      <span className="text-lg font-semibold text-teal-400 group-hover:text-white transition-colors duration-300">
                        Proceed to Payment
                      </span>
                      <FaArrowRight className="text-teal-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </button>
                )}
              </div>

              {/* Payment Form */}
              {showPaymentForm && (
                <div className="animate-fade-in">
                  <PaymentForm billingInfo={billingInfo} user={user} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Elements>
  )
}

export default CheckoutPage
