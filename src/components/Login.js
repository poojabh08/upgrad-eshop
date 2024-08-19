import React, { useState, useContext, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../common/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const { authToken, setAuthToken, setUserId, setIsAdmin } =
    useContext(AuthContext);

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    });
    if (response.ok) {
      if (response.headers.get("x-auth-token")) {
        setAuthToken(response.headers.get("x-auth-token"));
      }
      response.json().then((data) => {
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
      });

      history("/products");
    } else {
      alert("Login failed");
    }
  };

  useEffect(() => {
    if (authToken) {
      history("/products");
    }
  }, [authToken, history]);

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
      <Button onClick={handleLogin}>Sign In</Button>
    </div>
  );
};

export default Login;
