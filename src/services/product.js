import { getFetch, getPost, getDelete } from "../libs/http";

async function fetchProducts() {
  const url = "/products";
  const fetch = getFetch(url);
  return await fetch();
}

async function createProduct(description) {
  const url = "/products";

  const request = {
    description,
  };

  const post = getPost(url, request);
  return await post();
}

async function createProductVariantSupplier(productVariantId, supplierId) {
  const url = `/products/variant/supplier?variant=${productVariantId}&supplier=${supplierId}`;
  const post = getPost(url);
  return await post();
}

async function deleteProductVariantSupplier(supplierVariantId) {
  const url = `/products/variant/supplier?supplier_variant=${supplierVariantId}`;
  const remove = getDelete(url);
  return await remove();
}

const ProductsService = {
  fetchProducts,
  createProduct,
  createProductVariantSupplier,
  deleteProductVariantSupplier,
};

export default ProductsService;
