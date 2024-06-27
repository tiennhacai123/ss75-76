import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interface";
import { addToCart, deleteProduct, getCarts } from "../../services/user.service";

const state:Product[] = [];

const reducerCarts = createSlice({
    name:"reducerCarts",
    initialState:{
        carts:state
    },
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(getCarts.pending,(state,action)=>{})
        // render Carts
        .addCase(getCarts.fulfilled,(state,action)=>{
            state.carts = action.payload
        })
        .addCase(getCarts.rejected,()=>{})
        // hàm thêm sản phẩm
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.carts.push(action.payload)
        })
        // Hàm xóa sản phẩm khỏi giỏ hàng
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.carts = state.carts.filter((product)=> product.id !== action.payload)
        })
    },
})

export default reducerCarts.reducer