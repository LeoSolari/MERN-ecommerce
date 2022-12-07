import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckOutSteps from "../components/CheckOutSteps";

const ShippingAddresScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <div className="bg-gray-300 h-screen">
      <div>
        <p className="text-4xl text-center py-4">Shipping adress</p>
      </div>
      <CheckOutSteps step1 step2 />
      <form onSubmit={submitHandler} className="text-xl text-center ">
        <div className="flex flex-col">
          <label>Full name</label>
          <div className="flex justify-center py-1">
            <input
              className="w-1/3 py-1 px-1 rounded-md"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <label>Address</label>
          <div className="flex justify-center py-1">
            <input
              className="w-1/3 py-1 px-1 rounded-md"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <label>City</label>
          <div className="flex justify-center py-1">
            <input
              className="w-1/3 py-1  px-1 rounded-md"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <label>Postal code</label>
          <div className="flex justify-center py-1">
            <input
              className="w-1/3 py-1 px-1 rounded-md "
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <label>Country</label>
          <div className="flex justify-center py-1">
            <input
              className="w-1/3 py-1  px-1 rounded-md"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-center  pt-4">
          <button
            type="submit"
            className="bg-green-500 rounded-xl py-4 px-10 text-3xl"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddresScreen;
