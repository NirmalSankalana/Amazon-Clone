import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Link } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import {
  Badge,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  NavbarBrand,
  Placeholder,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { MdAddShoppingCart } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { ShippingAddressScreen } from "./screens/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import { PaymentMethodsScreen } from "./screens/PaymentMethodsScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
  };
  return (
    <div className="d-flex flex-column site-container">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <NavbarBrand>amazona</NavbarBrand>
            </LinkContainer>
            <Nav className="ml-auto">
              <Link to="/cart" className="nav-link">
                <MdAddShoppingCart
                  style={{ fontSize: "1.5rem", color: "#f0f0f0" }}
                />
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              <Link to="/user">
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-list"
                      to="/#signout"
                      onClick={signOutHandler}
                    >
                      Signout
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<PaymentMethodsScreen />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div>All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
