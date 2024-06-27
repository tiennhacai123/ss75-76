import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getCarts } from "../services/user.service";
import { Product } from "../interface";

export default function Cart() {
  // biến show modalDelete
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  // biến kiểm tra id xóa
  const [checkIdDelete, setCheckIdDelete] = useState<number>(0);
  const carts = useSelector((state: any) => {
    return state.carts.carts;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  // hàm lấy thông tin xóa
  const infomationDelete = (id: number) => {
    setShowModalDelete(true);
    setCheckIdDelete(id);
  };

  // hàm xác nhận xóa
  const handleDeleteJob = () => {
    dispatch(deleteProduct(checkIdDelete));
    setShowModalDelete(false);
  };
  return (
    <>
      <div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h1 className="panel-title">Your Cart</h1>
            </div>
            <div className="panel-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="my-cart-body">
                  {carts.map((item: Product, index: number) => (
                    <tr key={index}>
                      <th scope="row">
                        <img className="img-cart" src={item.image} alt="" />
                      </th>
                      <td>{item.name}</td>
                      <td>{item.price} USD</td>
                      <td>
                        <input
                          name="cart-item-quantity-1"
                          type="number"
                          defaultValue={item.quantity}
                          min={1}
                        />
                      </td>
                      <td>
                        <a
                          className="label label-info update-cart-item"
                          data-product=""
                        >
                          Update
                        </a>
                        <a
                          className="label label-danger delete-cart-item"
                          data-product=""
                          onClick={() => infomationDelete(item.id)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Modal xác nhận xóa */}
      {showModalDelete && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Xác nhận</h5>
              <i className="fas fa-xmark" />
            </div>
            <div className="modal-body-custom">
              <p>Bạn chắc chắn muốn xóa công việc này?</p>
            </div>
            <div className="modal-footer-footer">
              <button
                onClick={() => setShowModalDelete(false)}
                className="btn btn-light"
              >
                Hủy
              </button>
              <button onClick={handleDeleteJob} className="btn btn-danger">
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
