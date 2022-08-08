export const state = {
  token: localStorage.getItem("sm:token"),
  error: null,
};

export const mutations = {
  SET_ACCESS_TOKEN(state, token) {
    state.token = token;
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
