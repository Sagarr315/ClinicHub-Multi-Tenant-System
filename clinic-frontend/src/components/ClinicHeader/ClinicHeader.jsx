import "./ClinicHeader.css";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function ClinicHeader({ clinic }) {
  const { slug } = useParams();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const role = user?.role;

  // PUBLIC LINKS → visible to everyone
  const publicLinks = [{ to: `/c/${slug}`, label: "Home" }];

  // ===============================
  // ROLE BASED LINKS
  // ===============================

  let roleLinks = [];

  if (role === "ROLE_ADMIN_DOCTOR") {
    roleLinks = [
      { to: `/c/${slug}/dashboard`, label: "Dashboard" },
      { to: `/c/${slug}/analytics`, label: "Analytics & Reports" },
    ];
  }

  if (role === "ROLE_DOCTOR") {
    roleLinks = [
    
      { to: `/c/${slug}/doctor/my-appointments`, label: "My Appointments" },
      { to: `/c/${slug}/doctor/schedule`, label: "Schedule" },
      { to: `/c/${slug}/doctor/analytics`, label: "My Performance" },
    ];
  }

  if (role === "ROLE_RECEPTIONIST") {
    roleLinks = [
      { to: `/c/${slug}/book`, label: "Book Appointment" },
      { to: `/c/${slug}/appointments`, label: "Manage Appointments" },
      { to: `/c/${slug}/payments`, label: "Payments" },
    ];
  }
  // FINAL HEADER UI
  return (
    <header className="clinic-header shadow-sm">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          {/* CLINIC NAME */}
          <div className="col-auto">
            <h2 className="clinic-logo">{clinic?.name || "Clinic"}</h2>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="col clinic-nav-desktop">
            <nav className="clinic-nav-links d-flex justify-content-end gap-4">
              {/* Public Links */}
              {publicLinks.map((link) => (
                <Link key={link.label} to={link.to} className="clinic-nav-btn">
                  {link.label}
                </Link>
              ))}

              {/* Not logged in → Show LOGIN */}
              {!user && (
                <Link
                  to={`/c/${slug}/cliniclogin`}
                  className="clinic-nav-btn login-btn-clinic"
                >
                  Login
                </Link>
              )}

              {/* Logged In */}
              {user && (
                <>
                  {/* Role links */}
                  {roleLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="clinic-nav-btn"
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* LOGOUT */}
                  <button
                    className="logout-btn-clinic"
                    onClick={() => {
                      if (window.confirm("Do you really want to logout?"))
                        logout();
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="col-auto clinic-nav-mobile-icon">
            {menuOpen ? (
              <FaTimes
                className="clinic-hamburger-icon"
                onClick={() => setMenuOpen(false)}
              />
            ) : (
              <FaBars
                className="clinic-hamburger-icon"
                onClick={() => setMenuOpen(true)}
              />
            )}
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {menuOpen && (
          <div className="clinic-mobile-menu">
            {publicLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {!user && (
              <Link
                to={`/c/${slug}/cliniclogin`}
                onClick={() => setMenuOpen(false)}
                className="login-btn-clinic"
              >
                Login
              </Link>
            )}

            {user && (
              <>
                {roleLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <button
                  className="logout-btn-clinic mobile-logout"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
