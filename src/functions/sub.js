import axios from "axios";

export const getSubs = async () =>
  await axios.get("https://guarded-everglades-60016.herokuapp.com/api/subs");

export const getSub = async (slug) =>
  await axios.get(`https://guarded-everglades-60016.herokuapp.com/api/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`https://guarded-everglades-60016.herokuapp.com/api/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`https://guarded-everglades-60016.herokuapp.com/api/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const createSub = async (sub, authtoken) =>
  await axios.post("https://guarded-everglades-60016.herokuapp.com/api/sub", sub, {
    headers: {
      authtoken,
    },
  });
