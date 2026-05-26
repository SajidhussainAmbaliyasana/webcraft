import {configureStore} from "@reduxjs/toolkit";

import {baseApi} from '../redux/api/baseApi';

import uiReducer from '../redux/slices/uiSlice';


export const store = configureStore({
    reducer:{
        ui:uiReducer,
        [baseApi.reducerPath]:baseApi.reducer
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    
});