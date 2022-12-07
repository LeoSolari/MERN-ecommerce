import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { FaTrashAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const CartScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert(`Sorry, we don't have any more of (${item.name})`);
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkOutHandler = () => {
    navigate("/signIn?redirect=/shipping");
  };

  return (
    <div className="bg-gray-300 h-screen">
      <p className="text-center text-4xl font-bold">SHOPPING CART</p>

      <div>
        <div className="text-center py-4 flex justify-around">
          {cartItems.length === 0 ? (
            <Link to="/" className="text-4xl font-bold text-blue-500">
              YOU DONT HAVE ANY ITEMS! CLICK HERE TO KEEP SHOPPING
            </Link>
          ) : (
            <p className=" text-4xl font-bold">
              SubTotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) items :
              ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
            </p>
          )}
          <button
            onClick={checkOutHandler}
            className={
              cartItems.length
                ? "p-4 bg-green-600 hover:bg-green-400 text-center font-bold text-3xl rounded-lg"
                : "hidden"
            }
            disabled={cartItems.length === 0}
          >
            Proceed to checkout
          </button>
        </div>
        <div className="flex justify-center bg-gray-300  h-full">
          <ul className="w-3/4 ">
            {cartItems.map((item) => (
              <li
                className="flex justify-around border-black border-4 mb-2"
                key={item._id}
              >
                <div className="font-bold">
                  <Link to={`/product/${item.slug}`}>
                    <p>{item.name}</p>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[120px] h-[180px] m-1 border-black border-2"
                    />
                  </Link>
                </div>
                <div className="flex flex-col justify-around">
                  <div>
                    <button
                      disabled={item.quantity === 1}
                      onClick={() => {
                        updateCartHandler(item, item.quantity - 1);
                      }}
                      className="cursor-pointer hover:opacity-70	"
                    >
                      <i>
                        <FaArrowLeft />
                      </i>
                    </button>
                    <span className="text-2xl px-8">{item.quantity} </span>
                    <button
                      disabled={item.quantity === item.countInStock}
                      onClick={() => {
                        updateCartHandler(item, item.quantity + 1);
                      }}
                      className="cursor-pointer hover:opacity-70"
                    >
                      <i>
                        <FaArrowRight />
                      </i>
                    </button>
                  </div>
                  <div className="font-bold text-4xl text-center">
                    ${item.price}
                  </div>
                  <div>
                    <i
                      onClick={() => removeItemHandler(item)}
                      className="flex justify-center"
                    >
                      <FaTrashAlt className=" w-[40px] h-[40px] cursor-pointer hover:opacity-70	" />
                    </i>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
