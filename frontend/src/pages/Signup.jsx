import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";
const Signup = () => {
    const navigate=useNavigate();

    const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] =
  useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {

  try {

    setLoading(true);

    // EMPTY CHECK
if (
  !form.username ||
  !form.email ||
  !form.password
) {
  return toast.error(
    "All fields required"
  );
}

// EMAIL VALIDATION
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(form.email)) {
  return toast.error(
    "Invalid email"
  );
}

// PASSWORD LENGTH
if (form.password.length < 6) {
  return toast.error(
    "Password must be at least 6 characters"
  );
}

    await API.post(
      "/auth/signup",
      form
    );

    toast.success(
      "OTP sent to your email"
    );

    setTimeout(() => {

      navigate("/verify-otp", {
        state: {
          email: form.email,
        },
      });

    }, 500);

  } catch (err) {

    console.log(err);

    toast.error(
      err.response?.data?.message ||
      "Signup failed"
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-slate-900 p-8 rounded-2xl w-[400px]">

        <h1 className="text-3xl font-bold mb-6">
          Signup
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded-xl mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded-xl mb-4"
        />

        <input
          type="password"
          name="password"
          minLength={6}
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded-xl mb-4"
        />

        <button onClick={handleSignup} className="w-full bg-blue-600 p-3 rounded-xl">
          {loading ? "Please wait..." : "Signup"}
        </button>
        <button className="  w-full p-3 " onClick={()=> navigate("/login") 
        }>
            Already have an account?
        </button>

      </div>

    </div>
  );
};

export default Signup;