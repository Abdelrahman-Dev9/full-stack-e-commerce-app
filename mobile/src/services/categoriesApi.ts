import { baseApi } from "./baseApi";
export type Category = {
  id: string;
  name: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/getCategories",
        method: "GET",
      }),
      transformResponse: (response: {
        message: string;
        categories: Category[];
      }) => response.categories, // return only the array
    }),
  }),
});

export const { useGetCategoriesQuery } = authApi;
