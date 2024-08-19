import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AddAddress() {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        city: '',
        landmark: '',
        street: '',
        state: '',
        zipCode: '',
    });
    const token = localStorage.getItem('token');
    console.log(token);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            name,
            contactNumber,
            city,
            landmark,
            street,
            state,
            zipCode,
        } = formData;

        if (contactNumber.length !== 10) {
            alert('Enter a valid 10-digit contact number');
            return;
        }

        const url = 'http://localhost:3001/api/v1/addresses';
        try {
            const response = await axios.post(
                url,
                {
                    name: name,
                    contactNumber: contactNumber,
                    city: city,
                    landmark: landmark,
                    street: street,
                    state: state,
                    zipCode: zipCode,
                },
                {
                    headers: {
                        'x-auth-token': `${token}`,
                        "content-type": "application/json",
                    },
                }
            );
            if (response.data) {
                window.alert('Success');
            }
        } catch (error) {
            console.error(error);
            window.alert('Error');
        }

        // Reset the form values
        setFormData({
            name: '',
            contactNumber: '',
            city: '',
            landmark: '',
            street: '',
            state: '',
            zipCode: '',
        });
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSubmit(event);
        }
    };

    return (
        <div>
            <h1>Add address here</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input
                        type="number"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="landmark">Landmark:</label>
                    <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="street">Street:</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="zipCode">ZipCode:</label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                    />
                </div>
                {/* Repeat similar blocks for other fields */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}