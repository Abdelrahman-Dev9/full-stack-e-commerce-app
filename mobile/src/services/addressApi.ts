// services/addressApi.ts
import { baseApi } from "./baseApi";

export const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation({
      query: ({
        token,
        ...body
      }: {
        phone: string;
        city: string;
        area: string;
        street: string;
        building: string;
        floor: string;
        apartment: string;
        notes: string;
        isDefault: boolean;
        token: string;
      }) => ({
        url: "/auth/createAddress",
        method: "POST",
        body, // all API fields
        headers: {
          Authorization: `Bearer ${token}`, // token goes in headers
        },
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const { useCreateAddressMutation } = addressApi;
