import http from "./httpService";
import jwtDecode from "jwt-decode";

const SIGNIN_URL = process.env.REACT_APP_BACKEND_DOMAIN + "/api/signin";
const tokenKey = "jwt";

const signinUser = async accessToken => {
  // Signin to get the JWT token.
  // accessToken is google oauth access token. Return data is jwt token
  const { data } = await http.post(SIGNIN_URL, { accessToken });
  const user = jwtDecode(data);
  localStorage.setItem(tokenKey, data);
  // set token into header
  http.setJwt(data);
  console.log(data);
  return user;
};

const signoutUser = () => {
  localStorage.removeItem(tokenKey);
  http.setJwt(null);
};

const getCurrentUser = () => {
  const jwt = localStorage.getItem(tokenKey);
  http.setJwt(jwt);
  if (jwt) {
    const user = jwtDecode(jwt);
    return user;
  }
  return null;
};

export default { signinUser, signoutUser, getCurrentUser };
