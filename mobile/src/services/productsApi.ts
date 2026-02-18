import { baseApi } from "./baseApi";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface CategoryWithProducts {
  id: string;
  name: string;
  icon: string;
  products: Product[];
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductsByCategory: builder.mutation<
      { message: string; products: CategoryWithProducts[] },
      { id: string }
    >({
      query: (body) => ({
        url: "getProductsByCategory",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetProductsByCategoryMutation } = productsApi;
