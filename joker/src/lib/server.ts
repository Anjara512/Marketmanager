"use server";

import { API } from "./cappApi";

export const getProducts = async () => {
  const token = localStorage.getItem("token");
  const response = await API.get("/user/getProduct", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response) {
    throw new Error("failled to fetch product");
  }

  const product = response.data;

  return product;
};
