import AuthService from "../../services/auth";
import { setJWTBearerToken } from "../../libs/http";
import { EventBus } from "../../libs/eventbus";

const LOCAL_STORAGE_VARIABLE_NAMES = {
  token: "sm:token",
};

export const state = {
  token: localStorage.getItem(LOCAL_STORAGE_VARIABLE_NAMES.token),
  error: null,
};

export const mutations = {
  SET_ACCESS_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem(LOCAL_STORAGE_VARIABLE_NAMES.token, token);
    setJWTBearerToken(token);
  },
  REMOVE_ACCESS_TOKEN(state) {
    state.token = null;
    localStorage.removeItem(LOCAL_STORAGE_VARIABLE_NAMES.token);
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

export const getters = {
  loggedIn(state) {
    return !!state.token;
  },
  hasError(state) {
    return !!state.error;
  },
  error(state) {
    return state.error;
  },
};

export const actions = {
  async logIn({ commit }, { email, password }) {
    commit("SET_ERROR", null);
    const loginResponse = await AuthService.login(email, password);

    if (!loginResponse.success) {
      commit("SET_ERROR", loginResponse.error.message);
      return;
    }

    console.log("SETTING ACCESS TOKEN");

    commit("SET_ACCESS_TOKEN", loginResponse.data.access_token);
    EventBus.$emit("auth:loggedIn");
  },
  loggedIn({ commit }, { access_token }) {
    commit("SET_ACCESS_TOKEN", access_token);
  },
  loggedOut({ commit }) {
    commit("REMOVE_ACCESS_TOKEN");
  },
};
