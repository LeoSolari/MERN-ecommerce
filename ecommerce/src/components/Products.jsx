import React from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";

const Products = ({ item }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert(`Sorry, we don't have any more of (${item.name})`);
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  return (
    <div>
      <Link to={`/product/${item.slug}`}>
        <img src={item.image} alt={item.name} className="h-[300px] w-[250px]" />
        <p className="text-xl text-center"> {item.name} </p>
      </Link>
      <Ratings rating={item.rating} numReviews={item.numReviews} />
      <p className="font-bold p-1">${item.price} </p>
      <div className="flex justify-center p-1">
        {item.countInStock === 0 ? (
          <button
            className="bg-red-400 px-2 py-1 font-bold rounded-md"
            disabled
          >
            Out of stock
          </button>
        ) : (
          <button
            onClick={() => addToCartHandler(item)}
            className="bg-yellow-600 px-2 py-1 font-bold rounded-md hover:bg-yellow-400"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;
