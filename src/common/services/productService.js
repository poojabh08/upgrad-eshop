export const fetchProducts = async (token) => {
  const response = await fetch("http://localhost:8080/api/products", {
    headers: { "x-auth-token": token },
  });
  const data = await response.json();
  return data;
};

export const fetchProduct = async (id, token) => {
  const response = await fetch(`http://localhost:8080/api/products/${id}`, {
    headers: { "x-auth-token": token },
  });
  const data = await response.json();
  return data;
};

export const fetchCategories = async (token) => {
  const response = await fetch(
    "http://localhost:8080/api/products/categories",
    {
      headers: { "x-auth-token": token },
    }
  );
  const data = await response.json();
  return data;
};

export const updateProduct = async (product, token) => {
  const response = await fetch(
    `http://localhost:8080/api/products/${product.id}`,
    {
      method: "PUT",
      headers: { "x-auth-token": token, "Content-Type": "application/json" },
      body: JSON.stringify(product),
    }
  );
  return response;
};

export const addProduct = async (product, token) => {
  const response = await fetch(`http://localhost:8080/api/products`, {
    method: "POST",
    headers: { "x-auth-token": token, "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return response;
};

export const deleteProduct = async (id, token) => {
  const response = await fetch(`http://localhost:8080/api/products/${id}`, {
    method: "DELETE",
    headers: { "x-auth-token": token },
  });
  return response;
};
