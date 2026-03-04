import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("token/", {
        username,
        password,
      });

      // Save tokens
      localStorage.setItem("username", username);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      navigate("/videos");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <section className="py-28">
      <div className="container max-w-md">
        <h2 className="text-4xl font-semibold text-white mb-8">
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 p-8 rounded-2xl space-y-6"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 text-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-slate-800 text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg"
          >
            Log in
          </button>

          {error && (
            <p className="text-center text-red-400">{error}</p>
          )}

          {/* ✅ Signup link */}
          <p className="text-center text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}