# URL Shorten Service

## Descriptions:

This project emulates service like Bit.ly where user can post a long url and get a short url back, which can redirect to the long url address. User can sign in with their Google Account (OAuth2) and save the shortened urls for re-use.

## Details:

### Backend:

**Technologies Used**: NodeJs, ExpressJs, MongoDB, JSON Web Token (JWT), Google OAuth2

1. Implemented REST API endpoints to convert long url into short url and to interface with the database to save the user data.
2. Implemented Google OAuth 2.0 as well as JSON Web Token (JWT) for secure authentication and authorization.
3. Follow MVC design pattern and clean coding practice.

### Frontend:

**Technologies Used**: Javascript/ReactJs, HTML5, CSS3, Bootstrap 4

1. Interact with REST API backend to shorten url and save/display user data.
2. Interact with Google API for OAuth2 access token.
3. Follow ReactJs components based approach for ease of code re-use

### Quick overview of OAuth2 workflow:

1. On the frontend, direct user to Google Sign-In page.
2. If Google successfully verifies the user, it will return an Authorization Token.
3. Trade in the Authorization Token for Access Token from Google.
4. Send the Access Token to our backend.
5. Verify Access Token with Google on the backend.
6. If Google successfully verifies the Access Token, it will return the associate user's profile including unique GoogleId, name, email.
7. Query our database for this unique GoogleId. If it does not exist, create a new user profile with this GoogleId and user's name. If user exists, get the user's profile.
8. Use JWT to sign the user's profile as payload. Return the signed token back to the frontend.
9. Next time when the user needs to access any protected route, the frontend needs to send this JWT token in the header.
10. On the backend, we will have an auth middleware function to decode/verify the JWT token in the header. If success, we allow user to access protected route, else reject.

### Deployment:

Deploy both frontend and backend on Digital Ocean Droplet (Virtual Private Server - Ubuntu Linux). Use Nginx to serve the frontend, PM2 to serve the backend.
