import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  const { pathname } = useLocation();
  return (
    <div className="app">
      <header className="nav">
        <Link to="/" className="logo">
          <span className="logo-mark">◐</span> Vision Studio
        </Link>
        <nav>
          <a href="/#gallery">Gallery</a>
          <a href="/#book">Book</a>
          <Link to="/admin" className={pathname === "/admin" ? "active" : ""}>
            Admin
          </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Vision Studio — Capturing moments that matter.</p>
      </footer>
    </div>
  );
}
