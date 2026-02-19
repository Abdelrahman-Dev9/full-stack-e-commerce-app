import { baseApi } from "./baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ userId, productId }) => ({
        url: "/addProductToCart",
        method: "POST",
        body: { userId, productId },
      }),
    }),
  }),
});

export const { useAddToCartMutation } = cartApi;
