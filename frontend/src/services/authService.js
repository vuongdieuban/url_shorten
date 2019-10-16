import http from "./httpService";
import jwtDecode from "jwt-decode";
const SIGNIN_URL = "http://localhost:5000/api/signin";
const tokenKey = "jwt";

const signinUser = async accessToken => {
  // Signin to get the JWT token.
  // accessToken is google oauth access token
  const { data } = await http.post(SIGNIN_URL, { accessToken });
  localStorage.setItem(tokenKey, data);
  // set token into header
  http.setJwt(getJwt());
};

const signoutUser = () => {
  localStorage.removeItem(tokenKey);
  http.setJwt(getJwt());
};

const getCurrentUser = () => {
  const jwt = localStorage.getItem(tokenKey);
  http.setJwt(getJwt());
  if (jwt) {
    const user = jwtDecode(jwt);
    console.log("Current user", user);
    return user;
  }
  return null;
};

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default { signinUser, signoutUser, getCurrentUser };
