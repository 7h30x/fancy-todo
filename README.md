# fancy-todo

| Route | HTTP | Description |  Expected Request | Expected Response | 
|-------|-----|-----------|-------------------|-----------------|
|/users | GET | Get all users | HTTP request | JSON object  | 
|/users/signin | POST | Sign in user | HTTP request | JSON object  |
|/users/signup | POST | Sign up new user | HTTP request | JSON object  
|/users/gsignin | POST | Sign in user with Google | HTTP with valid google ID token | JSON object  


<br>
<br>

| Route | HTTP | Description |  Expected Request | Expected Response | 
|-------|-----|-----------|-------------------|-----------------|
|/tasks | POST | create task | HTTP with JWT Token | JSON object  |
|/tasks | PUT | update task | HTTP with JWT Token | JSON object  |
|/tasks | GET | get a user's task | HTTP with JWT Token | JSON object  |
|/tasks | DELETE |  delete task | HTTP with JWT Token | JSON object  |


| Route | HTTP | Description |  Expected Request | Expected Response | 
|-------|-----|-----------|-------------------|-----------------|
|/groups | POST | create group | HTTP with JWT Token | JSON object  |
|/groups | PUT | update group | HTTP with JWT Token | JSON object  |
|/groups | GET | get a user's group | HTTP with JWT Token | JSON object  |
|/groups | DELETE |  delete group | HTTP with JWT Token | JSON object  |


  ## Route : GET /users

  
  **request headers**

    

  **request body**

     none

  **success response body**

      [
        message:'successfully retrieved users',
        data: {
        "id": Number,
        "email": String,
        "password" : String,
        "role": String,
        "updatedAt": Date,
        "createdAt": Date
      },
      
      ... 
      
      ]

  **success code**

        200

  **error responses**

    1.No JWT Token
     
      HTML status code: 400

      Response Body:
        {
           error: 'you are not authorized to access this endpoint.'
        }

   

    3. Internal error 
    
      HTML status code: 400

      Response Body:
        {
            error: *error message*
        }


  ## Route : POST /users/signin

  **request headers**

      none
      
  **request body**

      {
        email: String,
        password: String,
      }

  **success response body**

     {
      "message": "successfully signed in.",
      "token": JWT Token
     }

  **success code**

        200

  **error responses**

    HTML status code: 400 

    1. wrong password
     
      Response Body:
        {
          "wrong password."
        }

    2. wrong username
     
      Response Body:
        {
          "email is not registered"
        }


  ## Route : POST /users/signup

  **request headers**

      none

  **request body**

      {
        email: String,
        password: String,
      }

  **success response body**

      {
          "message": "successfully registered new user."
      }

  **success code**

        200

  **error responses**

    1. email is already registered
     
      HTML status code: 400 
      Response Body:
        {
          "email is already registered"
        }
  

  ## Route : POST /users/gsignin

  **request headers**

      none
      
  **request body**

      {
        email: String,
        password: String,
        accessToken: Object
      }

  **success response body**

     {
      "message": "successfully signed in with google.",
      "token": JWT Token
     }

  **success code**

        200

  **error responses**

    HTML status code: 400 

    1. wrong password
     
      Response Body:
        {
          "wrong password."
        }

    2. invalid ID token / internal error
     
      Response Body:
        {
          error : **Error Object**
        }