import UsersService from "../../services/users";

export const state = {
  profile: null,
};

export const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile;
  },
};

export const getters = {
  profile(state) {
    return state.profile;
  },
  profileFetched(state) {
    return !!state.profile;
  },
};

export const actions = {
  async fetchProfile({ commit }) {
    const profileResponse = await UsersService.fetchProfile();
    commit("SET_PROFILE", profileResponse.data);
    return profileResponse.data;
  },
};
