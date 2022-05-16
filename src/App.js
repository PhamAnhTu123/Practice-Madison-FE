import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import Order from "./pages/Order";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/verify" element={<Verify/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;
