const orderModel = require('../models/Order');
const userModel = require('../models/User');
const beatModel = require('../models/Beat');
const auth = require('../middlewares/auth/auth.js');

class OrderController {
    async save(req, res) {
        try {
            const order = req.body;

            // Assign a new ID
            const max = await orderModel.findOne({}).sort({ id: -1 });
            order.id = max == null ? 1 : max.id + 1;

            // Find the user
            const user = await userModel.findOne({ _id: order.user });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            order.user = user._id;

            // Find the beat
            const beat = await beatModel.findOne({ _id: order.beat });

            if (!beat) {
                return res.status(404).json({ message: "Beat not found" });
            }

            order.beat = beat._id;

            const result = await orderModel.create(order);
            
            return res.status(201).json(result);
        } catch (error) {
            console.error('Error saving order:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async find(req, res) {
        try {
            const result = await orderModel.find({}).populate('user').populate('beat');
            res.status(200).json(result);
        } catch (error) {
            console.error('Error finding orders:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async findById(req, res) {
        const { userId, id } = req.params;
        const result = await orderModel.findOne({ 'id': id, 'userId': userId }).populate('beat').populate('user');
        res.status(200).json(result);
    }

    async update(req, res) {
        const id = req.params.id;
        const _id = String((await userModel.findOne({ 'id': id }))._id);
        await userModel.findByIdAndUpdate(String(_id), req.body);
        res.status(200).send();
    }

    async delete(req, res) {
        try {
          const id = req.params.id;
          const order = await orderModel.findOne({ id });
          if (!order) {
            return res.status(404).json({ message: 'Order not found' });
          }
          await orderModel.findByIdAndDelete(order._id);
          res.status(200).send();
        } catch (error) {
          console.error('Error deleting order:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }
}


module.exports = new OrderController;