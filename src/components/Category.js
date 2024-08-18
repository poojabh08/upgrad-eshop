import { useEffect, useState, useContext } from "react";
import { fetchCategories } from "../common/services/productService";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { AuthContext } from "../common/AuthContext";

export const Category = (Props) => {
  const { authToken } = useContext(AuthContext);
  const { selectedCategory, setSelectedCategory } = Props;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories(authToken).then((data) => {
      data.unshift("All");
      setCategories(data);
    });
  }, [authToken]);

  function handleCategoryChange(event, newCategory) {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  }
  return (
    <Box sx={{ flexShrink: 0, paddingBottom: "20px" }}>
      <ToggleButtonGroup
        color="primary"
        value={selectedCategory}
        exclusive
        onChange={handleCategoryChange}
        aria-label="Platform"
      >
        {categories.map((category) => (
          <ToggleButton value={category} aria-label={category}>
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
