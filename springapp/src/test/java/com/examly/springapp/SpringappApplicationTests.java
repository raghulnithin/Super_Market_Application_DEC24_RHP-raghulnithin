package com.examly.springapp;

import com.examly.springapp.model.Customer;
import com.examly.springapp.model.CustomerOrder;
import com.examly.springapp.model.Product;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class SpringappApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private Long customerId;
    private Long productId;
    private Long orderId; // Variable to store the order ID

    @BeforeEach
    public void setUp() throws Exception {
        // Create a customer
        Customer customer = new Customer(null, "John Doe", "john@example.com", "1234567890");
        String customerResponse = mockMvc.perform(post("/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customer)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        // Extract the customer ID
        customerId = objectMapper.readValue(customerResponse, Customer.class).getId();

        // Create a product
        Product product = new Product(null, "Product A", 100.0, 10);
        String productResponse = mockMvc.perform(post("/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(product)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        // Extract the product ID
        productId = objectMapper.readValue(productResponse, Product.class).getId();

        // Create a customer order
        CustomerOrder customerOrder = new CustomerOrder(null, customerId, productId, 2, new java.util.Date());
        String orderResponse = mockMvc.perform(post("/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customerOrder)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        // Extract the order ID
        orderId = objectMapper.readValue(orderResponse, CustomerOrder.class).getId();
    }

    // Customer Tests
    @Test
    @Order(1)
    public void testCreateCustomer() throws Exception {
        Customer customer = new Customer(null, "John Doe", "john@example.com", "1234567890");
        mockMvc.perform(post("/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John Doe"));
    }

    @Test
    @Order(2)
    public void testGetAllCustomers() throws Exception {
        mockMvc.perform(get("/customers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    @Test
    @Order(3)
    public void testGetCustomerById() throws Exception {
        mockMvc.perform(get("/customers/" + customerId)) // Use the dynamically set customerId
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John Doe"));
    }

    @Test
    @Order(4)
    public void testDeleteCustomer() throws Exception {
        mockMvc.perform(delete("/customers/" + customerId)) // Use the dynamically set customerId
                .andExpect(status().isOk());
    }

    // CustomerOrder Tests
    // @Test
    // @Order(5)
    // public void testCreateCustomerOrderSimple() throws Exception {
    //     // Create a new customer
    //     Customer newCustomer = new Customer(null, "Jane Doe", "jane@example.com", "0987654321");
    //     String customerResponse = mockMvc.perform(post("/customers")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content(objectMapper.writeValueAsString(newCustomer)))
    //             .andExpect(status().isOk())
    //             .andReturn().getResponse().getContentAsString();
    //     Long newCustomerId = objectMapper.readValue(customerResponse, Customer.class).getId();
    
    //     // Create a new product
    //     Product newProduct = new Product(null, "Product B", 150.0, 20);
    //     String productResponse = mockMvc.perform(post("/products")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content(objectMapper.writeValueAsString(newProduct)))
    //             .andExpect(status().isOk())
    //             .andReturn().getResponse().getContentAsString();
    //     Long newProductId = objectMapper.readValue(productResponse, Product.class).getId();
    
    //     // Create a customer order using the newly created customer and product
    //     CustomerOrder customerOrder = new CustomerOrder(null, newCustomerId, newProductId, 3, new java.util.Date());
    //     mockMvc.perform(post("/orders")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content(objectMapper.writeValueAsString(customerOrder)))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.customerId").value(newCustomerId))
    //             .andExpect(jsonPath("$.productId").value(newProductId))
    //             .andExpect(jsonPath("$.quantity").value(3));
    // }
    
    @Test
    @Order(6)
    public void testGetAllCustomerOrders() throws Exception {
        mockMvc.perform(get("/orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    // @Test
    // @Order(7)
    // public void testGetCustomerOrderById() throws Exception {
    //     mockMvc.perform(get("/orders/" + orderId)) // Use the dynamically set orderId
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.productId").value(productId)); // Check for the correct product ID
    // }

    @Test
    @Order(8)
    public void testDeleteCustomerOrder() throws Exception {
        mockMvc.perform(delete("/orders/" + orderId)) // Use the dynamically set orderId
                .andExpect(status().isOk());
    }

    // Product Tests
    @Test
    @Order(9)
    public void testCreateProduct() throws Exception {
        Product product = new Product(null, "Product A", 100.0, 10);
        mockMvc.perform(post("/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(product)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Product A"));
    }

    @Test
    @Order(10)
    public void testGetAllProducts() throws Exception {
        mockMvc.perform(get("/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    @Test
    @Order(11)
    public void testGetProductById() throws Exception {
        mockMvc.perform(get("/products/" + productId)) // Use the dynamically set productId
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").isNotEmpty())
                .andExpect(jsonPath("$.name").value("Product A")); // Check for the correct name
    }

    @Test
    @Order(12)
    public void testDeleteProduct() throws Exception {
        mockMvc.perform(delete("/products/" + productId)) // Use the dynamically set productId
                .andExpect(status().isOk());
    }
}