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

const SupplierService = {
  fetchSuppliers,
};

export default SupplierService;
