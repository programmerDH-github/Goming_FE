import axios from "axios";
const fetch = axios.create({
  baseURL:
    process.env.REACT_APP_NODE_ENV === "dev"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_API_URL,
  maxRedirects: 0,
  validateStatus: function (status) {
    return status <= 302; // Reject only if the status code is greater than 302
  },
});
export default fetch;
