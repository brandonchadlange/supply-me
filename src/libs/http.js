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

export function getFetch(url) {
  return async function fetch() {
    const retval = {
      success: true,
      data: null,
    };

    try {
      const response = await axios.get(url);
      retval.data = response.data;
    } catch (err) {
      retval.success = false;
    }

    return retval;
  };
}

export function getPost(url, request = {}) {
  return async function post() {
    const retval = {
      success: true,
      data: null,
    };

    try {
      const response = await axios.post(url, request);
      retval.data = response.data;
    } catch (err) {
      retval.success = false;
    }

    return retval;
  };
}
