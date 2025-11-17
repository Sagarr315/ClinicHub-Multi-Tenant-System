import "./Header.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const isSuperAdmin = user?.role === "ROLE_SUPERADMIN";

  return (
    <header className="main-header shadow-sm">
      <div className="container">
        <div className="row align-items-center">

          {/* Logo */}
          <div className="col-auto">
            <Link to="/" className="logo">ClinicHub SaaS</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="col nav-desktop">
            <nav className="nav-links d-flex justify-content-end align-items-center gap-4">
              
              <Link to="/">Home</Link>

              {!isSuperAdmin && <Link to="/clinics">Clinics</Link>}

              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>

              {isSuperAdmin ? (
                <>
                  <Link to="/superadmin/dashboard" className="login-btn">
                    Create Clinic
                  </Link>

                  <button 
                    onClick={logout} 
                    className="login-btn logout-btn"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/superadmin/login" className="login-btn superadmin-btn">
                  Super Admin
                </Link>
              )}
            </nav>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="col-auto nav-mobile-icon">
            {menuOpen ? (
              <FaTimes className="hamburger-icon" onClick={() => setMenuOpen(false)} />
            ) : (
              <FaBars className="hamburger-icon" onClick={() => setMenuOpen(true)} />
            )}
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

            {!isSuperAdmin && (
              <Link to="/clinics" onClick={() => setMenuOpen(false)}>Clinics</Link>
            )}

            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

            {isSuperAdmin ? (
              <>
                <Link to="/superadmin/dashboard" onClick={() => setMenuOpen(false)}>
                  Create Clinic
                </Link>

                <button 
                  onClick={() => { logout(); setMenuOpen(false); }} 
                  className="login-btn logout-btn mobile-logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/superadmin/login" onClick={() => setMenuOpen(false)} className="login-btn superadmin-btn">
                Super Admin
              </Link>
            )}
          </div>
        )}

      </div>
    </header>
  );
}

export default Header;
