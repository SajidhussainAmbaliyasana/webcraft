import { baseApi } from "./baseApi";

export const pageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET ALL PAGES OF A WEBSITE
    getPages: builder.query({
      query: (websiteId) => ({
        url: `/website/${websiteId}/pages`,
        method: "GET",
      }),
      providesTags: (result, error, websiteId) => [
        { type: "Page", id: websiteId },
      ],
    }),

    // GET SINGLE PAGE
    getPage: builder.query({
      query: (pageId) => ({
        url: `/pages/${pageId}`,
        method: "GET",
      }),
      providesTags: (result, error, pageId) => [
        { type: "Page", id: pageId },
      ],
    }),

    // CREATE PAGE
    createPage: builder.mutation({
      query: (data) => ({
        url: "/pages/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Page", id: data.websiteId },
      ],
    }),

    // UPDATE PAGE
    updatePage: builder.mutation({
      query: ({ pageId, ...data }) => ({
        url: `/pages/${pageId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "Page", id: pageId },
      ],
    }),

    // DELETE PAGE
    deletePage: builder.mutation({
      query: (pageId) => ({
        url: `/pages/${pageId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [
        { type: "Page" },
      ],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetPagesQuery,
  useGetPageQuery,
  useCreatePageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
} = pageApi;