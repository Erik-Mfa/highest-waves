import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeCartItem, addToCartAndUpdate } from '../../store/cartSlice'; // Ensure correct path
import { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

function PurchaseCart({ user }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.cart.loading);

  

  useEffect(() => {
    if (user && user.userId) {
      dispatch(fetchCartItems(user.userId));
      console.log("WORKING")
    }
  }, [user, dispatch]);

  const handleRemoveFromCart = (cartId) => {
    if (user && user.userId) {
      dispatch(removeCartItem(cartId));
    }
  };

  if (loading) return <Loading />;

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.beats.price, 0);

  return (
    <div className="bg-gray-900 text-white p-6 mt-4 rounded-lg shadow-xl w-full border border-gray-700">
      <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-3">Your Cart</h2>
      {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <p className="text-lg text-gray-300">Your cart is empty.</p>
      ) : (
        <div>
          {Array.isArray(cartItems) ? (
            cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 mb-5 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700">
                <img
                  src={`http://localhost:3001/${item.beats.image}`}
                  alt={item.beats.title}
                  className="h-20 w-20 object-cover rounded-md border border-gray-600"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-bold">{item.beats.title}</h3>
                  <p className="text-md text-cyan-400">${item.beats.price}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-600 text-white hover:bg-red-700 transition-all duration-300 ease-in-out p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-300">There was a problem loading your cart.</p>
          )}
          <div className="mt-8">
            <p className="text-lg font-bold mb-4">Total: ${totalPrice.toFixed(2)}</p>
            {/* Checkout Button now using Link */}
            <Link
              to={{
                pathname: "/payment", // Assuming this is the correct path for the payment page
                state: { totalAmount: totalPrice }, // Pass totalPrice in the state
              }}
              className="w-full py-4 px-6 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 ease-in-out transform hover:scale-105 text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default PurchaseCart;
