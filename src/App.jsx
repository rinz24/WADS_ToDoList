import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './auth/Login.jsx';
import Register from "./auth/Register.jsx";
import Reset from "./auth/Reset.jsx";
import Dashboard from "./Dashboard.jsx";
import './App.css'

function App() {
  
  return (
    <>
      <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
