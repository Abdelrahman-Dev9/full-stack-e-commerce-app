import { baseApi } from "./baseApi";

export const wishListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishList: builder.query({
      query: (userId) => ({
        url: "/getWishList",
        method: "POST",
        body: { userId },
      }),
    }),
    addToWishList: builder.mutation({
      query: ({ userId, productId }) => ({
        url: "/addToWishlist",
        method: "POST",
        body: { userId, productId },
      }),
    }),
    // removeFromWishList: builder.mutation({
    //     query: (id) => ({
    //         url: `/wishList/${id}`,
    //         method: "DELETE",
    //     }),
    // }),
  }),
});

export const { useAddToWishListMutation, useGetWishListQuery } = wishListApi;
