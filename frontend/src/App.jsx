import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cart from "./pages/Cart";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <ToastContainer theme="dark" position="top-center"/>
        <Header cartItems={cartItems} />
        <main className="main-container flex-grow-1">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Home />} />
              <Route
                path="/product/:id"
                element={
                  <ProductDetail
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                }
              />
              <Route path="/cart" element={<Cart cartItems={cartItems}
                    setCartItems={setCartItems} />}/>
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
