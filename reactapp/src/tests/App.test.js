import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages/Home';
import CartPage from '../pages/CartPage';
import Cart from '../components/Cart';
import ProductList from '../components/ProductList';

// Test for the Home component (Main page)
describe('Home Component', () => {
  test('renders the home page with products', async() => {
    render(<Home />);

    // Check if "Welcome to the Supermarket" is in the document
    const welcomeText = screen.getByText(/Welcome to the Supermarket/i);
    expect(welcomeText).toBeInTheDocument();

    // Check if the products are displayed
    const product1 = screen.getByText(/Apple/i);
    const product2 = screen.getByText(/Banana/i);
    const product3 = screen.getByText(/Orange/i);
    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
    expect(product3).toBeInTheDocument();
  });

  test('adds products to the cart', async() => {
    render(<Home />);

    // Add the first product to the cart
    const addButton = screen.getByText(/Apple/i);
    fireEvent.click(addButton);

    // Use a more specific selector to locate the Cart button or indicator
    const cartButton = screen.getAllByText(/Cart/i)[0]; // Adjust index if necessary
    fireEvent.click(cartButton);

    // Verify if the product is now in the cart
    const cartProduct = screen.getByText(/Apple/i);
    expect(cartProduct).toBeInTheDocument();
  });
});


// Test for the CartPage component
describe('CartPage Component', () => {
  const cartItems = [
    { id: 1, name: 'Apple', price: 2.5 },
    { id: 2, name: 'Banana', price: 1.2 }
  ];

  const onRemoveFromCart = jest.fn();

  test('renders the CartPage with items in the cart', () => {
    render(<CartPage cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />);

    // Check if the Cart component is rendered
    const cartTitle = screen.getByText(/Your Cart/i);
    expect(cartTitle).toBeInTheDocument();

    // Check if products are listed in the cart
    const product1 = screen.getByText(/Apple/i);
    const product2 = screen.getByText(/Banana/i);
    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });

  test('removes items from the cart', () => {
    render(<Cart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />);
  
    // Use getAllByText to retrieve all "Remove" buttons
    const removeButtons = screen.getAllByText(/Remove/i);
  
    // Click the first "Remove" button
    fireEvent.click(removeButtons[0]);
  
    // Check if the `onRemoveFromCart` function was called
    expect(onRemoveFromCart).toHaveBeenCalledTimes(1);
  });
  

  test('calculates the total price correctly', () => {
    render(<Cart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />);

    // Check if the total price is correctly displayed
    const totalPrice = screen.getByText(/Total: \$3.7/i);
    expect(totalPrice).toBeInTheDocument();
  });
});

// Test for ProductList component
describe('ProductList Component', () => {
  const products = [
    { id: 1, name: 'Apple', price: 2.5, description: 'Fresh Apple' },
    { id: 2, name: 'Banana', price: 1.2, description: 'Fresh Banana' }
  ];

  test('renders product list with correct data', () => {
    render(<ProductList products={products} />);

    // Check if product names are displayed
    const appleProduct = screen.getByText(/Apple/i);
    const bananaProduct = screen.getByText(/Banana/i);
    expect(appleProduct).toBeInTheDocument();
    expect(bananaProduct).toBeInTheDocument();
  });

  test('renders message when no products are available', () => {
    render(<ProductList products={[]} />);

    // Check if "No products available" is displayed
    const noProductsMessage = screen.getByText(/No products available/i);
    expect(noProductsMessage).toBeInTheDocument();
  });
});

// Test for Cart Component
describe('Cart Component', () => {
  const cartItems = [
    { id: 1, name: 'Apple', price: 2.5 },
    { id: 2, name: 'Banana', price: 1.2 }
  ];
  test('adds an item to the cart when "Add to Cart" is clicked in ProductList', () => {
    // Define the products array
    const products = [
      { id: 1, name: 'Apple', price: 2.5, description: 'Fresh Apple' },
      { id: 2, name: 'Banana', price: 1.2, description: 'Fresh Banana' },
    ];
  
    // Mock function to simulate adding an item to the cart
    const onAddToCart = jest.fn();
  
    // Render the ProductList with the products and onAddToCart function as props
    render(<ProductList products={products} onAddToCart={onAddToCart} />);
  
    // Simulate clicking the "Add to Cart" button for the first product
    const addButton = screen.getAllByText(/Add to Cart/i)[0];
    fireEvent.click(addButton);
  
    // Check if the onAddToCart function was called
    expect(onAddToCart).toHaveBeenCalledTimes(1);
    
    // Verify that the onAddToCart function was called with the correct product data
    expect(onAddToCart).toHaveBeenCalledWith(products[0]);
  });
      
  
  test('renders cart with items and remove button', () => {
    render(<Cart cartItems={cartItems} onRemoveFromCart={() => {}} />);

    // Check if each item is displayed in the cart
    const appleItem = screen.getByText(/Apple/i);
    const bananaItem = screen.getByText(/Banana/i);
    expect(appleItem).toBeInTheDocument();
    expect(bananaItem).toBeInTheDocument();

    // Check if the correct number of remove buttons is rendered
    const removeButtons = screen.getAllByText(/Remove/i);
    expect(removeButtons.length).toBe(cartItems.length);
  });

  // Test for Cart component
describe('Cart Component', () => {
  const cartItems = [
    { id: 1, name: 'Apple', price: 2.5 },
    { id: 2, name: 'Banana', price: 1.2 }
  ];

  test('Checkout button is clickable when items are in the cart', () => {
    render(<Cart cartItems={cartItems} onRemoveFromCart={() => {}} />);

    // Check if Checkout button is rendered
    const checkoutButton = screen.getByText(/Checkout/i);
    expect(checkoutButton).toBeInTheDocument();

    // Simulate a click on the Checkout button
    fireEvent.click(checkoutButton);
    // You could add an assertion here if Checkout action has specific side effects
  });
  
  test('displays empty cart message and hides Checkout button if cart is empty', () => {
    render(<Cart cartItems={[]} onRemoveFromCart={() => {}} />);
  
    // Check if "Your cart is empty" message is displayed
    const emptyCartMessage = screen.queryByText(/Your cart is empty/i);
    expect(emptyCartMessage).toBeInTheDocument();
  
    // Verify that the Checkout button is not displayed
    const checkoutButton = screen.queryByText(/Checkout/i);
    expect(checkoutButton).not.toBeInTheDocument();
  });
   
  test('calls remove function when the remove button is clicked', () => {
    // Define onRemoveFromCart as a mock function
    const onRemoveFromCart = jest.fn();

    render(<Cart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />);

    // Simulate a click on the first "Remove" button
    const removeButton = screen.getAllByText(/Remove/i)[0];
    fireEvent.click(removeButton);

    // Verify that the onRemoveFromCart function is called
    expect(onRemoveFromCart).toHaveBeenCalled();
  });
});

});
