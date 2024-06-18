## Documentation
### _link_
```https
https://xportnusa-cc-j3z4zwlm6q-et.a.run.app
```
## Authentication
### _register_

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
  Use the apiKey received in the response for authentication in subsequent requests.
  
## Products
  
