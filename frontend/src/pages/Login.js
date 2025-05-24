import React, { useState } from "react";
import API from "../api";
import "./Login.css"; // custom CSS
import UserNavbar from "../components/UserNavbar";
const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    try {
      await API.post("/auth/send-otp", { phone });
      setStep(2);
      setMessage("OTP sent successfully.");
    } catch (err) {
      setMessage("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      const { data } = await API.post("/auth/verify-otp", { phone, code: otp });
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (err) {
      setMessage("Invalid or expired OTP.");
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="login-page">
        <div className="overlay">
          <div className="login-card">
            <h2 className="text-center mb-4">Login via OTP</h2>
            {message && <div className="alert alert-info">{message}</div>}
            {step === 1 ? (
              <>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button className="btn btn-primary w-100" onClick={sendOtp}>
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button className="btn btn-success w-100" onClick={verifyOtp}>
                  Verify & Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
