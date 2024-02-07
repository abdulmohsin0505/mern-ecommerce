import Login from "./pages/auth/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/auth/register";
import Profile from "./pages/user/Profile";
import Home from "./pages/Home";
import Navigation from "./components/common/Navigation";
import Shop from "./pages/Shop";
import ProductDetails from "./components/products/ProductDetail";
import ProductList from "./pages/admin/ProductList";
import AllProducts from "./pages/admin/Allproducts";
import UpdateProduct from "./pages/admin/UpdateProduct";
import CategoryList from "./pages/admin/CategoryList";
import Users from "./pages/admin/Users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import Favorites from "./pages/favorite/Favorite";

function App() {
  return (
    <Router>
      <Navigation />
      <ToastContainer />
      <main className="py-3">
        <Routes>
          <Route index={true} path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorite" element={<Favorites />} />

          {/* admin */}
          <Route path="/admin/productlist" element={<ProductList />} />
          <Route path="/admin/allproductslist" element={<AllProducts />} />
          <Route path="/admin/categorylist" element={<CategoryList />} />
          <Route path="/admin/userlist" element={<Users />} />

          <Route
            path="/admin/product/update/:_id"
            element={<UpdateProduct />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
