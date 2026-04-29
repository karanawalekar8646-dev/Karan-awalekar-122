import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = isSignup
        ? "http://localhost:5000/api/auth/signup"
        : "http://localhost:5000/api/auth/signin";

      const res = await axios.post(url, form);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

        {isSignup && (
          <>
            <input name="firstName" placeholder="First Name" onChange={handleChange} />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} />
          </>
        )}

        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <button onClick={handleSubmit}>
          {isSignup ? "Register" : "Login"}
        </button>

        <p>{msg}</p>

        <span onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have account? Sign In" : "Create new account"}
        </span>

      </div>
    </div>
  );
}

export default App;