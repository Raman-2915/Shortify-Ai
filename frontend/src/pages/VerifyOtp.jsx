import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

const VerifyOtp = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const [loading, setLoading] =
    useState(false);

  const verifyOtp = async () => {

    try {

      setLoading(true);

      await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      toast.success(
        "Email verified successfully"
      );

      navigate("/login");

    } catch (err) {

      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Verification failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="bg-slate-900 w-[400px] p-8 rounded-2xl">

        <h1 className="text-3xl font-bold mb-2">
          Verify OTP
        </h1>

        <p className="text-slate-400 mb-6">
          Enter the code sent to:
          <br />
          <span className="text-blue-400">
            {email}
          </span>
          <br />
             <p className="text-yellow-400 text-sm mt-2">
  Check spam/promotions folder if not received.
</p>
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          className="w-full bg-slate-800 p-4 rounded-xl mb-4 outline-none text-center text-2xl tracking-[10px]"
        />

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl"
        >
          {loading
            ? "Verifying..."
            : "Verify OTP"}
        </button>

      </div>

    </div>
  );
};

export default VerifyOtp;