import ProductsService from "../../services/product";

export const state = {
  products: [],
};

export const mutations = {
  SET_PRODUCTS(state, products) {
    console.log("SETTING PRODUCTS");
    state.products = products;
    console.log(state.products);
  },
  ADD_PRODUCT(state, products) {
    state.products.push(products);
  },
};

export const getters = {
  products(state) {
    return state.products;
  },
};

export const actions = {
  async fetch({ commit }, { project }) {
    const productsResponse = await ProductsService.fetchProducts(project);
    commit("SET_PRODUCTS", productsResponse.data);
  },
  async create({ commit }, { project, description }) {
    const productsResponse = await ProductsService.createProject(
      project,
      description
    );
    commit("ADD_PRODUCT", productsResponse.data);
  },
};
