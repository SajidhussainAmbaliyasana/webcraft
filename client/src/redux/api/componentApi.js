import { baseApi } from "./baseApi";

export const componentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET COMPONENTS
    getComponents: builder.query({
      query: ({ pageId }) => ({
        url: `/pages/${pageId}/component`,
        method: "GET",
      }),
      transformResponse: (response) => response.components,
      providesTags: (result, error, { pageId }) => [
        { type: "Component", id: pageId },
      ],
    }),

    // CREATE COMPONENT
    addComponent: builder.mutation({
      query: ({ pageId, ...data }) => ({
        url: `/pages/${pageId}/component`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.component,
      invalidatesTags: (result, error, { pageId }) => [
        { type: "Component", id: pageId },
      ],
    }),

    // UPDATE COMPONENT
    updateComponent: builder.mutation({
      query: ({ pageId, componentId, ...data }) => ({
        url: `/pages/${pageId}/${componentId}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.component,
      invalidatesTags: (result, error, { pageId }) => [
        { type: "Component", id: pageId },
      ],
    }),

    // DELETE COMPONENT
    deleteComponent: builder.mutation({
      query: ({ pageId, componentId }) => ({
        url: `/pages/${pageId}/${componentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "Component", id: pageId },
      ],
    }),
    reorderComponents: builder.mutation({
      query: ({ pageId, order }) => ({
        url: `/pages/${pageId}/reorder`,
        method: "PUT",
        body: { order },
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "Component", id: pageId },
      ],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetComponentsQuery,
  useAddComponentMutation,
  useUpdateComponentMutation,
  useDeleteComponentMutation,
  useReorderComponentsMutation
} = componentApi;