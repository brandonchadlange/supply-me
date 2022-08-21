import QuotesService from "../../services/quote";

export const state = {
  quotes: [],
};

export const mutations = {
  SET_QUOTES(state, quotes) {
    state.quotes = quotes;
  }
};

export const getters = {
  list(state) {
    return state.quotes;
  },
};

export const actions = {
  async fetch({ commit }) {
    const response = await QuotesService.getQuoteRequests();
    commit("SET_QUOTES", response.data);
  }
};
