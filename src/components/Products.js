import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../common/services/productService";
import { Category } from "./Category";

export const Products = () => {
  const user = "admin"; // hardcoded user for now
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [sortedProducts, setSortedProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(products);

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
    setFilteredProducts(filtered);
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
    fetchProducts().then((data) =>{
      setProducts(data);
      filterAndSortProducts(data, selectedCategory, sortOption);;
  });
  }, []);

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
            <Button size="small" variant="contained" onClick={() => handleBuyProduct(item.id)}>
              Buy
            </Button>
            {user === "admin" && (
              <Box>
                <IconButton aria-label="edit"
                onClick={() => navigate(`/edit-product/${item.id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </CardActions>
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
      <Category selectedCategory = {selectedCategory} setSelectedCategory={(category) => setSelectedCategory(category)}/>
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
