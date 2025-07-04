/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const Order = require('../models/Order')
const User = require('../models/User')
const Cart = require('../models/Cart')
const nodemailer = require('nodemailer') // Import Nodemailer for sending emails
const stripe = require('stripe')(process.env.STRIPE_KEY)

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or any other email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

class PaymentController {
  // Send confirmation email function
  async sendConfirmationEmail(userEmail, orderDetails) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Order Confirmation',
      text: `Thank you for your purchase! Here are your order details: ${JSON.stringify(orderDetails)}`
    }

    try {
      await transporter.sendMail(mailOptions)
      console.log('Email sent successfully')
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  // It saves the order and creates the Stripe payment
  save = async (req, res) => {
    try {
      const { price, user, cart, billingInfo } = req.body

      // Generate new order ID
      const max = await Order.findOne({}).sort({ id: -1 })
      const newId = max == null ? 1 : max.id + 1

      // Find user
      const findUser = await User.findOne({ id: user })
      if (!findUser) {
        return res.status(404).json({ message: 'User not found' })
      }

      // Find user's cart
      const findUserCart = await Cart.find({ user: findUser._id })
        .populate('beats')
        .populate('license')
        .populate('user')

      if (!findUserCart || findUserCart.length === 0) {
        return res
          .status(200)
          .json({ message: 'No carts found for this user', carts: [] })
      }

      // Structure beats data to match Order schema
      const beatsData = findUserCart.map(cartItem => ({
        beat: cartItem.beats._id,
        license: cartItem.license._id
      }))

      console.log('Beats data structured:', JSON.stringify(beatsData, null, 2))

      const cartItems = findUserCart
        .flatMap((cart) => (cart.beats ? [cart.beats._id.toString()] : []))
        .join(',')

      // Create payment intent with Stripe
      console.log('Creating Stripe PaymentIntent...')
      const amountInCents = Math.round(price * 100) // Fix floating point precision issues
      console.log(`Price: $${price} -> Amount in cents: ${amountInCents}`)
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          userId: findUser.id.toString(),
          cartId: cartItems,
          orderId: newId
        }
      })
      console.log('Stripe PaymentIntent created:', paymentIntent.id)

      // Create a new order
      console.log('Creating Order in database...')
      const newOrder = new Order({
        id: newId,
        price,
        beats: beatsData,
        user: findUser._id,
        billingInfo,
        paymentStatus: 'Pending',
        stripePaymentIntentId: paymentIntent.id
      })

      await newOrder.save()
      console.log('Order saved successfully with ID:', newOrder.id)

      // Clear user's cart after successful order
      await Cart.deleteMany({ user: findUser._id })
      console.log('Cart cleared for user')

      // Send confirmation email to the user (temporarily skip to avoid blocking)
      // await this.sendConfirmationEmail(findUser.email, newOrder)
      console.log('Skipping email for debugging...')

      console.log('About to send response with clientSecret:', paymentIntent.client_secret)
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        orderId: newOrder.id
      })
    } catch (error) {
      console.error('Error creating payment intent:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async refund(req, res) {
    try {
      const { orderId } = req.body

      const order = await Order.findOne({ id: orderId })
      if (!order) {
        return res.status(404).json({ message: 'Order not found' })
      }

      // Process refund through Stripe
      const refund = await stripe.refunds.create({
        payment_intent: order.stripePaymentIntentId
      })

      // Update order with refund information
      order.paymentStatus = 'Refunded'
      order.paymentHistory.push({
        date: new Date(),
        status: 'Refunded',
        message: `Refund processed: ${refund.id}`
      })

      await order.save()

      res.status(200).json({ message: 'Refund successful', refund })
    } catch (error) {
      console.error('Error processing refund:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = new PaymentController()
