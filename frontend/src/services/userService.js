import http from "../services/httpService";

const USER_URL = process.env.REACT_APP_BACKEND_DOMAIN + "/api/user";

const getUserInfo = async () => {
  const { data } = await http.get(USER_URL);
  return data;
};

export default { getUserInfo };
