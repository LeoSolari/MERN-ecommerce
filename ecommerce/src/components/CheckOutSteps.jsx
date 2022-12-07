import React from "react";
import { FaCheck } from "react-icons/fa";

const CheckOutSteps = (props) => {
  return (
    <div>
      <ul className="flex justify-around py-4 text-xl border-b-2 mb-2">
        <li>
          <p className="flex justify-center">
            <FaCheck className={props.step1 ? "text-orange-500" : "hidden"} />
          </p>
          Sign In
        </li>
        <li>
          <p className="flex justify-center">
            <FaCheck className={props.step2 ? "text-orange-500" : "hidden"} />
          </p>
          Shipping
        </li>
        <li>
          <p className="flex justify-center">
            <FaCheck className={props.step3 ? "text-orange-500" : "hidden"} />
          </p>
          Payment
        </li>
        <li>
          <p className="flex justify-center">
            <FaCheck className={props.step4 ? "text-orange-500" : "hidden"} />
          </p>
          Place Order
        </li>
      </ul>
    </div>
  );
};

export default CheckOutSteps;
