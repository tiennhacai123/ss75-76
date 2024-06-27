import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getCarts:any = createAsyncThunk("carts/getCarts",
    async ()=>{
        const response = await axios.get("http://localhost:8080/carts")
        return response.data
    }
)
export const addToCart:any = createAsyncThunk("carts/ addToCart",
    async (product)=>{
        const response = await axios.post("http://localhost:8080/carts",product)
        return response.data
    }
)
export const deleteProduct:any = createAsyncThunk("carts/deleteCart",
    async (id)=>{
        await axios.delete(`http://localhost:8080/carts/${id}`)
        return id
    }
)