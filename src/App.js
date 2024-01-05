import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

import Home from "./pages/common/Home";
import Signup from "./pages/common/Signup";
import Signin from "./pages/common/Signin";
import SignupVerification from "./pages/common/SignupVerification";
import Error404 from "./pages/error/Error404";
import Error403 from "./pages/error/Error403";
import Error500 from "./pages/error/Error500";
import UserHome from "./pages/user/UserHome/UserHome.jsx";
import AuthMiddleware from "./services/authMiddleware";
import ForgotPassword from "./pages/common/ForgotPassword";
import ResetPassword from "./pages/common/ResetPassword";
import UpdateProfile from "./pages/user/UpdateProfile/UpdateProfile.jsx";
import ChangePassword from "./pages/user/ChangePassword/ChangePassword.jsx";
import AddRentItem from "./pages/user/AddRentItem/AddRentItem.jsx";
import ProductDetails from "./pages/user/ProductDetails/ProductDetails.jsx";
import ShowProfile from "./pages/user/ShowProfile/ShowProfile.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Common Page Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/signup-verification/:userToken"
          element={<SignupVerification />}
        />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/shop/*" element={<UserHome />} />
        <Route
          path="/shop/product-details/:productID"
          element={<ProductDetails />}
        />

        <Route path="/user/show-profile" element={<ShowProfile />} />
        <Route path="/user/update-profile" element={<UpdateProfile />} />
        <Route path="/user/change-password" element={<ChangePassword />} />
        <Route path="/user/add-rent-item" element={<AddRentItem />} />

        {/* Protected Routes */}
        <Route element={<AuthMiddleware />}>
          <Route path="/shop/*" element={<UserHome />} />
        </Route>

        {/* Wildcard route for any other paths */}
        <Route path="*" element={<Navigate to="/error-404" />} />
        <Route path="/error-403" element={<Error403 />} />
        <Route path="/error-404" element={<Error404 />} />
        <Route path="/error-500" element={<Error500 />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
