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
  profileFetched(state) {
    return !!state.profile;
  },
};

export const actions = {
  async fetchProfile({ commit }) {
    const profileResponse = await UsersService.fetchProfile();
    commit("SET_PROFILE", profileResponse.profile);
    return profileResponse;
  },
};
