const Order = require('../models/Order');
const User = require('../models/User');
const Beat = require('../models/Beat');

class OrderController {

    async find(req, res) {
        try {
            const result = await Order.find({}).populate('user').populate('beats');
            res.status(200).json(result);
        } catch (error) {
            console.error('Error finding orders:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async save(req, res) {
        try {
        const { price, user, beat } = req.body;

        const max = await Order.findOne({}).sort({ id: -1 });
        const newId = max == null ? 1 : max.id + 1;

        const findUser = await User.findOne({ id: user });
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const findBeat = await Beat.findOne({ id: beat });
        if (!findBeat) {
            return res.status(400).json({ message: 'Invalid beat provided' });
        }

        const order = new Order({
            id: newId,
            price: price,
            user: findUser._id,
            beats: [findBeat._id],
        });

        const result = await order.save();

        return res.status(201).json(result);
        } catch (error) {
            console.error('Error saving order:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async findById(req, res) {
        const tagId = req.params.id;

        const result = await Order.findOne({ 'id': tagId }).populate('beats').populate('user');
        res.status(200).json(result);
    }

    async findOrdersByUserId(req, res) {
        const userId = req.params.id;

        try {
            const user = await User.findOne({ id: userId });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const orders = await Order.find({ user: user })
                                    .populate('beats')
                                    .populate('user');
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(400).json({ message: 'Error fetching orders', error });
        }
    }

    async update(req, res) {
        try {
            const { price, beats, user } = req.body;

            const id = req.params.id;

            const order = await Order.findOne({ id });
            if (!order) return res.status(404).json({ message: 'Order not found' });

            const findUser = await User.findOne({id: user});
            if (!findUser) return res.status(400).json({ message: 'Invalid user' });
        
            const findBeats = await Beat.find({ id: { $in: beats } });

            if (findBeats.length !== beats.length) {
            return res.status(400).json({ message: 'Invalid beat(s) provided' });
        }

            order.price = price || order.price;
            order.user = findUser._id;
            order.beats = findBeats.map(beat => beat._id);
        
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
        } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const order = await Order.findOne({ id });
            if (!order) {
            return res.status(404).json({ message: 'Order not found' });
            }

            await Order.findOneAndDelete({ id });
            res.status(200).send();
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}


module.exports = new OrderController;