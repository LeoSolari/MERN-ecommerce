import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";

const SigninScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (error) {
      toast.error("Invalid email or password");
      return;
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="flex justify-center bg-gray-300  h-screen">
      <div className="w-[600px]">
        <div className="">
          <p className="text-4xl font-bold my-4 text-center ">Sign In</p>
        </div>
        <form className="text-center" onSubmit={submitHandler}>
          <div className="my-2 flex justify-around">
            <label className="px-2 w-[200px] font-bold">Email</label>
            <input
              type="email"
              className="border-blue-600 border-2 rounded-xl py-1 text-center font-bold"
              placeholder="email"
              required
              htmlFor="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-around my-2">
            <label className="px-2 w-[200px]  font-bold">Password</label>
            <input
              className="border-blue-600 border-2 rounded-xl py-1 text-center font-bold"
              placeholder="password"
              type="password"
              required
              htmlFor="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-3/4 rounded-xl py-4 font-bold text-2xl mt-4 bg-blue-500 hover:bg-blue-700"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-3xl py-16">
          Dont have an account?{" "}
          <Link className="text-blue-400" to={`/signup/?redirect=${redirect}`}>
            Please Sign Up{" "}
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SigninScreen;
