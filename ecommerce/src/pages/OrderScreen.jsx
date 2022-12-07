import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", order: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const OrderScreen = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err });
      }
    };

    if (!userInfo) {
      return navigate("/login");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [userInfo, navigate, order, orderId]);

  return loading ? (
    <div className="bg-gray-300">
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
  ) : (
    <div className="bg-gray-300">
      <div className="text-4xl font-bold text-center py-6">
        Order : {orderId}
      </div>
      <div className="flex">
        <div className="w-3/4 pl-6">
          <div className="border-2 pl-12 w-[700px] p-2 my-2">
            <p className="text-2xl font-bold underline py-2">Shipping</p>
            <p>
              Name: <span>{order.shippingAddress.fullName} </span>{" "}
            </p>

            <p>
              Address:{" "}
              <span>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.country},
                {order.shippingAddress.postalCode}{" "}
              </span>{" "}
            </p>
          </div>

          {order.isDelivered ? (
            <p className="border-2 pl-12 w-[700px] my-2 bg-green-500 font-bold text-xl text-center p-3">
              Delivered at {order.deliveredAt}{" "}
            </p>
          ) : (
            <p className="border-2 pl-12 w-[700px] my-2 bg-red-500 font-bold text-xl text-center p-3">
              Not delivered
            </p>
          )}

          <div className="border-2 pl-12 w-[700px] my-2 p-2 ">
            <p className="text-2xl font-bold underline py-2">Payment</p>
            <p>
              Method: <span>{order.paymentMethod} </span>
            </p>
          </div>
          <div className="border-2 text-center my-2 w-[700px] ">
            {order.isPaid ? (
              <p className="bg-green-500 font-bold text-xl p-3">
                Paid at {order.paidAt}{" "}
              </p>
            ) : (
              <p className="bg-red-500 font-bold text-xl p-3">Not paid</p>
            )}
          </div>
          <div className="border-2 pl-12 w-[700px] my-2">
            <p className="text-2xl font-bold underline">Items</p>
            <div className="py-2">
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex justify-between pb-2">
                  <div className="flex items-center">
                    <div>
                      <Link
                        to={`/product/${item.slug}`}
                        className="text-blue-500 text-xl"
                      >
                        {" "}
                        {item.name}{" "}
                      </Link>
                      <p>
                        Quantity:{" "}
                        <span className="font-bold">{item.quantity}</span>{" "}
                      </p>
                      <p className="font-bold text-lg">$ {item.price} </p>
                    </div>
                  </div>
                  <div className="pr-4">
                    <Link to={`/product/${item.slug}`}>
                      <img
                        className="w-[100px] border-[1px] border-black h-[120px] hover:opacity-80 "
                        src={item.image}
                        alt={item.name}
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/4 pr-12  h-full ">
          <div className=" border-2 text-center p-2">
            <div>
              <p className="text-2xl font-bold pb-4 underline">Order summary</p>
            </div>
            <div className="text-lg">
              <p>Items price:</p>
              <p className="pb-2">$ {order.itemsPrice}</p>
              <p>Shipping price:</p>
              <p className="pb-2">$ {order.shippingPrice} </p>
              <p>Tax price:</p>
              <p className="pb-2">$ {order.taxPrice} </p>
              <p className="text-xl">Total:</p>
              <p className="text-2xl font-bold">$ {order.totalPrice} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
