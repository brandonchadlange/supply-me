import axios from "axios";

async function register(username, password) {
  const retval = {
    hasError: false,
    error: "",
    ref: null,
  };

  try {
    const body = {
      username,
      password,
    };

    const reposterResponse = await axios.post("/users/register", body);
    retval.ref = reposterResponse.data.guid;
  } catch (err) {
    retval.hasError = true;
    retval.error = err.response.data.message;
  }

  return retval;
}

async function verifyEmail(ref, otp) {
  const retval = {
    hasError: false,
    error: "",
  };

  try {
    await axios.get(`/users/email-confirmation?ref=${ref}&otp=${otp}`);
  } catch (err) {
    retval.hasError = true;
    retval.error = err.response.data.message;
  }

  return retval;
}

async function fetchProfile() {
  const retval = {
    hasError: false,
    error: "",
    profile: null,
  };

  try {
    const profileResponse = await axios.get(`/users/profile`);
    retval.profile = profileResponse.data;
  } catch (err) {
    retval.hasError = true;
    retval.error = err.response.data.message;
  }

  return retval;
}

const UsersService = {
  register,
  verifyEmail,
  fetchProfile,
};

export default UsersService;
