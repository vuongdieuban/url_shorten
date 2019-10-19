import http from "../services/httpService";

const USER_URL = process.env.REACT_APP_BACKEND_DOMAIN + "/api/user";

const getUserInfo = async () => {
  const { data } = await http.get(USER_URL);
  return data;
};

const postUrls = async urls => {
  const { data } = await http.post(USER_URL, { urls });
  return data;
};

const deleteUrls = async urls => {
  const { data } = await http.delete(USER_URL, { data: { urls } });
  return data;
};

export default { getUserInfo, postUrls, deleteUrls };
