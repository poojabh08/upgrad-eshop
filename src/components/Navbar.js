import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, isAdmin }) => {
    const history = useNavigate();

    const handleLogout = () => {
        // Add your logout logic here
        history.push('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <ShoppingCartIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    upGrad E-Shop
                </Typography>
                {!isLoggedIn ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        {isAdmin && <Button color="inherit" component={Link} to="/add-product">Add Products</Button>}
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
