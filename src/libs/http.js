import axios from "axios";

export function initialiseHTTP() {
  axios.defaults.baseURL = process.env.VUE_APP_API;

  if (localStorage.getItem("sm:token")) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("sm:token");
  }

  axios.interceptors.response.use((response) => {
    return response;
  });
}

export function setJWTBearerToken(access_token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
}
