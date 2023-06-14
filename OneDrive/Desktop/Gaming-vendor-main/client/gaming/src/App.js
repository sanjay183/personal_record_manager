import './App.css';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Otpverify from './pages/Otpverify';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpverify" element={<Otpverify />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;