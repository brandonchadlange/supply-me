import axios from "axios";

async function login(username, password) {
  const retval = {
    hasError: false,
    error: "",
    access_token: null,
  };

  try {
    const body = {
      username,
      password,
    };

    const loginResponse = await axios.post("/auth/login", body);
    retval.access_token = loginResponse.data.access_token;
  } catch (err) {
    retval.hasError = true;
    retval.error = err.response.data.message;
  }

  return retval;
}

async function validate() {
  let valid = true;

  try {
    const authResponse = await axios.get("/auth");
    valid = authResponse.data;
  } catch (err) {
    valid = false;
  }

  return valid;
}

const AuhtService = {
  validate,
  login,
};

export default AuhtService;
