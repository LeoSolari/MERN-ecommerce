import axios from "axios";
import React, { useContext, useReducer, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

const ProfileScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [dispatch] = useReducer(reducer);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User updated!");
    } catch (error) {
      dispatch({ type: "UPDATE_FAIL" });
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-300">
      <div className="text-center ">
        <p className="text-4xl font-bold">User profile</p>
        <p className="p-1 text-xl">
          Here you can change your user name and update your password!
        </p>
      </div>
      <div className="flex justify-center">
        <form onSubmit={submitHandler}>
          <div controlId="name" className="flex flex-col">
            <label className="text-center text-xl font-bold p-4">Name</label>
            <input
              className="p-2 border-black border-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div controlId="email" className="flex flex-col">
            <label className="text-center text-xl font-bold p-4">Email</label>
            <input
              className="p-2 border-black border-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div controlId="password" className="flex flex-col">
            <label className="text-center text-xl font-bold p-4">
              Password
            </label>
            <input
              className="p-2 border-black border-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div controlId="password" className="flex flex-col">
            <label className="text-center text-xl font-bold p-4">
              Confirm password
            </label>
            <input
              className="p-2 border-black border-2"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="p-2 flex justify-center">
            <button
              className="text-center font-bold text-2xl px-20 py-4 bg-yellow-300 hover:bg-yellow-500 rounded-2xl"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
