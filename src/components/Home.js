import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to upGrad E-Shop</h1>
      {/* Example links to other pages */}
      <Link to="/products">View Products</Link>
      <Link to="/edit-product">Add a Product</Link>
    </div>
  );
};

export default Home;
