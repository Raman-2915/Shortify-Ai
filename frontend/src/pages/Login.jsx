import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";
const Login = () => {
  const navigate=useNavigate();
   const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
   const handleLogin = async () => {

    try {
      
      if (!form.email || !form.password) {
  return toast.error(
    "All fields required"
  );
}
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      toast.success("Login successful");
      navigate("/");

      window.location.reload();

    } catch (err) {
      console.log(err);
      toast.error("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-slate-900 p-8 rounded-2xl w-[400px]">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

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

        <button onClick={handleLogin} className="w-full bg-blue-600 p-3 rounded-xl">
          Login
        </button>
        <button className="  w-full p-3 rounded-xl" onClick={()=> navigate("/signup") 
        }>
            create new account
        </button>

      </div>

    </div>
  );
};

export default Login;