# Xportnusa API Documentation
Welcome to the Xportnusa API documentation repository. This document provides details on how to interact with the Xportnusa API to manage products.

## Base URL
The base URL for all API endpoints is:
```http
https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/
```

# Products
Manage products within the Xportnusa platform.

## Add New Product

- Endpoint: `POST /products`
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
        price_range: string,
        min_order: string,
        order_req: boolean,
        supply_ability: string,
        history_view_product: int,
        user_id: string,
        order_click: int,
        image: string
  }
  ```
- response
  ```typescript
  {
    "message": "CREATE new product success",
    "data": {
        "id": "c3f34e86-cf06-43c3-94e1-7274d2f60337",
        "name": "minyak bakar bagus",
        "description": "bahan bakar buat mobil diesel",
        "price_range": "2000 - 3999",
        "min_order": "30",
        "order_req": "0",
        "supply_ability": "10",
        "history_view_product": 0,
        "user_id": "00cdeb8b-9743-43cc-a38a-f40e25e0f43e",
        "order_click": 0,
        "image": "https://storage.googleapis.com/xportnusa/1718761579596.png"
    }
  }
  ```
  

## Get All Products
- Endpoint: `GET /products`
- Example Request:
  ```html
  GET https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/products
  ```
- body
  ```typescript
  {
        id: string,
        name: string,
        description: string,
        price_range: string,
        min_order: string,
        order_req: boolean,
        supply_ability: string,
        history_view_product: int,
        user_id: string,
        order_click: int,
        image: string
  }
  ```
- Response:
  ```typescript
  {
    "message": "GET products success",
    "data": [
        {
            "id": "002d58d0-1473-418f-80bd-48b45e0e7d9f",
            "name": "Wood Decking",
            "description": "Description of the product.",
            "price_range": "$14-$424",
            "min_order": "51",
            "order_req": 1,
            "supply_ability": "739",
            "history_view_product": 452,
            "user_id": "3b2a0d58-52d0-4b81-99f8-d1f7b0dd0ca9",
            "order_click": 444,
            "image": "https://drive.google.com/uc?id=5eFgHiJkLmNoPqRsTuVwXyZaBcD"
        },
        {
            "id": "00760da8-798e-4a9c-b544-10216d4247a5",
            "name": "Cacao Kerinci Grade C",
            "description": "Description of the product.",
            "price_range": "$26-$209",
            "min_order": "92",
            "order_req": 1,
            "supply_ability": "770",
            "history_view_product": 176,
            "user_id": "75cd9cc7-c5b9-4e9e-96d2-9c3dbc7b6643",
            "order_click": 114,
            "image": "https://drive.google.com/uc?id=17qRsTuVwXyZaBcDeFgHiJkLmNo"
        }
  }
  ```

  ## Get Products by Id
- Endpoint: `GET /products/{id}`
- Example Request:
  ```html
  GET https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/products/00760da8-798e-4a9c-b544-10216d4247a5
  ```
- body
  ```typescript
  {
        id: string,
        name: string,
        description: string,
        price_range: string,
        min_order: string,
        order_req: boolean,
        supply_ability: string,
        history_view_product: int,
        user_id: string,
        order_click: int,
        image: string
  }
  ```
- Response:
  ```typescript
  {
    "message": "GET product by ID success",
    "data": {
        "id": "00760da8-798e-4a9c-b544-10216d4247a5",
        "name": "Cacao Kerinci Grade C",
        "description": "Description of the product.",
        "price_range": "$26-$209",
        "min_order": "92",
        "order_req": 1,
        "supply_ability": "770",
        "history_view_product": 176,
        "user_id": "75cd9cc7-c5b9-4e9e-96d2-9c3dbc7b6643",
        "order_click": 114,
        "image": "https://drive.google.com/uc?id=17qRsTuVwXyZaBcDeFgHiJkLmNo",
        "item_id": 1
    }
  }
  ```

# Update a Product
- Endpoint: `PATCH /products/{id}`
- Example Request:
  ```http
  PATCH https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/products/3b2a0d58-52d0-4b81-99f8-d1f7b0dd0ca9
  ```
- body
  ```typescript
  {
        id: string,
        name: string,
        description: string,
        price_range: string,
        min_order: string,
        order_req: boolean,
        supply_ability: string,
        history_view_product: int,
        user_id: string,
        order_click: int,
        image: string
  }
  ```
- Response:
  ```typescript
  {
    "message": "UPDATE product success",
    "data": {
        "id": "3b2a0d58-52d0-4b81-99f8-d1f7b0dd0ca9",
        "name": "cocoa ",
        "description": "asin",
        "price_range": "2000 - 3999",
        "min_order": "30",
        "supply_ability": "10",
        "image": "https://storage.googleapis.com/xportnusa/1718762406400.jpg"
    }
  }
  ```

# Delete a Product
- Endpoint: `DELETE /products/{id}`
- Example Request:
  ```http
  DELETE https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/products/8416d4b7-2c40-433e-b704-bb3bd7661b85
  ```
- Response:
  ```typescript
  {
    "message": "DELETE product success",
    "data": null
  }
  ```

# Search a Product
- Endpoint: `GET /products/search?term={keyword}`
- Example Request:
  ```http
  GET https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/products/search?term=minyak
  ```
- Response:
  ```typescript
  {
    "message": "SEARCH user success",
    "data": [
        {
            "id": "c3f34e86-cf06-43c3-94e1-7274d2f60337",
            "name": "minyak bakar bagus",
            "description": "bahan bakar buat mobil diesel",
            "price_range": "2000 - 3999",
            "min_order": "30",
            "order_req": 0,
            "supply_ability": "10",
            "history_view_product": 0,
            "user_id": "00cdeb8b-9743-43cc-a38a-f40e25e0f43e",
            "order_click": 0,
            "image": "https://storage.googleapis.com/xportnusa/1718761579596.png"
        },
        {
            "id": "ca4ef4c7-5ccb-4c7c-a53e-c96722d3795d",
            "name": "minyak bakar",
            "description": "bahan bakar buat mobil diesel",
            "price_range": "2000 - 3999",
            "min_order": "30",
            "order_req": 0,
            "supply_ability": "10",
            "history_view_product": 0,
            "user_id": "00cdeb8b-9743-43cc-a38a-f40e25e0f43e",
            "order_click": 0,
            "image": "https://storage.googleapis.com/xportnusa/1718711882438.png"
        }
    ]
  }
  ```

# Recommendations by product_name 
- Endpoint: `POST /products/recommendations`
- Example Request:
  ```http
  POST https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/products/recommendations
  ```
- Body:
  ```typescript
  {
    product_name: string
  }
  ```
- Response:
  ```typescript
  {
    "message": "GET recommended products success",
    "data": [
          {
              "id": "3d993a44-6358-4c50-a0ab-dc597cde45f7",
              "name": "Cacao Bali Grade C",
              "description": "Description of the product.",
              "price_range": "$14-$187",
              "min_order": "23",
              "order_req": 1,
              "supply_ability": "100",
              "history_view_product": 757,
              "user_id": "ca34b232-4c3f-40f8-add0-876dc8255f40",
              "order_click": 427,
              "image": "https://drive.google.com/uc?id=6fGhIjKlMnOpQrStUvWxYzAbCdE"
          },
          {
              "id": "586c0887-4a11-4a2c-9bc5-3c05c5aef8ee",
              "name": "Cacao Bali Grade B",
              "description": "Description of the product.",
              "price_range": "$97-$148",
              "min_order": "56",
              "order_req": 1,
              "supply_ability": "774",
              "history_view_product": 863,
              "user_id": "dbd77bc3-79a7-4c64-9197-a52e2305a6c1",
              "order_click": 224,
              "image": "https://drive.google.com/uc?id=6fGhIjKlMnOpQrStUvWxYzAbCdE"
          }
      ]
  }
  ```

# Recommendations by filter 
- Endpoint: `POST /products/recommendationsItem`
- Example Request:
  ```http
  POST https://xportnusa-cc-j3z4zwlm6q-et.a.run.app/products/recommendationsItem
  ```
- Body:
  ```typescript
  {
    item_id: int
  }
  ```
- Response:
  ```typescript
  {
    "message": "GET recommended products success",
    "data": [
          {
            "id": "002d58d0-1473-418f-80bd-48b45e0e7d9f",
            "name": "Wood Decking",
            "description": "Description of the product.",
            "price_range": "$14-$424",
            "min_order": "51",
            "order_req": 1,
            "supply_ability": "739",
            "history_view_product": 452,
            "user_id": "3b2a0d58-52d0-4b81-99f8-d1f7b0dd0ca9",
            "order_click": 444,
            "image": "https://drive.google.com/uc?id=5eFgHiJkLmNoPqRsTuVwXyZaBcD"
        },
        {
            "id": "26ecb3bb-fa62-4418-8fbe-4ecb640bd178",
            "name": "Wood Decking",
            "description": "Description of the product.",
            "price_range": "$77-$286",
            "min_order": "30",
            "order_req": 0,
            "supply_ability": "734",
            "history_view_product": 945,
            "user_id": "a76b8cb3-8383-40f0-9173-f5de03e6a0c5",
            "order_click": 134,
            "image": "https://drive.google.com/uc?id=8hIjKlMnOpQrStUvWxYzAbCdEfG"
        }
      ]
  }
  ```

# Sellers
Manage sellers within the Xportnusa platform.
## Create a Seller
```http
POST /sellers
```
- Body:
  ```typescript
  {
     id: string,
     username: string,
     office_address: string,
     website: string,
     email: string,
     factory_address: string,
     whatsapp: char
  }
  ```
- Response:
  ```typescript
  {
    "message": "CREATE new seller success",
    "data": {
        "id": "98374ha-asdfas4-45dfs",
        "username": "Aulia",
        "office_address": "-6.857955009074299, 107.51419870846401",
        "website": "berkah.com",
        "email": "berkah@gmail.com",
        "factory_address": "-6.857955009074299, 107.51419870846401",
        "whatsapp": "098765534"
    }
  }
  ```

# Buyers
Manage Buyers within the Xportnusa platform.
## Create a Buyer
```http
POST /buyers
```
- Body:
  ```typescript
  {
     id: string,
     username: string,
     address: double,
     website: string,
     email: string,
     premium: boolean
  }
  ```
- Response:
  ```typescript
  {
    "message": "CREATE new Buyer success",
    "data": {
        "id": "asdf-sdf45-asdeg4",
        "username": "Edward Gryffindor",
        "address": "-6.857955009074299",
        "email": "edward@gmail.com",
        "premium": "0"
    }
  }
  ```

