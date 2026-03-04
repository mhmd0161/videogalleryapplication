import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("signup/", {
        username,
        password,
      });

      // redirect to login after successful signup
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.error || "Signup failed"
      );
    }
  };

  return (
    <section className="py-28">
      <div className="container max-w-md">
        <h2 className="text-4xl font-semibold text-white mb-8">
          Sign up
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
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
          >
            Sign up
          </button>

          {error && (
            <p className="text-center text-red-400">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}