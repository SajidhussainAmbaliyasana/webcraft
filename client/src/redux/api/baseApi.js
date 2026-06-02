import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5050/api",
        credentials:"include"
    }),
    tagTypes:["Website","Page","Component"],

    endpoints: ()=> ({}),
});