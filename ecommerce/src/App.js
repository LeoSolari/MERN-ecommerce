import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductScreen from "./pages/ProductScreen";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./pages/CartScreen";
import SigninScreen from "./pages/SigninScreen";
import SignupScreen from "./pages/SignupScreen";
import Dropdown from "./components/Dropdown";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCartArrowDown } from "react-icons/fa";
import ShippingAddresScreen from "./pages/ShippingAddresScreen";
import PaymentMethodScreen from "./pages/PaymentMethodScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen";
import OrderHistoryScreen from "./pages/OrderHistoryScreen";
import ProfileScreen from "./pages/ProfileScreen";

function App() {
  const { state } = useContext(Store);

  const { cart, userInfo } = state;

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer position="bottom-center" limit={1} />
        <div className="bg-black text-white p-4">
          <div className="text-center flex justify-center">
            <Link to="/" className="text-3xl font-bold  bg-red-500">
              E-COMMERCE PAGE
            </Link>
          </div>
          <div className="flex justify-between">
            <Link to="/cart" className="flex w-fit	">
              <FaCartArrowDown className="w-[30px] h-[30px] " />

              {cart.cartItems.length > 0 && (
                <p>
                  <span className="bg-red-500 rounded-full p-0.5 ">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                </p>
              )}
            </Link>
            {userInfo ? (
              <Dropdown title={userInfo.name} />
            ) : (
              <Link to="/signin">Sign in</Link>
            )}
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/shipping" element={<ShippingAddresScreen />} />
          <Route path="/payment" element={<PaymentMethodScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/orderhistory" element={<OrderHistoryScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
