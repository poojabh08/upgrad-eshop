// App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AddressProvider } from './common/AddressContext';
import { AuthContextProvider } from './common/AuthContext';
import { OrderContextProvider } from './common/OrderContext';
import { EditProduct } from './components/AddEditProduct';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { ProductDetailPage } from './components/ProductDetailPage';
import { Products } from './components/Products';
import Signup from './components/Signup';
import OrderProcess from './components/show-order/order/Order';

export default function App() {


    return (
        <AuthContextProvider>
            <AddressProvider>
                <OrderContextProvider>
                    <Router>
                        <Navbar />
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
                </OrderContextProvider>
            </AddressProvider>
        </AuthContextProvider>
    );
}

