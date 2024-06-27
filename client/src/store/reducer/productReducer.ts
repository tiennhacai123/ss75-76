import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interface";
import { getProducts, updateQuantityProductList } from "../../services/product.service";

const state:Product[] = [];

const reducerProducts = createSlice({
    name:"reducerProducts",
    initialState:{
        products:state
    },
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(getProducts.pending,(state,action)=>{})
        .addCase(getProducts.fulfilled,(state,action)=>{
            // render list product
            state.products = action.payload
        })
        .addCase(getProducts.rejected,()=>{})
        // Cập nhật số lượng sản phẩm sau khi thêm vào giỏ hàng
        .addCase(updateQuantityProductList.fulfilled,(state,action)=>{
            const index = state.products.findIndex((product)=> product.id === action.payload.id)
            if(index !== -1){
                state.products[index] = action.payload
            }
        })
    },
})

export default reducerProducts.reducer