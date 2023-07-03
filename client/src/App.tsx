import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import LogInForm from "./components/LogInForm";
import RegisterForm from "./components/RegisterForm";
import NavigationBar from "./components/NavigationBar";
import ProductGrid from "./components/ProductGrid";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  return (
    <>
      <h1>appppp</h1>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<ProductGrid />} />
        <Route path="/login" Component={LogInForm} />
        <Route path="/register" Component={RegisterForm} />
        <Route path="/products/:productId" Component={ProductDetails} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
