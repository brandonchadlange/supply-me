// import getUUID from "../utils/getUUID";

class QuoteRequestController {
  #products = [];

  get products() {
    return this.#products;
  }

  addProduct(data) {
    const product = new Product(data);
    this.#products.push(product);
    return product;
  }

  removeProduct(product) {
    const productIndex = this.#products.indexOf(product);
    this.#products.splice(productIndex, 1);
  }

  addSupplierToProduct(supplier, product) {
    product.addSupplier(supplier);
  }

  removeSupplierFromProduct(supplier, product) {
    product.removeSupplier(supplier);
  }
}

class Product {
  id = null;
  description = null;
  suppliers = [];

  constructor(data) {
    this.id = data.id;
    this.description = data.description;
    this.suppliers = data.suppliers || [];
  }

  addSupplier(supplier) {
    this.suppliers.push(supplier);
  }

  removeSupplier(supplier) {
    this.suppliers.splice(this.suppliers.indexOf(supplier), 1);
  }
}

export default QuoteRequestController;
