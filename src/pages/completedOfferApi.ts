import { baseApi } from "../redux/api/baseApi";

export const createCompletedOfferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation for creating completed offer
    createCompletedOffer: builder.mutation({
      query: ({ clickId, offerId, userId, points }) => ({
        url: `/completedOffer/create-completedOffer`,
        method: "POST",
        params: {
          clickId: clickId,
          offerId: offerId,
          userId: userId,
          points: points,
        },
      }),
      invalidatesTags: ["completedOffer"],
    }),

    // Query for viewing completed offers by userId
    viewCompletedOffer: builder.query({
      query: (userId) => ({
        url: "/completedOffer",
        method: "GET",
        params: { userId }, // Sending userId as a query parameter
      }),
      providesTags: ["completedOffer"],
    }),
  }),
});

export const {
  useCreateCompletedOfferMutation,
  useViewCompletedOfferQuery,
} = createCompletedOfferApi;
