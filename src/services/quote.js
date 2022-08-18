import { getPost } from "../libs/http";

async function createQuoteRequest(productSupplierVariants) {
  const url = "/quote-request";
  const request = productSupplierVariants;
  const post = getPost(url, request);
  return await post();
}

const QuotesService = {
  createQuoteRequest,
};

export default QuotesService;
