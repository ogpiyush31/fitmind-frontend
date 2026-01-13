
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
  NavLink, 
} from "react-router-dom";


import MoodChart from "./components/MoodChart"; 
import MoodForm from "./components/MoodForm";
import UpliftingMessages from "./components/UpliftingMessages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gamification from "./components/Gamification";
import MotivationalQuote from "./components/MotivationalQuote";

import "./style.css";


const PrivateLayout = ({ children }) => {
  const username = localStorage.getItem("username");
  return (
    <div className="app-container">
      <header className="app-header">
    
        <div className="header-left">
          <div className="hello-banner">Hello, {username || "User"} 😊</div>
        </div>
       
        <nav className="app-nav">
         
          <NavLink to="/" className="nav-link">Journal</NavLink>
          <NavLink to="/mood-chart" className="nav-link">Chart</NavLink>
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
        </nav>

       
        <div className="header-right">
          <div className="date-display">{new Date().toDateString()}</div>
          <LogoutButton />
        </div>
      </header>
      <main className="app-main">
        <h1 className="main-heading">FitMind: AI Wellness Companion</h1>
        {children}
      </main>
    </div>
  );
};

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/login");
  };
  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("userId");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const MainPage = () => {
  return (
    <PrivateLayout>
      <MotivationalQuote />
      <MoodForm />
    </PrivateLayout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

     
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/mood-chart"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <div className="mood-chart-container">
                  <MoodChart />
                </div>
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <Gamification />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/uplifting-messages"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <UpliftingMessages />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

       
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


