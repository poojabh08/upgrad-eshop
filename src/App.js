// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { Products } from './components/Products';
import { ProductDetailPage } from './components/ProductDetailPage';
import { EditProduct } from './components/AddEditProduct';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import OrderProcess from './components/Order';
import { AuthContextProvider } from './common/AuthContext';

export default function App() {


    return (
        <AuthContextProvider>
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/products" element={<PrivateRoute />}>
                        <Route path="/products" element={<Products />} />
                    </Route>
                    <Route path="/products/:id" element={<PrivateRoute />}>
                        <Route path="/products/:id" element={<ProductDetailPage />} />
                    </Route>
                    <Route path="/edit-product" element={<PrivateRoute />}>
                        <Route path="/edit-product" element={<EditProduct />} />
                    </Route>
                    <Route path="/edit-product/:id" element={<PrivateRoute />}>
                        <Route path="/edit-product/:id" element={<EditProduct />} />
                    </Route>
                    <Route path="/order" element={<OrderProcess />} />
            </Routes>
        </Router>
        </AuthContextProvider>
    );
}

