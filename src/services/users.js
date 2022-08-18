import { getFetch, getPost } from "../libs/http";

async function register(username, password) {
  const url = "/users/register";

  const request = {
    username,
    password,
  };

  const post = getPost(url, request);
  return await post();
}

async function verifyEmail(ref, otp) {
  const url = `/users/email-confirmation?ref=${ref}&otp=${otp}`;
  const fetch = getFetch(url);
  return await fetch();
}

async function fetchProfile() {
  const url = "/users/profile";
  const fetch = getFetch(url);
  return await fetch();
}

const UsersService = {
  register,
  verifyEmail,
  fetchProfile,
};

export default UsersService;
