import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { fetchCategories, fetchProduct } from '../common/services/productService';
import { FormControl, TextField, Box, Typography } from '@mui/material';
import CreatableSelect from "react-select/creatable";
export const EditProduct = () => {
    const { id } = useParams();
    const isEdit = id !== undefined;
    const [name, setName] = useState("");
    const [category, setCategory] = useState();
    const [manufacturer, setManufacturer] = useState("");
    const [availableItems, setAvailableItems] = useState();
    const [price, setPrice] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [categoryList, setCategoryList] = useState([]);
  
    const [nameError, setNameError] = useState(false);
    const [manufacturerError, setManufacturerError] = useState(false);
    const [availableItemsError, setAvailableItemsError] = useState(false);
    const [priceError, setPriceError] = useState(false);
  
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        fetchCategories().then(function (response) {
            setCategoryList(response);
          })
      }, []);
    
    useEffect(() => {
        if (isEdit) {
          fetchProduct(id).then(function (response) {
            setName(response.name);
            setCategory(response.category);
            setManufacturer(response.manufacturer);
            setAvailableItems(response.availableItems);
            setPrice(response.price);
            setImageUrl(response.imageUrl);
            setProductDescription(response.description);
          });
        }
      }, [isEdit, id]);
    return (
        <Box sx={{display: "flex", alignItems:"center", justifyContent: "center"}}>
        <FormControl sx={{minWidth: 400}}>
        <Typography gutterBottom variant="h5" component="p" sx={{ mb: 3 }}>
              {isEdit ? "Modify Product" : "Add Product"}
            </Typography>
           <TextField
              label="Name"
              onChange={(e) => setName(e.target.value)}
              required
              variant="outlined"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={name}
              error={nameError}
            />
            <div style={{ marginBottom: "30px" }}>
              <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                name="category"
                isClearable
                required
                options={categoryList.map((item) => ({
                  label: item,
                  value: item,
                }))}
                value={category}
                onChange={(data) => setCategory(data)}
              />
            </div>
            <TextField
              label="Manufacturer"
              onChange={(e) => setManufacturer(e.target.value)}
              required
              variant="outlined"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={manufacturer}
              error={manufacturerError}
            />
            <TextField
              label="Available Items"
              onChange={(e) => setAvailableItems(e.target.value)}
              required
              variant="outlined"
              type="number"
              sx={{ mb: 3 }}
              fullWidth
              value={
                availableItems !== undefined
                  ? Number(availableItems)
                  : availableItems
              }
              error={availableItemsError}
            />
              <TextField
              label="Price"
              onChange={(e) => setPrice(e.target.value)}
              required
              variant="outlined"
              type="number"
              value={price !== undefined ? Number(price) : price}
              error={priceError}
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Image URL"
              onChange={(e) => setImageUrl(e.target.value)}
              variant="outlined"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={imageUrl}
            />
            <TextField
              label="Product Description"
              onChange={(e) => setProductDescription(e.target.value)}
              variant="outlined"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              value={productDescription}
            />
            </FormControl>
          </Box>  

    )
}
