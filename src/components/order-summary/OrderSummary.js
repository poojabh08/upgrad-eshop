import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { OrderContext } from '../../common/OrderContext';
import { AddressContext } from '../../common/AddressContext';

const OrderSummary = () => {
    const { order } = useContext(OrderContext);
    const { selectedAddress } = useContext(AddressContext);
    const {
        name,
        contactNumber,
        city,
        landmark,
        street,
        state,
        zipcode,
    } = selectedAddress;

    const calculateTotalPrice = () => {
        return order.reduce((total, item) => total + (item.quantity * item.price), 0);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%', // Match the width of the Stepper
                height: '25rem',
                backgroundColor: '#FFFFFF',
                padding: '1%',
                borderRadius: '4px',
                borderColor: '#FFFFFF',
                marginTop: '1%',
                marginLeft: '-1%', // Center align
                marginRight: 'auto', // Center align
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Shadow effect
            }}
        >
            <Box sx={{
                float: 'left',
                width: '60%',
                paddingRight: '1rem',
                overflow: 'auto',
                maxHeight: '25rem'
            }}>
                {order.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            paddingLeft: '3%',
                            paddingTop: '5%',
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{ paddingBottom: '2%' }}
                        >
                            {item.name}
                        </Typography>
                        <Typography
                            variant="p"
                            component="div"
                            sx={{ paddingBottom: '2%' }}
                        >
                            Quantity: <b>{item.quantity}</b>
                        </Typography>
                        <Typography
                            variant="p"
                            component="div"
                            sx={{ paddingBottom: '3%' }}
                        >
                            Category: <b>{item.category}</b>
                        </Typography>
                        <Typography
                            variant="p"
                            component="div"
                            sx={{ fontStyle: 'italic' }}
                        >
                            {item.description}
                        </Typography>
                    </Box>
                ))}
                <Box 
                    sx={{
                        marginTop: '4%',
                        paddingLeft: '3%',
                    }}
                >
                    <Typography 
                        variant="h5" 
                        component="div"
                        sx={{
                            paddingBottom: '2%',
                            color: "red",
                            my: 2,
                        }}
                    >
                        Total Price: ₹{calculateTotalPrice()}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    width: '2px',
                    backgroundColor: '#F1F1F1', // Vertical division color
                    marginX: '1%',
                }}
            />
            <Box
                sx={{
                    width: '40%',
                    paddingLeft: '1%'
                }}
            >
                <Box
                    sx={{
                        marginBottom: '1%',
                        paddingTop: '7%',
                    }}
                >
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ paddingBottom: '3%' }}
                    >
                        Address Details :
                    </Typography>
                    <div
                        variant="p"
                        component="div"
                    >
                        {selectedAddress && (
                            <>
                                <Typography>{name}</Typography>
                                <Typography>Contact Number: {contactNumber}</Typography>
                                <Typography>{street}, {city}</Typography>
                                <Typography>{state}</Typography>
                                <Typography>{zipcode}</Typography>
                            </>
                        )}
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default OrderSummary;
