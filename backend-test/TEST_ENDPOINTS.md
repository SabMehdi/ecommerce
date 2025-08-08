# Test Endpoints Documentation

## Overview

This document describes the test endpoints available in the e-commerce API. These endpoints use a local JSON file (`api/data/products.json`) for data storage instead of MongoDB, making them ideal for testing and development purposes.

## Base URL
```
http://localhost:4000/api/v1/test
```

## Endpoints

### 1. Get All Test Products

**Endpoint:** `GET /test/products`

**Description:** Retrieves all products from the test JSON file.

**Response:**
```json
{
  "success": true,
  "count": 3,
  "products": [
    {
      "id": "123245",
      "title": "A Book",
      "imageUrl": "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
      "description": "This is an awesome book!",
      "price": "19",
      "category": "Books"
    }
  ]
}
```

**cURL Example:**
```bash
curl -X GET "http://localhost:4000/api/v1/test/products"
```

---

### 2. Get Test Product by ID

**Endpoint:** `GET /test/products/:id`

**Description:** Retrieves a specific product by its ID.

**Parameters:**
- `id` (string) - The unique identifier of the product

**Response:**
```json
{
  "success": true,
  "product": {
    "id": "123245",
    "title": "A Book",
    "imageUrl": "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
    "description": "This is an awesome book!",
    "price": "19",
    "category": "Books"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Product Not Found"
}
```

**cURL Example:**
```bash
curl -X GET "http://localhost:4000/api/v1/test/products/123245"
```

---

### 3. Filter Test Products by Category

**Endpoint:** `GET /test/products/category`

**Description:** Filters products by category. If no category is provided, returns all products.

**Query Parameters:**
- `category` (string, optional) - The category to filter by

**Response (with category filter):**
```json
{
  "success": true,
  "count": 2,
  "category": "Books",
  "products": [
    {
      "id": "123245",
      "title": "A Book",
      "imageUrl": "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
      "description": "This is an awesome book!",
      "price": "19",
      "category": "Books"
    }
  ]
}
```

**Response (without category filter):**
```json
{
  "success": true,
  "count": 3,
  "products": [
    // All products
  ]
}
```

**cURL Examples:**
```bash
# Filter by category
curl -X GET "http://localhost:4000/api/v1/test/products/category?category=Books"

# Get all products (no filter)
curl -X GET "http://localhost:4000/api/v1/test/products/category"
```

---

### 4. Create New Test Product

**Endpoint:** `POST /test/products`

**Description:** Creates a new product and adds it to the JSON file.

**Request Body:**
```json
{
  "title": "New Product",
  "description": "This is a new product description",
  "price": "29.99",
  "imageUrl": "https://example.com/image.jpg",
  "category": "Electronics"
}
```

**Validation Rules:**
- `title` (required): 1-100 characters
- `description` (required): 10-1000 characters
- `price` (required): Must be a valid number greater than 0
- `imageUrl` (required): Must be a valid image URL with proper extension
- `category` (optional): 2-50 characters (defaults to "General" if not provided)

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "id": "1754655916634",
    "title": "New Product",
    "description": "This is a new product description",
    "price": "29.99",
    "imageUrl": "https://example.com/image.jpg",
    "category": "Electronics"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Product title is required"
}
```

**cURL Example:**
```bash
curl -X POST "http://localhost:4000/api/v1/test/products" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Product",
    "description": "This is a new product description",
    "price": "29.99",
    "imageUrl": "https://example.com/image.jpg",
    "category": "Electronics"
  }'
```

---

## Data Storage

### File Location
Test data is stored in: `api/data/products.json`

### Data Structure
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "price": "string",
    "imageUrl": "string",
    "category": "string"
  }
]
```

### ID Generation
Product IDs are generated using `Date.now().toString()` to ensure uniqueness.

---

## Validation Examples

### 1. Missing Required Fields
```bash
curl -X POST "http://localhost:4000/api/v1/test/products" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "This is a description",
    "price": "29.99",
    "imageUrl": "https://example.com/image.jpg"
  }'
```
**Response:** `{"success": false, "error": "Product title is required"}`

### 2. Invalid Price
```bash
curl -X POST "http://localhost:4000/api/v1/test/products" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Product",
    "description": "This is a description",
    "price": "invalid",
    "imageUrl": "https://example.com/image.jpg"
  }'
```
**Response:** `{"success": false, "error": "Price must be a valid number"}`

### 3. Invalid Image URL
```bash
curl -X POST "http://localhost:4000/api/v1/test/products" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Product",
    "description": "This is a description",
    "price": "29.99",
    "imageUrl": "not-a-valid-url"
  }'
```
**Response:** `{"success": false, "error": "Image URL must be a valid image URL (jpg, jpeg, png, gif, webp)"}`

---

## Features

### ✅ **Data Persistence**
- Products are stored in a JSON file
- Changes persist between server restarts
- File is automatically updated on product creation

### ✅ **Validation**
- Comprehensive input validation
- Error messages for invalid data
- Data sanitization (trimming whitespace, formatting)

### ✅ **Search & Filter**
- Get all products
- Get product by ID
- Filter products by category
- Case-insensitive category filtering

### ✅ **Error Handling**
- 404 for non-existent products
- 400 for validation errors
- 500 for file system errors

### ✅ **Response Format**
- Consistent JSON response structure
- Success/error indicators
- Descriptive error messages

---

## Usage Notes

1. **Development Only**: These endpoints are designed for testing and development
2. **File-based Storage**: Data is stored in a local JSON file, not a database
3. **No Authentication**: These endpoints don't require authentication
4. **Simple Operations**: Basic CRUD operations without complex queries
5. **Data Format**: All prices are stored as strings for consistency

