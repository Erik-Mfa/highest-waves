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
    const emailHTML = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #14b8a6, #06b6d4); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🎵 Highest Waves</h1>
              <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 16px;">Your Beat Purchase Confirmation</p>
            </div>
            
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
              <h2 style="color: #1e293b; margin-top: 0;">Thank you for your purchase!</h2>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #14b8a6;">
                <h3 style="margin-top: 0; color: #14b8a6;">Order Details</h3>
                <p><strong>Order ID:</strong> #${orderDetails.id}</p>
                <p><strong>Total Amount:</strong> $${orderDetails.price}</p>
                <p><strong>Payment Status:</strong> ${orderDetails.paymentStatus}</p>
                <p><strong>Order Date:</strong> ${new Date(orderDetails.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #92400e;">
                  <strong>📧 What's Next?</strong><br>
                  Your beats are being processed and will be available for download shortly. 
                  You'll receive another email with download links within the next few minutes.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL}" 
                   style="background: linear-gradient(135deg, #14b8a6, #06b6d4); 
                          color: white; 
                          padding: 12px 30px; 
                          text-decoration: none; 
                          border-radius: 6px; 
                          font-weight: bold;
                          display: inline-block;">
                  Visit Highest Waves
                </a>
              </div>
              
              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center; color: #64748b; font-size: 14px;">
                <p>Need help? Contact us at <a href="mailto:support@highestwaves.com" style="color: #14b8a6;">support@highestwaves.com</a></p>
                <p style="margin: 5px 0 0 0;">© 2024 Highest Waves. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const mailOptions = {
      from: `"Highest Waves" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: '🎵 Your Beat Purchase Confirmation - Highest Waves',
      html: emailHTML,
      text: `Thank you for your purchase from Highest Waves!
      
Order Details:
- Order ID: #${orderDetails.id}
- Total Amount: $${orderDetails.price}
- Payment Status: ${orderDetails.paymentStatus}
- Order Date: ${new Date(orderDetails.createdAt).toLocaleDateString()}

Your beats are being processed and will be available for download shortly.

Visit us at: ${process.env.FRONTEND_URL}

Need help? Contact us at support@highestwaves.com

© 2024 Highest Waves. All rights reserved.`
    }

    try {
      await transporter.sendMail(mailOptions)
      console.log('Email sent successfully to:', userEmail)
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
  }

  // It saves the order and creates the Stripe payment
  save = async (req, res) => {
    try {
      const { price, user, cart, billingInfo } = req.body
      console.log('Payment request received:', { price, user, cart: cart?.length, billingInfo })

      // Validate required fields
      if (!price || !user || !billingInfo) {
        return res.status(400).json({ message: 'Missing required fields: price, user, or billingInfo' })
      }

      if (!billingInfo.email || !billingInfo.name || !billingInfo.address || !billingInfo.city || !billingInfo.country || !billingInfo.postalCode) {
        return res.status(400).json({ message: 'Missing required billing information fields' })
      }

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
          orderId: newId,
          customerEmail: billingInfo.email || findUser.email || 'no-email@provided.com'
        }
      })
      console.log('Stripe PaymentIntent created:', paymentIntent.id)

      // Create a new order
      console.log('Creating Order in database...')
      console.log('Order data to save:', {
        id: newId,
        price,
        beats: beatsData,
        user: findUser._id,
        billingInfo,
        paymentStatus: 'Pending',
        stripePaymentIntentId: paymentIntent.id
      })

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

      // Send confirmation email to the billing email
      try {
        const emailToSend = billingInfo.email || findUser.email
        if (emailToSend) {
          await this.sendConfirmationEmail(emailToSend, newOrder)
          console.log('Confirmation email sent to:', emailToSend)
        } else {
          console.log('No email address available for confirmation')
        }
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError)
        // Don't fail the payment if email fails
      }

      console.log('About to send response with clientSecret:', paymentIntent.client_secret)
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        orderId: newOrder.id
      })
    } catch (error) {
      console.error('Error creating payment intent:', error)
      
      // Handle specific error types
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: 'Validation error', 
          details: error.message,
          errors: error.errors 
        })
      }
      
      if (error.type === 'StripeCardError') {
        return res.status(400).json({ 
          message: 'Payment error', 
          details: error.message 
        })
      }
      
      return res.status(500).json({ 
        message: 'Internal server error', 
        details: error.message 
      })
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
