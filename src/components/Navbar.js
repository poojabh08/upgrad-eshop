import React, { useContext, useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../common/AuthContext";

const Navbar = () => {
  const history = useNavigate();
  const { authToken, setAuthToken, setUserId, setIsAdmin, isAdmin } =
    useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setUserId(null);
    setIsAdmin(false);
    history("/login");
  };

  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    setForceRender(!forceRender);
  }, [authToken]);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          upGrad E-Shop
        </Typography>
        {authToken === null ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/products">
              Home
            </Button>
            {isAdmin && (
              <Button color="inherit" component={Link} to="/edit-product">
                Add Products
              </Button>
            )}
            <Button
              sx={{ backgroundColor: "red", color: "white" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
