import http from "./httpService";
import jwtDecode from "jwt-decode";

const SIGNIN_URL = "http://localhost:5000/api/signin";
const tokenKey = "jwt";

// set JWT to header x-auth-token for all http request before any request is made
http.setJwt(getJwt());

const signinUser = async accessToken => {
  // Signin to get the JWT token.
  // accessToken is google oauth access token
  const { data } = await http.post(SIGNIN_URL, { accessToken });
  localStorage.setItem(tokenKey, data);
};

const signoutUser = () => {
  localStorage.removeItem(tokenKey);
};

const getCurrentUser = () => {
  const jwt = localStorage.getItem(tokenKey);
  if (jwt) {
    const user = jwtDecode(jwt);
    console.log("Current user", user);
    return user;
  }
  return null;
};

function getJwt() {
  console.log(
    "get token from storage, set to header",
    localStorage.getItem(tokenKey)
  );
  return localStorage.getItem(tokenKey);
}

export default { signinUser, signoutUser, getCurrentUser };
