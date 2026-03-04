import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access");

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white font-medium"
      : "text-gray-400 hover:text-white transition";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="container flex justify-between items-center h-16">
        {/* Logo */}
        <h1 className="text-xl font-semibold text-white">
          Video Gallery
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-sm">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/videos" className={linkClass}>
            Browse
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink to="/upload" className={linkClass}>
                Upload
              </NavLink>

              <NavLink to="/my-videos" className={linkClass}>
                My Videos
              </NavLink>
            </>
          )}

          {isLoggedIn ? (
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-gray-400 hover:text-white transition"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}