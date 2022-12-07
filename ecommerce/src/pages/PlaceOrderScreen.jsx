import React, { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";
import { Store } from "../Store";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const rounded = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = rounded(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? rounded(0) : rounded(10);

  cart.taxPrice = rounded(0.15 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      dispatch({ type: "CREATE_FAIL" });
      console.log(error);
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div className="bg-gray-300">
      <CheckOutSteps step1 step2 step3 step4 />
      <div>
        <div className="flex justify-center py-4">
          <p className="text-4xl font-bold">Preview Order</p>
        </div>
        <div className="flex justify-between">
          <div className="w-3/4 bg-gray-200 ">
            <div className="text-center">
              <div className="flex justify-center">
                <p className="text-4xl font-bold py-2">Shipping</p>
              </div>
              <div className="text-2xl">
                <p className="py-4">
                  Name:{" "}
                  <span className="font-bold">
                    {cart.shippingAddress.fullName}{" "}
                  </span>{" "}
                </p>
                <p className="py-4">
                  Address:{" "}
                  <span className="font-bold">
                    {cart.shippingAddress.address}{" "}
                  </span>{" "}
                </p>
                <p className="py-4">
                  City:{" "}
                  <span className="font-bold">
                    {cart.shippingAddress.city}{" "}
                  </span>{" "}
                </p>
                <p className="py-4">
                  Postal code:{" "}
                  <span className="font-bold">
                    {cart.shippingAddress.postalCode}{" "}
                  </span>{" "}
                </p>
                <p className="py-4">
                  Country:{" "}
                  <span className="font-bold">
                    {cart.shippingAddress.country}{" "}
                  </span>{" "}
                </p>
              </div>
              <div>
                <Link
                  className="text-blue-400 font-bold text-xl hover:text-blue-600 underline"
                  to="/shipping"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/4 bg-gray-200 ">
            <div className="bg-black text-white text-center font-xl font-bold">
              <p>Payment</p>
            </div>
            <div className="bg-black text-white text-center font-xl font-bold">
              <p>
                method:<span> {cart.paymentMethod} </span>{" "}
              </p>
              <Link
                className="text-blue-400 font-bold text-xl hover:text-blue-600 underline"
                to="/payment"
              >
                Edit{" "}
              </Link>
            </div>
            <div>
              <div className="bg-black text-white py-4">
                <p className="text-xl font-bold text-center">Items</p>
              </div>
              <div className="bg-black text-white">
                {cart.cartItems.map((item) => (
                  <div
                    className="border-[1px] border-orange-600 flex justify-between"
                    key={item._id}
                  >
                    <div>
                      <img
                        className="w-[100px] h-[120px] "
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className="flex flex-col justify-between pr-4 font-bold ">
                      <Link
                        className="flex justify-center underline"
                        to={`/product/${item.slug}`}
                      >
                        {" "}
                        {item.name}{" "}
                      </Link>
                      <p className="text-center pb-2"> {item.quantity} </p>
                      <p className="text-center pb-2">${item.price} </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="font-bold text-4xl">Order summary</p>
        <div>
          <p className="py-4">
            Items <span className="font-bold">$ {cart.itemsPrice} </span>{" "}
          </p>
        </div>
        <div className="py-4">
          <p>
            Shipping price{" "}
            <span className="font-bold">$ {cart.shippingPrice} </span>{" "}
          </p>
        </div>
        <div className="py-4">
          <p>
            Tax price <span className="font-bold">$ {cart.taxPrice} </span>{" "}
          </p>
        </div>
        <div className="py-2">
          <p className="font-bold text-xl">Total</p>
          <p className="font-bold text-3xl">$ {cart.totalPrice} </p>
        </div>
        <div>
          <button
            className="font-bold uppercase text-2xl bg-green-500 hover:bg-green-300 py-4 px-6 rounded-lg my-2"
            type="button"
            onClick={placeOrderHandler}
          >
            Place order
          </button>
          <Link
            to="/cart"
            className="font-bold uppercase ml-12 text-2xl bg-yellow-500 hover:bg-yellow-300 py-4 px-6 rounded-lg my-2"
            type="button"
          >
            Edit items
          </Link>
        </div>
        {loading ? (
          <div>
            <div className="p-20" role="status">
              <svg
                className="inline mr-2 w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
