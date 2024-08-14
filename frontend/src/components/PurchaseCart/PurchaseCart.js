import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios'; // Adjust the import path as needed

const PurchaseCart = ({ onClose }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/orders`, {
                    withCredentials: true // Include cookies
                });
                console.log('Orders Response:', response.data); // Check the response
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleRemoveItem = async (orderId) => {
        try {
            await axios.delete(`/orders/${orderId}`, {
                withCredentials: true // Include cookies
            });
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleCheckout = () => {
        // Add your checkout logic here (e.g., redirect to a payment page)
        console.log('Proceeding to checkout...');
        // Close the cart after checkout
        onClose();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Your Cart</h2>
                
                {orders.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {orders.map(order => (
                            <li key={order.id} className="mb-2">
                                <p><strong>Beat:</strong> {order.beat.title}</p>
                                <p><strong>Price:</strong> ${order.price}</p>
                                <p><strong>Status:</strong> {order.status}</p>
                                <button
                                    onClick={() => handleRemoveItem(order.id)}
                                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    onClick={handleCheckout}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                    disabled={orders.length === 0}
                >
                    Proceed to Checkout
                </button>
                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PurchaseCart;
