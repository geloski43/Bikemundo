import axios from "axios";

export const getCategories = async () =>
  await axios.get("https://guarded-everglades-60016.herokuapp.com/api/categories");

export const getCategory = async (slug) =>
  await axios.get(`https://guarded-everglades-60016.herokuapp.com/api/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`https://guarded-everglades-60016.herokuapp.com/api/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`https://guarded-everglades-60016.herokuapp.com/api/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });

export const createCategory = async (category, authtoken) =>
  await axios.post("https://guarded-everglades-60016.herokuapp.com/api/category", category, {
    headers: {
      authtoken,
    },
  });

export const getCategorySubs = async (_id) =>
  await axios.get(`https://guarded-everglades-60016.herokuapp.com/api/category/subs/${_id}`);
