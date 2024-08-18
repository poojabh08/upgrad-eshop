import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });
  const history = useNavigate();

  const handleSignup = async () => {
    // Validate form and then send the signup request
    const response = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      // Redirect on successful signup
      history("/login");
    } else {
      // Handle errors
      alert("Signup failed");
    }
  };

  return (
    <div>
      <TextField
        label="First Name"
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />
      <TextField
        label="Last Name"
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />
      <TextField
        label="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />
      <TextField
        label="Contact Number"
        value={form.contactNumber}
        onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
      />
      <Button onClick={handleSignup}>Sign Up</Button>
    </div>
  );
};

export default Signup;
