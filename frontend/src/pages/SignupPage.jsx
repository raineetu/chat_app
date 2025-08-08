import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import signup from "../assets/signup.jpg";
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { isSigningIn, signup } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-100">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full text-black mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-black mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-black mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              // disabled={isSigningIn}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Right Side */}
      {/* <div className="hidden lg:block ">
        <div className="flex h-full items-center justify-center p-10">
          <img
            src={signup}
            alt="Signup illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div> */}
    </div>
  );
};

export default SignupPage;
