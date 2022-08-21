import { getFetch, getPost } from "../libs/http";

async function getQuoteRequests() {
  return await getFetch("/quote-request")();
}

async function createQuoteRequest(reference, productSupplierVariants) {
  const url = "/quote-request";
  const request = {
    reference,
    productSupplierVariants
  };
  const post = getPost(url, request);
  return await post();
}

const QuotesService = {
  getQuoteRequests,
  createQuoteRequest,
};

export default QuotesService;
