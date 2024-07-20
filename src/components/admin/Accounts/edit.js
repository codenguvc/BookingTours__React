import React from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { NavLink } from "react-router-dom";

const AccountEdit = () => {
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
                  <h1>Sửa tài khoản</h1>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="accountName" className="form-label">
                        Tên người dùng
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="accountName"
                        value=""
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
                        value=""
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
                        value=""
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        value=""
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">
                        Vai trò
                      </label>
                      <select
                        className="form-select"
                        id="role"
                        aria-label="Select role"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <NavLink type="submit" className="btn btn-primary" to="/system/account">
                      Sửa tài khoản
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

export default AccountEdit;
