import SupplierService from "../../services/supplier";

export const state = {
  suppliers: [],
};

export const mutations = {
  SET_SUPPLIERS(state, suppliers) {
    state.suppliers = suppliers;
  },
  ADD_SUPPLIER(state, supplier) {
    state.suppliers.push(supplier);
  },
};

export const getters = {
  list(state) {
    return state.suppliers;
  },
};

export const actions = {
  async fetch({ commit }) {
    const supplierResponse = await SupplierService.fetchSuppliers();
    commit("SET_SUPPLIERS", supplierResponse.data);
  },
  async create({ commit }, supplier) {
    const response = await SupplierService.createSupplier(supplier);
    commit("ADD_SUPPLIER", response.data);
    return response.data;
  },
  update() {
    // const response = await SupplierService.createSupplier(supplier);
  },
};
