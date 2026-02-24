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
    getAddress: builder.query<any, string>({
      query: (token) => ({
        url: "/auth/getAddress",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Address"],
    }),
  }),
});

export const { useCreateAddressMutation, useGetAddressQuery } = addressApi;
