import { baseApi } from "../redux/api/baseApi";

export const createNetworkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNetwork: builder.mutation({
      query: (networkInfo) => ({
        url: "/network/create-network/",
        method: "POST",
        body: networkInfo,
      }),
      invalidatesTags: ["network"],
    }),
    viewNetwork: builder.query({
      query: () => ({
        url: "/network/",
        method: "GET",
      }),
      providesTags: ["network"],
    }),
    getSingleNetwork: builder.query({
      query: (id) => ({
        url: `/network/${id}`,
        method: "GET",
      }),
      providesTags: ["network"],
    }),
    updateNetwork: builder.mutation({
      query: ({ id, ...networkInfo }) => ({
        url: `/network/${id}/`,
        method: "PUT",
        body: networkInfo,
      }),
      invalidatesTags: ["network"],
    }),
    deleteNetwork: builder.mutation({
      query: (id) => ({
        url: `/network/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["network"],
    }),
  }),
});

export const {
  useCreateNetworkMutation,
  useViewNetworkQuery,
  useGetSingleNetworkQuery,
  useUpdateNetworkMutation,
  useDeleteNetworkMutation,
} = createNetworkApi;
