import { createSlice } from "@reduxjs/toolkit";
// import { ForInitializer } from "typescript";

interface IInitialState {
    accessToken:string;
    isLogin:boolean;
    user:any;
}

const initialState: IInitialState = {
    accessToken: "",
    isLogin: false,
    user: {}, 
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state, action) =>{
            state.accessToken = action.payload.accessToken;
            state.isLogin = true;
            state.user = action.payload.user;    
        },
    }
});

export const {login} = authSlice.actions;
export default authSlice.reducer;