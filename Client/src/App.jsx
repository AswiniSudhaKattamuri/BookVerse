import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import BookDetails from "./pages/BookDetails";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Address from "./pages/Address";
import AddAddress from "./pages/AddAddress";
import EditAddress from "./pages/EditAddress";
import OrderSuccess from "./pages/OrderSuccess";
import Payment from "./pages/Payment";
import ChatBot from "./components/ChatBot";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="*" element={<NotFound />} />
		<Route path="/checkout" element={<Checkout/>}/>
		<Route path="/address" element={<Address />} />
		<Route path="/add-address" element={<AddAddress/>}/>
		<Route path="/edit-address/:id" element={<EditAddress />} />
		<Route path="/order-success" element={<OrderSuccess/>}/>
		<Route path="/payment" element={<Payment />} />

      </Routes>
	  <ChatBot/>
    </BrowserRouter>
  );
}

export default App;