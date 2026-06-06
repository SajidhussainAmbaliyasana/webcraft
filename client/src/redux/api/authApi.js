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
            query: () => ({
                url: "/user/stats",
                method: "POST"
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/user/logout",
                method: "POST"
            })
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/user/update",
                method: "PATCH",
                body: data
            })
        }),

        updatePassword: builder.mutation({
            query: (data) => ({
                url: "/user/password",
                method: "PATCH",
                body: data
            })
        }),

        deleteAccount: builder.mutation({
            query: () => ({
                url: "/user/remove",
                method: "DELETE"
            })
        }),
        createCheckoutSession: builder.mutation({
            query: (data) => ({
                url: "/payment/create-checkout-session",
                method: "POST",
                body: data
            })
        }),
        verifyPayment: builder.mutation({
            query: (data) => ({
                url: "/payment/verify-payment",
                method: "POST",
                body: data
            })
        }),

    }),
    overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation, useMeQuery, useGetStatsQuery, useLogoutMutation, useUpdateProfileMutation, useUpdatePasswordMutation, useDeleteAccountMutation, useCreateCheckoutSessionMutation,useVerifyPaymentMutation } = authApi;