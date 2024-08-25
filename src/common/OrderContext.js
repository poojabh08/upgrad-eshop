import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  const addToOrder = (product, quantity) => {
    setOrder((prevOrder) => {
      const existingProductIndex = prevOrder.findIndex((item) => item.id === product.id);
  
      if (existingProductIndex !== -1) {
        // Product exists in the cart, update the quantity
        const updatedOrder = [...prevOrder];
        updatedOrder[existingProductIndex].quantity += quantity;
        return updatedOrder;
      } else {
        // Product does not exist in the cart, add it
        return [...prevOrder, { ...product, quantity }];
      }
    });
  };

  const clearOrders = () => {
    setOrder([]);
  }

  return (
    <OrderContext.Provider value={{ order, addToOrder, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
