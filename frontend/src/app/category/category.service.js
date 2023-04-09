import { api } from "../api/apiSlice";

export const categoryApi = api.injectEndpoints({

    endpoints: (build) => ({
        getCategories: build.query({
            query: () => 'category',
            keepUnusedDataFor: 2 * 60,
        })
    })
})

export const { useGetCategoriesQuery } = categoryApi;