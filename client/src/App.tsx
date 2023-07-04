import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import LogInForm from "./components/LogInForm";
import RegisterForm from "./components/RegisterForm";
import NavigationBar from "./components/NavigationBar";
import ProductGrid from "./components/ProductGrid";
import ProductDetails from "./components/ProductDetails";
import { useState } from "react";
import EditAccount from "./components/EditAccount";
import Orders from "./components/Orders";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  console.log("LOGGED IN: ", isAuthenticated);
  return (
    <>
      <NavigationBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<ProductGrid />} />
        <Route
          path="/login"
          element={<LogInForm onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/products/:productId"
          element={<ProductDetails isAuthenticated={isAuthenticated} />}
        />
        <Route path="/account" element={<EditAccount />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
