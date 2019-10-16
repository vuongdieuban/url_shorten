import http from "../services/httpService";

const USER_URL = "http://localhost:5000/api/user";

const getUserInfo = async () => {
  const { data } = await http.get(USER_URL);
  return data;
};

export default { getUserInfo };
