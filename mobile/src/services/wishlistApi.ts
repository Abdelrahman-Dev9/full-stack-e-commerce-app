import { baseApi } from "./baseApi";

export const wishListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishList: builder.query({
      query: (userId) => ({
        url: "/getWishList",
        method: "POST",
        body: { userId },
      }),
      providesTags: ["Wishlist"],
    }),
    addToWishList: builder.mutation({
      query: ({ userId, productId }) => ({
        url: "/addToWishlist",
        method: "POST",
        body: { userId, productId },
      }),
    }),
    removeFromWishList: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `/deleteFromWishlist`,
        method: "DELETE",
        body: { userId, productId },
      }),
    }),
  }),
});

export const {
  useAddToWishListMutation,
  useGetWishListQuery,
  useRemoveFromWishListMutation,
} = wishListApi;
