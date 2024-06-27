import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  updateQuantityProductList,
} from "../services/product.service";
import { Product } from "../interface";
import { addToCart, getCarts } from "../services/user.service";

export default function ListProduct() {
  // cập nhật số lượng sản phẩm thêm vào giỏ hàng
  const [valueQuantity, setValueQuantity] = useState<any>(0);
  // kiểm tra số lượng sản phẩm thêm vào có thảo mãn
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  // Logic product
  const products = useSelector((state: any) => {
    return state.products.products;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Logic carts
  const carts = useSelector((state: any) => {
    return state.carts.carts;
  });

  const dispatchCart = useDispatch();

  useEffect(() => {
    dispatchCart(getCarts());
  }, [dispatchCart]);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addNewProduct = (id: number) => {
    if (valueQuantity <= 0) {
      setShowModalAdd(true);
      return;
    }
    const newProduct = products.find((item: Product) => item.id === id);

    const pushProduct = {
      ...newProduct,
      id: carts.length + 1,
      quantity: valueQuantity,
    };

    const quantityChangeProduct = products.find(
      (item: Product) => item.id === id
    );

    dispatch(addToCart(pushProduct));
    dispatch(
      updateQuantityProductList({
        id: quantityChangeProduct.id,
        quantity: quantityChangeProduct.quantity - valueQuantity,
      })
    );
    setValueQuantity(0);
  };
  // Hàm cập nhật số lượng muốn thêm vảo giỏ hàng
  const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueQuantity(e.target.value);
  };

  return (
    <div>
      <div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1 className="panel-title">List Products</h1>
            </div>
            <div className="panel-body" id="list-product">
              {products.map((item: Product, index: number) => (
                <div key={index}>
                  <div className="media product">
                    <div className="media-left">
                      <a href="#">
                        <img
                          className="media-object"
                          src={item.image}
                          alt="pizza"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">{item.name}</h4>
                      <p>{item.description}</p>
                      <b>Total:{item.quantity}</b>
                      <input
                        name="quantity-product-1"
                        type="number"
                        defaultValue={0}
                        onChange={updateQuantity}
                      />
                      <p>Price: $ {item.price}</p>
                      {item.quantity > 0 ? (
                        <span
                          style={{ backgroundColor: "blue" }}
                          className="price"
                          onClick={() => addNewProduct(item.id)}
                        >
                          Add to cart
                        </span>
                      ) : (
                        <span className="price">Add to cart</span>
                      )}
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
