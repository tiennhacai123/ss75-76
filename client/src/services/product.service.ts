import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts:any = createAsyncThunk("products/getproducts",
    async ()=>{
        const response = await axios.get("http://localhost:8080/products")
        return response.data
    }
)
export const updateQuantityProductList:any = createAsyncThunk("products/updateQuantityProductList",
    async ({ id, quantity }: { id: number; quantity: number })=>{
        const response = await axios.patch(`http://localhost:8080/products/${id}`,{quantity})
        return response.data
    }
)