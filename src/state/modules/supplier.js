import SupplierService from "../../services/supplier";

export const state = {
  suppliers: [],
};

export const mutations = {
  SET_SUPPLIERS(state, suppliers) {
    state.suppliers = suppliers;
  },
};

export const getters = {
  suppliers(state) {
    return state.suppliers;
  },
};

export const actions = {
  async fetch({ commit }) {
    const supplierResponse = await SupplierService.fetchSuppliers();
    commit("SET_SUPPLIERS", supplierResponse.suppliers);
  },
};
