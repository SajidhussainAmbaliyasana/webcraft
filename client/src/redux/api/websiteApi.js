import { baseApi } from "./baseApi";

export const websiteApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL WEBSITES
        getWebsites: builder.query({
            query: () => ({
                url: "/website/fetch",
                method: "POST",
            }),
            providesTags: ["Website"],
        }),

        // GET SINGLE WEBSITE
        getWebsite: builder.query({
            query: (id) => ({
                url: `/website/${id}`,
                method: "POST",
            }),
            providesTags: (result, error, id) => [
                { type: "Website", id }
            ],
        }),

        // CREATE WEBSITE
        createWebsite: builder.mutation({
            query: (data) => ({
                url: "/website/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Website"],
        }),

        // UPDATE WEBSITE
        updateWebsite: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/website/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Website", id },
                "Website",
            ],
        }),

        // DELETE WEBSITE
        deleteWebsite: builder.mutation({
            query: (id) => ({
                url: `/website/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Website"],
        }),

        // TOGGLE WEBSITE VISIBILITY
        publishWebsite: builder.mutation({
            query: (id) => ({
                url: `/website/${id}/visibility`,
                method: "PATCH",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Website", id },
                "Website",
            ],
        }),

        getPublicSite: builder.query({
            query: (subdomain) => ({
                url: `/website/public/${subdomain}`,
                method: "GET",
            }),
        }),

        getPublicPage: builder.query({
            query: ({ subdomain, pageSlug }) => ({
                url: `/website/public/${subdomain}/${pageSlug}`,
                method: "GET",
            }),
        }),

    }),
    overrideExisting: false,
});

export const {
    useGetWebsitesQuery,
    useGetWebsiteQuery,
    useCreateWebsiteMutation,
    useUpdateWebsiteMutation,
    useDeleteWebsiteMutation,
    usePublishWebsiteMutation,
    useGetPublicPageQuery,
    useGetPublicSiteQuery
} = websiteApi;