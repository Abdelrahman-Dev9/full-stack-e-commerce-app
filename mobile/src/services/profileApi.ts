import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (token) => ({
        url: "/auth/profile",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    uploadUserImage: builder.mutation<
      { success: boolean; avatarUrl: string },
      { userId: string; image: { uri: string; type: string; name: string } }
    >({
      query: ({ userId, image }) => {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("image", {
          uri: image.uri,
          name: image.name,
          type: image.type,
        } as any);

        return {
          url: "/auth/uploadUserImage",
          method: "PUT",
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetProfileQuery, useUploadUserImageMutation } = profileApi;
