import AuthService from "../../services/auth";
import { setJWTBearerToken } from "../../libs/http";
import { EventBus } from "../../libs/eventbus";

export const state = {
  token: localStorage.getItem("sm:token"),
  error: null,
};

export const mutations = {
  SET_ACCESS_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem("sm:token", token);
    setJWTBearerToken(token);
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

export const getters = {
  loggedIn(state) {
    return !!state.token;
  },
};

export const actions = {
  async logIn({ commit }, { email, password }) {
    const loginResponse = await AuthService.login(email, password);

    if (loginResponse.hasError) {
      commit("SET_ERROR", loginResponse.error);
      return;
    }

    commit("SET_ACCESS_TOKEN", loginResponse.access_token);
    EventBus.$emit("auth:loggedIn");
  },
  loggedIn({ commit }, { access_token }) {
    commit("SET_ACCESS_TOKEN", access_token);
  },
  loggedOut({ commit }) {
    commit("SET_ACCESS_TOKEN", null);
  },
};

// function saveState(key, state) {
//   window.localStorage.setItem(key, JSON.stringify(state));
// }
