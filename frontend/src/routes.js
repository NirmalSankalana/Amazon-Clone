import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { ShippingAddressScreen } from "./screens/ShippingAddressScreen";

const routes = (
  <Routes>
    <Route path="/" element={<HomeScreen />} />
    <Route path="/product/:slug" element={<ProductScreen />} />
    <Route path="/cart" element={<CartScreen />} />
    <Route path="/signin" element={<SigninScreen />} />
    <Route path="/shipping" element={<ShippingAddressScreen />} />
  </Routes>
);
export default routes;
