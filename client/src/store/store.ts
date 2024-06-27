import { configureStore } from "@reduxjs/toolkit";
import reducerProducts from "./reducer/productReducer"
import reducerCarts from "./reducer/cartReducer";

const store:any = configureStore({
    reducer:{
        products:reducerProducts,
        carts:reducerCarts
    }
})

export default store