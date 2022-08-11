import axios from "axios";

async function fetchSuppliers() {
  const retval = {
    hasError: false,
    error: null,
    suppliers: null,
  };

  try {
    const supplierResponse = await axios.get("/suppliers");
    retval.suppliers = supplierResponse.data;
  } catch (err) {
    retval.hasError = true;
    retval.error = err.response.message;
  }

  return retval;
}

async function createSupplier(name, websiteUrl, project) {
  const retval = {
    hasError: false,
    error: null,
  };

  const body = {
    name,
    websiteUrl,
  };

  try {
    await axios.post(`/suppliers?project=${project}`, body);
  } catch (err) {
    retval.hasError = true;
    retval.error = err.response.message;
  }

  return retval;
}

const SupplierService = {
  fetchSuppliers,
  createSupplier,
};

export default SupplierService;
