import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Components
import Banner from "./components/Banner";
import CustomNavbar from "./components/CustomNavbar";
import Footer from "./components/Footer";
import Rosters from "./pages/Rosters";

function App() {
  const { user } = useAuthContext();
  return (
    <div>
      <BrowserRouter>
        <Banner />
        <CustomNavbar />
        <div className="pages">
          <Routes>
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/rosters" element={<Rosters />} />
            <Route path="/" element={<Rosters />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
