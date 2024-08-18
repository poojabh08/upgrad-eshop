import React, {useEffect, useState, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchCategories, fetchProduct, updateProduct, addProduct } from '../common/services/productService';
import { FormControl, TextField, Box, Typography, Button } from '@mui/material';
import CreatableSelect from "react-select/creatable";
import { AuthContext } from '../common/AuthContext';
import { SnackBar } from './Snackbar';
export const EditProduct = () => {
    const navigate = useNavigate();
    const { authToken } = useContext(AuthContext);
    const { id } = useParams();
    const isEdit = id !== undefined;
    const [name, setName] = useState("");
    const [category, setCategory] = useState({label: "", value: ""});
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
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        fetchCategories(authToken).then(function (response) {
            setCategoryList(response);
          })
      }, [authToken]);
    
    useEffect(() => {
        if (isEdit) {
          fetchProduct(id, authToken).then(function (response) {
            setName(response.name);
            setCategory({label: response.category, value: response.category});
            setManufacturer(response.manufacturer);
            setAvailableItems(response.availableItems);
            setPrice(response.price);
            setImageUrl(response.imageUrl);
            setProductDescription(response.description);
          });
        }
      }, [isEdit, id, authToken]);

        const handleSubmit = async () => {
            if (name === "") {
              setNameError(true);
              return;
            }
            if (manufacturer === "") {
              setManufacturerError(true);
              return;
            }
            if (availableItems === undefined) {
              setAvailableItemsError(true);
              return;
            }
            if (price === undefined) {
              setPriceError(true);
              return;
            }
            const product = {
              name: name,
              category: category.value,
              manufacturer: manufacturer,
              availableItems: availableItems,
              price: price,
              imageUrl: imageUrl,
              description: productDescription,
            };
            if (isEdit) {
              product.id = id;
                updateProduct(product, authToken).then(function (response) {
                    if (response.ok) {
                        setTimeout(() => {
                            setSnackbarOpen(true);
                            setSnackbarMessage(`Product ${product.name} updated successfully`);
                        }, 2000);
                    }
                });
                navigate('/products');
            }
            else {
                // Add product
                addProduct(product, authToken).then(function (response) {
                    if (response.ok) {
                        setSnackbarMessage(`Product ${product.name} added successfully`);
                        setSnackbarOpen(true);
                    }
                    navigate('/products');
                  });
            }
        }

    return (
        <Box sx={{display: "flex", alignItems:"center", justifyContent: "center", marginTop: "20px"}}>
        <SnackBar message={snackbarMessage} open={snackbarOpen} setOpen={setSnackbarOpen} />
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
                value={category}
                options={categoryList.map((item) => ({
                  label: item,
                  value: item,
                }))}
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
              value={Number(availableItems)}
              fullWidth
              error={availableItemsError}
            />
              <TextField
              label="Price"
              onChange={(e) => setPrice(e.target.value)}
              required
              variant="outlined"
              type="number"
              value={Number(price)}
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, width: "100%" }}
              onClick={handleSubmit}
            >
              {isEdit ? "Modify Product" : "Add Product"}
            </Button>
            </FormControl>
          </Box>

    )
}
