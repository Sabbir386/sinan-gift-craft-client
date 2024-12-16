import { baseApi } from "../redux/api/baseApi";

export const createOfferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOffer: builder.mutation({
      query: (giftInfo) => ({
        url: "/offer/create-offer",
        method: "POST",
        body: giftInfo,
      }),
      invalidatesTags: ['Offer'],
    }),
    viewOffer: builder.query({
      query: ({ offerStatus, device, country }) => {
        const params = new URLSearchParams();
        if (offerStatus) params.append('offerStatus', offerStatus);
        if (device) params.append('device', device);
        if (country) params.append('country', country);

        return {
          url: `/offer?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ['Offer'],
    }),
    deleteOffer: builder.mutation({
      query: (id) => ({
        url: `/offer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Offer'],
    }),
    singleOffer: builder.query({
      query: (id) => ({
        url: `/offer/${id}`,
        method: "GET",
      }),
      providesTags: ['Offer'],
    }),
    updateOffer: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/offer/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ['Offer'],
    }),
    toggleOfferStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/offer/toggle-status/${id}`,
        method: "PUT",
        body: {
        },
      }),
      invalidatesTags: ['Offer'],
    }),
  }),
});

export const {
  useCreateOfferMutation,
  useViewOfferQuery,
  useDeleteOfferMutation,
  useSingleOfferQuery,
  useUpdateOfferMutation,
  useToggleOfferStatusMutation,

} = createOfferApi;
