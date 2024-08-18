import React, { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  ImageList,
  ImageListItem,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  fetchProducts,
} from "../common/services/productService";
import { Category } from "./Category";
import { AuthContext } from "../common/AuthContext";
import { SnackBar } from "./Snackbar";

export const Products = () => {
  const navigate = useNavigate();
  const { authToken, isAdmin } = useContext(AuthContext);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [sortedProducts, setSortedProducts] = useState(products);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setItemToDelete] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  function sortByDefault(products) {
    return products;
  }

  function sortByPriceHighToLow(products) {
    return products.slice().sort((a, b) => b.price - a.price);
  }

  function sortByPriceLowToHigh(products) {
    return products.slice().sort((a, b) => a.price - b.price);
  }

  function sortByNewest(products) {
    return products
      .slice()
      .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }

  function filterProductsByCategory(products, category) {
    if (category === "All") {
      return products;
    }
    return products.filter((product) => product.category === category);
  }

  function filterAndSortProducts(products, category, sortOption) {
    const filtered = filterProductsByCategory(products, category);
    const sorted = sortProducts(filtered, sortOption);
    setSortedProducts(sorted);
  }

  function handleBuyProduct(id) {
    return navigate(`/products/${id}`);
  }

  function sortProducts(products, sortOption) {
    switch (sortOption) {
      case "Price high to low":
        return sortByPriceHighToLow(products);
      case "Price low to high":
        return sortByPriceLowToHigh(products);
      case "Newest":
        return sortByNewest(products);
      case "Default":
      default:
        return sortByDefault(products);
    }
  }

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    const sorted = sortProducts(products, selectedOption);
    setSortedProducts(sorted);
  };

  useEffect(() => {
    fetchProducts(authToken).then((data) => {
      setProducts(data);
      filterAndSortProducts(data, selectedCategory, sortOption);
    });
  }, [authToken, selectedCategory, sortOption]);

  const handleDelete = (item) => {
    setItemToDelete(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    deleteProduct(selectedProduct.id, authToken).then(() => {
      setSnackbarMessage(
        `Product ${selectedProduct.name} deleted successfully`
      );
      setSnackbarOpen(true);
      setProducts(
        products.filter((product) => product.id !== selectedProduct.id)
      );
      filterAndSortProducts(
        products.filter((product) => product.id !== selectedProduct.id),
        selectedCategory,
        sortOption
      );
    });
    setOpen(false);
  };

  useEffect(() => {
    filterAndSortProducts(products, selectedCategory, sortOption);
  }, [selectedCategory, sortOption, products]);
  const card = (item) => {
    return (
      <React.Fragment>
        <CardContent>
          <ImageList
            sx={{ width: 600, height: 250, padding: 1 }}
            cols={2}
            rowHeight={4}
          >
            <ImageListItem key={item.imageUrl}>
              <img src={`${item.imageUrl}`} loading="lazy" />
            </ImageListItem>
          </ImageList>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" sx={{ textAlign: "left" }}>
              {item.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: "right" }}>
              {item.price}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              size="small"
              variant="contained"
              onClick={() => handleBuyProduct(item.id)}
            >
              Buy
            </Button>
            {isAdmin && (
              <Box>
                <IconButton
                  aria-label="edit"
                  onClick={() => navigate(`/edit-product/${item.id}`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(item)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </CardActions>
        <Dialog
          open={open}
          onClose={handleClose}
          slotProps={{
            backdrop: {
              sx: {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          <DialogTitle>Confirm deletion of product!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleConfirm}
              color="primary"
              autoFocus
            >
              Ok
            </Button>
            <Button variant="outlined" onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  };

  const getCards = () => {
    return sortedProducts.map((item) => {
      return <Card sx={{ maxWidth: 350 }}>{card(item)}</Card>;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 5,
      }}
    >
      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={(category) => setSelectedCategory(category)}
      />
      <SnackBar
        message={snackbarMessage}
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
      />
      <Box
        sx={{
          display: "flex",
          alignSelf: "start",
          paddingBottom: "20px",
          paddingLeft: "100px",
        }}
      >
        <FormControl fullWidth sx={{ marginBottom: 4, minWidth: "300px" }}>
          <InputLabel disabled>Select...</InputLabel>
          <Select
            value={sortOption}
            label="Sort By"
            onChange={handleSortChange}
            displayEmpty
          >
            <MenuItem value="Default">Default</MenuItem>
            <MenuItem value="Price high to low">Price high to low</MenuItem>
            <MenuItem value="Price low to high">Price low to high</MenuItem>
            <MenuItem value="Newest">Newest</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          paddingX: 12,
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        {getCards()}
      </Box>
    </Box>
  );
};
