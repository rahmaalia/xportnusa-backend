# Xportnusa API Documentation
Welcome to the Xportnusa API documentation repository. This document provides details on how to interact with the Xportnusa API to manage products.

## Base URL
The base URL for all API endpoints is:
```http
https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/
```

# Authentication
## register

```http
POST /products
```

- example link request
  ```https
  https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/products
  ```
- body
  ```typescript
  {
    id: string,
    name: string,
    description: string,
  }
  ```
- response
  ```typescript
  {
  "message": "Registration successful",
  "apiKey": "your_generated_api_key"
  }
  ```
  Use the `apiKey` received in the response for authentication in subsequent requests.
  
# Products
Manage products within the Xportnusa platform.

## Get All Products
- Endpoint: `GET /products`
- Example Request:
  ```html
  GET https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/products
  ```
- Response:
  ```typescript
  [
  {
    "id": "002d58d0-1473-418f-80bd-48b45e0e7d9f",
    "name": "Wood Decking",
    "description": "Description of Product."
  },
  {
    "id": "064d43b7-a79d-42f5-91df-047aaf2ddf5f",
    "name": "Wood Furniture",
    "description": "Description of Product."
  }
  ]
  ```

## Create a Product
- Endpoint: `POST /products`
- Example Request:
  ```http
  POST https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/products
  Content-Type: application/json
  Authorization: Bearer your_api_key
  {
  "id": "3",
  "name": "Product 3",
  "description": "Description of Product 3"
  }
  ```

- Response:
  ```typescript
  {
  "message": "Product created successfully",
  "product": {
    "id": "3",
    "name": "Product 3",
    "description": "Description of Product 3"
  }
  }
  ```

# Update a Product
- Endpoint: `PUT /products/{id}`
- Example Request:
  ```http
  PUT https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/products/3
  Content-Type: application/json
  Authorization: Bearer your_api_key

  {
    "name": "Updated Product 3",
    "description": "Updated description of Product 3"
  }
  ```

- Response:
  ```typescript
  {
  "message": "Product updated successfully",
  "product": {
    "id": "3",
    "name": "Updated Product 3",
    "description": "Updated description of Product 3"
  }
  }
  ```

# Delete a Product
- Endpoint: `DELETE /products/{id}`
- Example Request:
  ```http
  DELETE https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/products/3
  Authorization: Bearer your_api_key
  ```
- Response:
  ```typescript
  {
  "message": "Product deleted successfully",
  "deletedProductId": "3"
  }
  

# Sellers
Manage sellers within the Xportnusa platform.
## Create a Seller
```http
POST /sellers
```
- Example Request:
  ```typescript
  {
    "name": "Seller 1",
    "email": "seller1@example.com",
    "phone": "+1234567890",
    "address": "123 Seller St, Seller City"
  }
  ```
- Response:
  ```typescript
  {
  "message": "Seller created successfully",
  "seller": {
    "id": "1",
    "name": "Seller 1",
    "email": "seller1@example.com",
    "phone": "+1234567890",
    "address": "123 Seller St, Seller City"
  }
  }
  ```

## Update a Seller
```http
PUT /sellers/{id}
```
- Example Request:
```typescript
  {
  "name": "Updated Seller 1",
  "email": "seller1_updated@example.com",
  "phone": "+1234567890",
  "address": "123 Updated Seller St, Seller City"
  }
```
- Response:
  ```typescript
  {
  "message": "Seller updated successfully",
  "seller": {
    "id": "1",
    "name": "Updated Seller 1",
    "email": "seller1_updated@example.com",
    "phone": "+1234567890",
    "address": "123 Updated Seller St, Seller City"
  }
  }
  ```

## Delete a Seller
```http
DELETE /sellers/{id}
```
- Example Request:
  ```
  DELETE https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/sellers/1
  ```
- Response:
  ```
  {
  "message": "Seller deleted successfully",
  "deletedSellerId": "1"
  }
  ```

# Errors
Example Error Response:
```typescript
{
  "error": "Unauthorized",
  "message": "Invalid API key"
}
```
