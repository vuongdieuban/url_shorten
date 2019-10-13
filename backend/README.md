# Backend API

### POST:
To shorten url, Post to the endpoint with JSON payload.  

Endpoint: **http://localhost:5000/api/url**

Post Payload: ```{"longUrl": String}```   

Success Response: ```{"_id": String,
"longUrl": String, 
"shortUrl":String,  
"urlCode": String,
"date": Date
}``` 

Error Response: ```{Invalid Base/Long Url}```  

### GET:
Endpoint: **http://localhost:5000/:code**  

Param ```:code```: shortened url code  

Success Response: redirect to long url

Error Response: ```{"Cannot find url with this urlCode}```