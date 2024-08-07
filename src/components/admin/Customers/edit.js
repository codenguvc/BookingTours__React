import React from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { NavLink } from "react-router-dom";

const CustomersEdit = () => {
  return (
    <div id="wrapper">
      <Sidebar />
      <div
        id="content-wrapper"
        className="d-flex flex-column"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="p-4 bg-white">
                  <h1>Sửa khách hàng</h1>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="customerName" className="form-label">
                       Tên khách hàng
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="customerName"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Địa chỉ
                      </label>
                      <textarea
                        className="form-control"
                        id="address"
                      />
                    </div>
                    <NavLink type="submit" className="btn btn-primary" to="/admin/customers">
                      Sửa khách hàng
                    </NavLink>
                    <NavLink className="btn btn-secondary ms-2" to="/admin/Customers">
                      Quay lại
                    </NavLink>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};


export default CustomersEdit;
