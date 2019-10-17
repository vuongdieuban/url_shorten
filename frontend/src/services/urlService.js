import http from "../services/httpService";

const SHORTEN_URL = process.env.REACT_APP_BACKEND_DOMAIN + "/api/url";

const shortenUrl = async longUrl => {
  const { data } = await http.post(SHORTEN_URL, { longUrl });
  return data;
};

export default { shortenUrl };
