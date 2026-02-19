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
    getCart: builder.mutation({
      query: ({ userId }) => ({
        url: "/getCartProducts",
        method: "POST",
        body: { userId },
      }),
    }),
  }),
});

export const { useAddToCartMutation, useGetCartMutation } = cartApi;
