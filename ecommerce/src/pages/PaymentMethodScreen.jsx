import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";
import { Store } from "../Store";

const PaymentMethodScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <div className="bg-gray-300 h-screen">
      <CheckOutSteps step1 step2 step3 />
      <div>
        <div className="justify-center flex text-4xl font-bold">
          <p>Payment method</p>
        </div>
        <div className="flex justify-center">
          <form onSubmit={submitHandler}>
            <div className="pt-6">
              <input
                type="radio"
                id="PayPal"
                label="PayPal"
                value="PayPal"
                checked={paymentMethodName === "PayPal"}
                onChange={(e) => setPaymentMethodName(e.target.value)}
              />
              <label className="pl-2 font-bold text-md" htmlFor="PayPal">
                Paypal
              </label>
            </div>
            <div className="pt-6">
              <input
                type="radio"
                id="Stripe"
                label="Stripe"
                value="Stripe"
                checked={paymentMethodName === "Stripe"}
                onChange={(e) => setPaymentMethodName(e.target.value)}
              />
              <label className="pl-2 font-bold text-md" htmlFor="Stripe">
                Stripe
              </label>
            </div>
            <div className="py-12">
              <button
                className="px-4 py-2 font-bold bg-green-500 hover:bg-green-300 rounded-lg"
                type="submit"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;
