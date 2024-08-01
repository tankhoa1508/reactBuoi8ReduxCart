import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./cartSlice";

const initialState={
    cats:[],
    currentPage:1,
    status:"start",
    error:"",
    totalPage:30
}

const url="https://66a07c047053166bcabb90c1.mockapi.io/student"
export const fetchCats=createAsyncThunk('cats/fetchCats', async(page)=>{
    const res= await axios.get(`${url}?page=${page}&&limit=5`)
    return res.data
})

export const deleteCat=createAsyncThunk("cats/deleteCat",async(id)=>{
    await axios.delete(url+"/"+id)
    return id;
})
export const addNewCat=createAsyncThunk("cats/addNewCat", async(cat)=>{
    const res = await axios.post(url, cat)
    return res.data
})
const catsSlice=createSlice({
    name:"cats",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCats.pending,state=>{
            state.status="loading"
        })
        .addCase(fetchCats.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.cats=action.payload
        })
        .addCase(fetchCats.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
        })
        .addCase(deleteCat.fulfilled,(state,action)=>{
            state.cats=state.cats.filter(item=>item.id !==action.payload)
        })
        .addCase(addNewCat.fulfilled,(state,action)=>{
            state.cats=[...state.cats,action.payload]
        })
        .addCase(reCheckCat.fulfilled,(state,action)=>{
            state.cats=state.cats.map(item=>item.id === action.payload.id? {...item,checked:!item.checked} : item)
        })
    }
})

export default catsSlice.reducer;