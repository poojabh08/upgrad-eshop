import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  ImageList,
  Typography,
  Chip,
  TextField,
  Button,
} from "@mui/material";
import { AuthContext } from "../common/AuthContext";
import { OrderContext } from "../common/OrderContext";
import { fetchProduct } from "../common/services/productService";
import { Category } from "./Category";

export const ProductDetailPage = () => {
  const { authToken } = useContext(AuthContext);
  const { addToOrder } = useContext(OrderContext);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct(id, authToken).then((response) => {
      setProduct(response);
    });
  }, [authToken, id]);

  const handleAddToOrder = () => {
    addToOrder(product, quantity);
    navigate("/order");
  };

  return (
    <>
      <Container fixed>
        <Category
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Box sx={{ display: "flex" }}>
          <ImageList sx={{ width: 300, height: 350 }} cols={1} rowHeight={164}>
            <img
              src={`${product.imageUrl}`}
              alt={product.title}
              loading="lazy"
              style={{ width: "100%", height: "80%" }}
            />
          </ImageList>

          <Box>
            <div className="nameContainer">
              <Typography gutterBottom variant="h5" component="p">
                {product.name}
              </Typography>
              <Chip
                label={`Available Quantity: ${product.availableItems}`}
                color="primary"
              />
            </div>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              sx={{ mb: 2 }}
            >
              Category: {product.category}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="p"
              sx={{ fontStyle: "italic" }}
            >
              {product.description}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: "red", my: 2 }}
            >
              ₹{product.price}
            </Typography>
            <TextField
              label="Enter Quantity"
              onChange={(e) => setQuantity(e.target.value)}
              required
              variant="outlined"
              type="number"
              sx={{ my: 2, width: "75%" }}
              value={quantity}
            />
            <Button
              variant="contained"
              color="primary"
              type="button"
              disabled={!(quantity >= 1)}
              sx={{ mt: 2 }}
              onClick={handleAddToOrder}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
