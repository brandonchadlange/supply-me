import { getFetch, getPost } from "../libs/http";

async function fetchSuppliers() {
  const url = "/suppliers";
  const fetch = getFetch(url);
  return await fetch();
}

async function createSupplier(supplier) {
  const url = `/suppliers`;

  const request = supplier;

  const post = getPost(url, request);
  return await post();
}

const SupplierService = {
  fetchSuppliers,
  createSupplier,
};

export default SupplierService;
