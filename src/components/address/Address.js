import {
    Box,
    Button,
    Container,
    createTheme,
    Grid,
    ThemeProvider,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { AuthContext } from '../../common/AuthContext';
import { AddressContext } from '../../common/AddressContext'; // Import AddressContext

const defaultTheme = createTheme();

const AddAddress = () => {
    const defaultFormData = {
        name: '',
        contactNumber: '',
        city: '',
        landmark: '',
        street: '',
        state: '',
        zipcode: '',
    };

    const [formData, setFormData] = useState(defaultFormData);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [error, setError] = useState('');
    const { authToken } = useContext(AuthContext);
    const { selectedAddress, setSelectedAddress } = useContext(AddressContext); // Use AddressContext

    const fetchSavedAddresses = async () => {
        try {
            console.log('Fetching saved addresses with token:', authToken);
            const response = await axios.get('http://localhost:8080/api/addresses', {
                headers: {
                    'x-auth-token': authToken,
                    'content-type': 'application/json',
                },
            });
            console.log('Fetched addresses:', response.data);
            setSavedAddresses(response.data);
        } catch (error) {
            console.error(
                'Error fetching saved addresses:',
                error.response || error.message
            );
            setError('Failed to fetch saved addresses');
        }
    };

    useEffect(() => {
        if (authToken) {
            fetchSavedAddresses();
        } else {
            console.error('No auth token found');
            setError('No auth token found');
        }
    }, [authToken]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveAddress = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const { contactNumber } =
            formData;
        if (contactNumber.length !== 10) {
            alert('Enter a valid 10-digit contact number');
            return;
        }
        const addressExists = savedAddresses.some((addr) =>
            Object.keys(formData).every((key) => addr[key] === formData[key])
        );

        if (addressExists) {
            alert('Address already exists');
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:8080/api/addresses',
                formData,
                {
                    headers: {
                        'x-auth-token': authToken,
                        'content-type': 'application/json',
                    },
                }
            );
            if (response.data) {
                window.alert('Success');
                fetchSavedAddresses();
            } else {
                alert('Failure in saving the address');
            }
        } catch (error) {
            console.error('Error saving address:', error.response || error.message);
            setError('Failed to save address');
        }

        setFormData(defaultFormData);
        setError('');
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: '5%',
                        marginLeft: '-25%',
                        marginRight: '-25%',
                        width: '150%', // Adjust the width as needed
                        textAlign: 'left', // Center the content horizontally
                    }}
                >
                    <Typography variant="p">Select Address</Typography>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="address"
                        backgroundColor="#FEFEFE"
                        getOptionLabel={(item) => item.name}
                        getOptionValue={(item) => item.id}
                        options={savedAddresses}
                        value={selectedAddress}
                        onChange={(selectedOption) => setSelectedAddress(selectedOption)}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <p className="orSeparator">-OR-</p>
                </Box>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                // Add onSubmit handler to the form
                >
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        Add Address
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                value={formData.name}
                                inputProps={{
                                    maxLength: 255,
                                    minLength: 5,
                                }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="contactNumber"
                                label="Contact Number"
                                type="tel"
                                id="contactNumber"
                                autoComplete="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="city"
                                label="City"
                                name="city"
                                value={formData.city}
                                inputProps={{
                                    maxLength: 255,
                                    minLength: 5,
                                }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="landmark"
                                label="Landmark"
                                name="landmark"
                                value={formData.landmark}
                                inputProps={{
                                    maxLength: 255,
                                    minLength: 5,
                                }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="street"
                                label="Street"
                                name="street"
                                value={formData.street}
                                inputProps={{
                                    maxLength: 255,
                                    minLength: 5,
                                }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="state"
                                label="State"
                                name="state"
                                value={formData.state}
                                inputProps={{
                                    maxLength: 255,
                                    minLength: 5,
                                }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="zipcode"
                                label="Zip Code"
                                name="zipcode"
                                value={formData.zipcode}
                                inputProps={{
                                    maxLength: 255,
                                    minLength: 5,
                                }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit" // Change to type="submit"
                                sx={{ mt: 2, width: '100%' }}
                                onClick={handleSaveAddress}
                            >
                                Save Address
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default AddAddress;
