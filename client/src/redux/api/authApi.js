import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:"/user/login",
                method:"POST",
                body:data
            }),
        }),
        signup:builder.mutation({
            query:(data)=>({
                url:"/user/register",
                method:"POST",
                body:data
            })
        })
    }),
    overrideExisting:false,
});

export const {useLoginMutation,useSignupMutation} = authApi;