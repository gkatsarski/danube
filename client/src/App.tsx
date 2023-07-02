import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import LogInForm from "./components/LogInForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome</h1>} />
      <Route path="/login" Component={LogInForm} />
      <Route path="/register" Component={RegisterForm} />
    </Routes>
  );
}

export default App;
