import { baseApi } from "../redux/api/baseApi";

export const surveyWallApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFilteredSurveys: builder.query({
      query: ({ networkName }) => {
        const params = new URLSearchParams();
        if (networkName) params.append('networkName', networkName);
        return {
          url: `/offer/surveyWall/networks-offers-filter-by-survey-wall?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ['SurveyWall'],
    }),
  }),
});

export const {
  useGetFilteredSurveysQuery,
} = surveyWallApi;
