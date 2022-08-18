import { getFetch, getPost } from "../libs/http";

async function login(username, password) {
  const url = "/auth/login";

  const request = {
    username,
    password,
  };

  const post = getPost(url, request);
  return await post();
}

async function validate() {
  const url = "/auth";
  const fetch = getFetch(url);
  return await fetch();
}

const AuhtService = {
  validate,
  login,
};

export default AuhtService;
