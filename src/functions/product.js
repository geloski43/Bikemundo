import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post("https://guarded-everglades-60016.herokuapp.com/api/product", product, {
    headers: {
      authtoken,
    },
  });

export const getProductsByCount = async (count) =>
  await axios.get(`https://guarded-everglades-60016.herokuapp.com/api/products/${count}`);

export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`https://guarded-everglades-60016.herokuapp.com/api/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const getProduct = async (slug) =>
  await axios.get(`https://guarded-everglades-60016.herokuapp.com/api/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`https://guarded-everglades-60016.herokuapp.com/api/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const getProducts = async (sort, order, page) =>
  await axios.post("https://guarded-everglades-60016.herokuapp.com/api/products", {
    sort,
    order,
    page,
  });

export const getProductsCount = async () =>
  await axios.get("https://guarded-everglades-60016.herokuapp.com/api/products/total");

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `https://guarded-everglades-60016.herokuapp.com/api/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );
export const productReview = async (productId, review, authtoken) =>
  await axios.put(
    `https://guarded-everglades-60016.herokuapp.com/api/product/review/${productId}`,
    { review },
    {
      headers: {
        authtoken,
      },
    }
  );
export const getRelated = async (productId) =>
  await axios.get(`https://guarded-everglades-60016.herokuapp.com/api/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post("https://guarded-everglades-60016.herokuapp.com/api/search/filters", arg);
