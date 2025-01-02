import { baseApi } from "../../redux/api/baseApi";


export const subCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSubCategory: builder.mutation({
            query: (subCategoryInfo) => ({
                url: "/subCategory/create-subcategory",
                method: "POST",
                body: subCategoryInfo,
            }),
            invalidatesTags: ["subCategory"],
        }),
        viewSubCategories: builder.query({
            query: () => ({
                url: "/subCategory",
                method: "GET",
            }),
            providesTags: ["subCategory"],
        }),
        deleteSubCategory: builder.mutation({
            query: (id) => ({
                url: `/subCategory/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["subCategory"],
        }),
        singleSubCategory: builder.query({
            query: (id) => ({
                url: `/subCategory/${id}`,
                method: "GET",
            }),
            providesTags: ["subCategory"],
        }),
        updateSubCategory: builder.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `/subCategory/${id}`,
                method: "PUT",
                body: updatedData,
            }),
            invalidatesTags: ["subCategory"],
        }),
    }),
});

export const {
    useCreateSubCategoryMutation,
    useViewSubCategoriesQuery,
    useDeleteSubCategoryMutation,
    useUpdateSubCategoryMutation,
    useSingleSubCategoryQuery,
} = subCategoryApi;