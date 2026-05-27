import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/user/login",
                method: "POST",
                body: data
            }),
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: "/user/register",
                method: "POST",
                body: data
            })
        }),
        me: builder.query({
            query: () => ({
                url: "/user/me",
                method: "POST"
            })
        }),
        getStats: builder.query({
            query:()=>({
                url:"/user/stats",
                method:"POST"
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:"/user/logout",
                method:"POST"
            })
        })
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation, useMeQuery ,useGetStatsQuery,useLogoutMutation} = authApi;