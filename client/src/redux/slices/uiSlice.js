import {createSlice} from '@reduxjs/toolkit';

const initialState= {
    open:false,
    message:"",
    severity:"info"
};

const uiSlice = createSlice({
    name:"ui",
    initialState,
    reducers:{
        showSnackbar:(state,action)=>{
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        hideSnackbar:(state)=>{
            state.open = false;
            state.message = "";
            state.severity="";
        }

    }
});


export const {showSnackbar,hideSnackbar} = uiSlice.actions;
export const selectSnackbar = (state) => state.ui;
export default uiSlice.reducer;

