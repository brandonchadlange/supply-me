import ProductsService from "../../services/product";

export const state = {
  products: [],
};

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  ADD_PRODUCT(state, products) {
    state.products.push(products);
  },
};

export const getters = {
  list(state) {
    return state.products;
  },
};

export const actions = {
  async fetch({ commit }) {
    const productsResponse = await ProductsService.fetchProducts();
    commit("SET_PRODUCTS", productsResponse.data);
  },
  async create({ commit }, { description }) {
    const productsResponse = await ProductsService.createProduct(description);
    commit("ADD_PRODUCT", productsResponse.data);
    return productsResponse.data;
  },
};
