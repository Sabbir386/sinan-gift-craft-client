import { baseApi } from "../redux/api/baseApi";
export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    totalOffer: builder.query({
      query: () => ({
        url: "/offer",
        method: "GET",
      }),
    }),
    offerByNetwork: builder.query({
      query: () => ({
        url: "/offer/networks-with-offers/bynetwork",
        method: "GET",
      }),
    }),
    completedOffer: builder.query({
      query: () => ({
        url: "/completedOffer",
        method: "GET",
      }),
    }),
    loggedUserTotalCompletedOffer: builder.query({
      query: () => ({
        url: "/completedOffer/loggedIn-user-total-offer-counts",
        method: "GET",
      }),
    }),

    dateWiseCompletedOffer: builder.query({
      query: () => ({
        url: "/completedOffer/per-day-total-offer-count",
        method: "GET",
      }),
    }),
    dateAndOfferWiseCompletedOffer: builder.query({
      query: () => ({
        url: "/completedOffer/total-offer-counts",
        method: "GET",
      }),
    }),
    specificUserTotalOfferCounts: builder.query({
      query: () => ({
        url: "/completedOffer/specific-user-total-offer-counts",
        method: "GET",
      }),
    }),
    specificOfferTotalCounts: builder.query({
      query: () => ({
        url: "/completedOffer/specific-offer-total-counts",
        method: "GET",
      }),
    }),
    totalAdmin: builder.query({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
    }),
    totalUser: builder.query({
      query: () => ({
        url: "/normalUsers",
        method: "GET",
      }),
    }),
    totalAdvertiser: builder.query({
      query: () => ({
        url: "/advertisers",
        method: "GET",
      }),
    }),
    perDayCompletedOffer: builder.query({
      query: () => ({
        url: "/completedOffer/daily-offer-totals",
        method: "GET",
      }),
    }),
    loggedInUserDailycCompletedOfferCounts: builder.query({
      query: () => ({
        url: "/completedOffer/loggedIn-user-daily-completed-offer-counts",
        method: "GET",
      }),
    }),
    loggedInUserOfferNameandTotalCounts: builder.query({
      query: () => ({
        url: "/completedOffer/loggedIn-user-offer-name-counts",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useTotalOfferQuery,
  useCompletedOfferQuery,
  useTotalAdminQuery,
  useTotalUserQuery,
  useTotalAdvertiserQuery,
  useDateWiseCompletedOfferQuery,
  useDateAndOfferWiseCompletedOfferQuery,
  useSpecificUserTotalOfferCountsQuery,
  useSpecificOfferTotalCountsQuery,
  usePerDayCompletedOfferQuery,
  useLoggedUserTotalCompletedOfferQuery,
  useLoggedInUserDailycCompletedOfferCountsQuery,
  useLoggedInUserOfferNameandTotalCountsQuery,
  useOfferByNetworkQuery
} = dashboardApi;
