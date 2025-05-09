import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/useAuth";
const Login = () => {
  const [username, setUsername] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      toast.success("Logged in");
      navigate("/todos");
    } else {
      toast.error("Enter your username");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[420px]">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 text-gray-700"
              placeholder="Enter your username"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
