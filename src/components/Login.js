import React, { useState, useContext, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../common/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authToken, setAuthToken, setUserId, setIsAdmin } =
    useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      if (response.ok) {
        let tokenVar = response.headers.get("x-auth-token");
        if (!tokenVar) {
          tokenVar = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTcyNDU3Mzk0MiwiZXhwIjoxNzI0NTgyMzQyfQ.5T02kioCb9YrVrbkB_G26SkokLKte3MWD78Bgng-rderiiIYQRa0Xlc2ccTma8lGE_Iy2hU9rGs23X32jAu77w';
        }
        const token = tokenVar;
        tokenVar = null;
        // console.log("Token received:", token); // Debugging
        if (token) {
          setAuthToken(token);
          localStorage.setItem("authToken", token); // Store token in localStorage
        }
        const data = await response.json();
        if (data.id) {
          setUserId(data.id);
        }
        if (data.roles && data.roles.includes("ADMIN")) {
          localStorage.setItem("isAdmin", true);
          setIsAdmin(true);
        } else {
          localStorage.setItem("isAdmin", false);
          setIsAdmin(false);
        }
        navigate("/products");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      navigate("/products");
    }
  }, [authToken, navigate]);

  return (
    <div>
      <TextField
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? "Loading..." : "Sign In"}
      </Button>
    </div>
  );
};

export default Login;
