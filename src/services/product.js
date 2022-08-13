import { getFetch, getPost } from "../libs/http";

async function fetchProducts(project = 1) {
  const url = "/products?project=" + project;
  const fetch = getFetch(url);
  return await fetch();
}

async function createProject(project = 1, description) {
  const url = "/products?project=" + project;

  const request = {
    description,
  };

  const post = getPost(url, request);
  return await post();
}

const ProductsService = {
  fetchProducts,
  createProject,
};

export default ProductsService;
