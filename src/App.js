import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/verify" element={<Verify/>}/>
      </Routes>
    </Router>
  );
}

export default App;
