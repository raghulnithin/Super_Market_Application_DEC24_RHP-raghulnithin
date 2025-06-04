const BASE_URL = "http://localhost:8080"; // Spring Boot runs on port 8080

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
};

export const fetchCustomers = async () => {
  const response = await fetch(`${BASE_URL}/customers`);
  return response.json();
};

export const createOrder = async (order) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return response.json();
};
