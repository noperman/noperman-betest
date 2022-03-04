# USAGE
  1. Run git clone or unzip downloaded of file zip
  2. Copy this file from owner into ./ 
     -  .env
     -  docker-compose.yml
     -  private.key
     -  public.key
     -  redis.conf
  3. Run "docker-compose up"
  4. NOTE : 
  Your computer must installed docker

# ENDPOINTS 
1. Public
   - Generate Token
   POST -> http://localhost:3000/v1/token/generator
3. Protected
   Use authorization type Bearer Token
   like bellow
   headers : {
      authorization: Bearer your_token
   }
   your_toke => JWT Token
   
   CREATE
   - POST -> http://localhost:3000/v1/user
     <pre><code>
     body:
     {
        "userName" : "updateUsername",
        "accountNumber" : "1234",
        "emailAddress" : "mailtestupdate@gmail.com",
        "identityNumber" : "12314213123" 
     }
     </pre></code>
     
   READ
   - GET -> http://localhost:3000/v1/user/account/:accountNumber
     params :accountNumber => accountNumber field
     
   - GET -> http://localhost:3000/v1/user/idn/:idNumber
     params :idNumber => identityNumber field
     
   UPDATE
   - PATCH -> http://localhost:3000/v1/user/:id
     :id => UUID
     <pre><code>
     body:
     {
        "userName" : "updateUsername",
        "accountNumber" : "1234",
        "emailAddress" : "mailtestupdate@gmail.com",
        "identityNumber" : "12314213123" 
     }
     </pre></code>
   DELETE
   - DELETE -> http://localhost:3000/v1/user/:id
     :id => UUID
