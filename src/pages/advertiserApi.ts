import { baseApi } from "../redux/api/baseApi";
export const createAdvertiserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdvertiser: builder.mutation({
      query: (advertiserInfo) => ({
        url: "/users/create-advertiser/",
        method: "POST",
        body: advertiserInfo,
      }),
      invalidatesTags: ["advertiser"],
    }),
    viewAdvertiser: builder.query({
      query: () => ({
        url: "/advertisers/",
        method: "GET",
      }),
      providesTags: ["advertiser"],
    }),
    deleteAdvertiser: builder.mutation({
      query: (id) => ({
        url: `/advertisers/${id}`, 
        method: "DELETE",
      }),
      invalidatesTags: ['advertiser'], 
    }),
    singleAdvertiser: builder.query({
      query: (id) => ({
        url: `/advertisers/${id}`, 
        method: "GET",
      }),
      providesTags: ['advertiser'], 
    }),
    updateAdvertiser: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/advertisers/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["advertiser"],
    }),
  }),
});

export const { useCreateAdvertiserMutation, useViewAdvertiserQuery,useDeleteAdvertiserMutation,useUpdateAdvertiserMutation,useSingleAdvertiserQuery } =
  createAdvertiserApi;
