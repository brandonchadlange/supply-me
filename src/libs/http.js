import axios from "axios";
import router from "../router";

export function initialiseHTTP() {
  axios.defaults.baseURL = process.env.VUE_APP_API;

  if (localStorage.getItem("sm:token")) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("sm:token");
  }

  axios.interceptors.response.use(onResponseAccepted, onResponseRejected);

  // axios.interceptors.response.use((response) => {
  //   console.log(router);

  //   if (response.status === 401) {
  //     router.push("/logout");
  //   }

  //   return response;
  // });
}

export function setJWTBearerToken(access_token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
}

export function setProjectIdHeader(projectId) {
  axios.defaults.headers.common["x-projectid"] = projectId;
}

export function getFetch(url) {
  return async () => {
    const retval = {
      success: true,
      data: null,
      error: {
        message: null,
      },
    };

    try {
      const response = await axios.get(url);
      retval.data = response.data;
    } catch (err) {
      retval.success = false;
      retval.error.message = err.response.data.message;
    }

    return retval;
  };
}

export function getPost(url, request = {}) {
  return async () => {
    const retval = {
      success: true,
      data: null,
      error: {
        message: null,
      },
    };

    try {
      const response = await axios.post(url, request);
      retval.data = response.data;
    } catch (err) {
      retval.success = false;
      retval.error.message = err.response.data.message;
    }

    return retval;
  };
}

export function getDelete(url) {
  return async () => {
    const retval = {
      success: true,
      data: null,
      error: {
        message: null,
      },
    };

    try {
      const response = await axios.delete(url);
      retval.data = response.data;
    } catch (err) {
      retval.success = false;
      retval.error.message = err.response.data.message;
    }

    return retval;
  };
}

function onResponseAccepted(response) {
  return response;
}

function onResponseRejected(err) {
  if (router.currentRoute.name === "login") {
    throw err;
  }

  if (err.response.data.status === 401) {
    router.push("/logout");
  }

  return err;
}
