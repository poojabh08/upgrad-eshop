export const fetchProducts = async () => {
    const response = await fetch("http://localhost:8080/api/products", {
        headers: {xAuthToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZW1vQGRlbW85LmNvbSIsImlhdCI6MTcyMzI5MzcwMCwiZXhwIjoxNzIzMzAyMTAwfQ.10R34ZLMUMivAHQWPWXZNAF_7slQvpVd3T80-pWsWYfcbNWNe8AsZLTvlbXbDI0HQB_bOHizx66bTgFiAfEvSg'}
});
    const data = await response.json();
    return data;
}

export const fetchProduct = async (id) => {
    const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        headers: { xAuthToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZW1vQGRlbW85LmNvbSIsImlhdCI6MTcyMzI5MzcwMCwiZXhwIjoxNzIzMzAyMTAwfQ.10R34ZLMUMivAHQWPWXZNAF_7slQvpVd3T80-pWsWYfcbNWNe8AsZLTvlbXbDI0HQB_bOHizx66bTgFiAfEvSg'}
}); 
    const data = await response.json();
    return data;
}

export const fetchCategories = async () => {
    const response = await fetch("http://localhost:8080/api/products/categories", {
        headers: {xAuthToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZW1vQGRlbW85LmNvbSIsImlhdCI6MTcyMzI5MzcwMCwiZXhwIjoxNzIzMzAyMTAwfQ.10R34ZLMUMivAHQWPWXZNAF_7slQvpVd3T80-pWsWYfcbNWNe8AsZLTvlbXbDI0HQB_bOHizx66bTgFiAfEvSg'}
});
    const data = await response.json();
    return data;
}

export const updateProduct = async (product) => {
    const response = await fetch(`http://localhost:8080/api/products/${product.id}`, {
        method: 'PUT',
        headers: {xAuthToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZW1vQGRlbW85LmNvbSIsImlhdCI6MTcyMzI5MzcwMCwiZXhwIjoxNzIzMzAyMTAwfQ.10R34ZLMUMivAHQWPWXZNAF_7slQvpVd3T80-pWsWYfcbNWNe8AsZLTvlbXbDI0HQB_bOHizx66bTgFiAfEvSg'},
        body: JSON.stringify(product)
    });
    const data = await response.json();
    return data;
}