// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { Products } from './components/Products';
import { ProductDetailPage } from './components/ProductDetailPage';
import { EditProduct } from './components/AddEditProduct';

const App = () => {
    return (
            <Router>
                <Routes>
                <Route path="/products" element={<PrivateRoute />}>
                        <Route path="/products" element={<Products />} />
                    </Route>
                    <Route path="/products/:id" element={<PrivateRoute />}>
                        <Route path="/products/:id" element={<ProductDetailPage />} />
                    </Route>
                    <Route path="/edit-product/:id" element={<PrivateRoute />}>
                        <Route path="/edit-product/:id" element={<EditProduct />} />
                    </Route>
                </Routes>
            </Router>
    );
};

export default App;
