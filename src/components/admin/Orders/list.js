import React, { useState } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { BiTrash } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const mockOrder = [
  {
    id: 1,
    name: "John",
    email: "john@email.com",
    date: "23-7-2023",
    total: "12000đ",
    status: "Đã đặt hàng",
    tour: "Cần Thơ",
  },
  {
    id: 2,
    name: "Jane",
    email: "jane@email.com",
    date: "24-7-2023",
    total: "15000đ",
    status: "Đang xử lý",
    tour: "Hà Nội",
  },
  {
    id: 3,
    name: "Alice",
    email: "alice@email.com",
    date: "25-7-2023",
    total: "10000đ",
    status: "Đã xử lý",
    tour: "Hồ Chí Minh",
  },
  {
    id: 4,
    name: "Bob",
    email: "bob@email.com",
    date: "26-7-2023",
    total: "20000đ",
    status: "Đã hủy",
    tour: "Đà Nẵng",
  },
  {
    id: 5,
    name: "Charlie",
    email: "charlie@email.com",
    date: "27-7-2023",
    total: "18000đ",
    status: "Đã đặt hàng",
    tour: "Nha Trang",
  },
  {
    id: 6,
    name: "David",
    email: "david@email.com",
    date: "28-7-2023",
    total: "22000đ",
    status: "Đang xử lý",
    tour: "Huế",
  },
  {
    id: 7,
    name: "Eve",
    email: "eve@email.com",
    date: "29-7-2023",
    total: "14000đ",
    status: "Đã xử lý",
    tour: "Hạ Long",
  },
  {
    id: 8,
    name: "Frank",
    email: "frank@email.com",
    date: "30-7-2023",
    total: "16000đ",
    status: "Đã hủy",
    tour: "Phú Quốc",
  },
  {
    id: 9,
    name: "Grace",
    email: "grace@email.com",
    date: "31-7-2023",
    total: "13000đ",
    status: "Đã đặt hàng",
    tour: "Sapa",
  },
  {
    id: 10,
    name: "Hank",
    email: "hank@email.com",
    date: "1-8-2023",
    total: "19000đ",
    status: "Đang xử lý",
    tour: "Đà Lạt",
  },
  {
    id: 11,
    name: "Ivy",
    email: "ivy@email.com",
    date: "2-8-2023",
    total: "11000đ",
    status: "Đã xử lý",
    tour: "Vũng Tàu",
  },
  {
    id: 12,
    name: "Jack",
    email: "jack@email.com",
    date: "3-8-2023",
    total: "25000đ",
    status: "Đã hủy",
    tour: "Quy Nhơn",
  },
];

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockOrder.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mockOrder.length / itemsPerPage);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    renderPageNumbers.push(
      <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
        <a className="page-link" id={i} onClick={handleClick} href="#">
          {i}
        </a>
      </li>
    );
  }

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
                <div className="rounded h-100 p-4 bg-white">
                  <h6 className="mb-4">Đơn hàng</h6>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tên Khách Hàng</th>
                          <th scope="col">Email</th>
                          <th scope="col">Chuyến đi</th>
                          <th scope="col">Ngày Đặt Hàng</th>
                          <th scope="col">Tổng Số Tiền</th>
                          <th scope="col">Trạng Thái</th>
                          <th scope="col">Hành Động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((order) => (
                          <tr key={order.id}>
                            <th scope="row">{order.id}</th>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.tour}</td>
                            <td>{order.date}</td>
                            <td>{order.total}</td>
                            <td>
                              <select
                                className="form-select"
                                defaultValue={order.status}
                              >
                                <option value="Chờ xử lý">Chờ xử lý</option>
                                <option value="Đã xử lý">Đã xử lý</option>
                                <option value="Đã hủy">Đã hủy</option>
                              </select>
                            </td>
                            <td>
                              <div className="btn btn-warning me-1">
                                Cập nhật
                              </div>
                              <NavLink
                                className="btn btn-danger btn-sm ms-1"
                                to="/system/orders/delete"
                              >
                                <BiTrash size={25} color="white" />
                              </NavLink>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="container-fluid">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                          <li
                            className={`page-item ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                          >
                            <a
                              className="page-link"
                              href="#"
                              aria-label="Previous"
                              onClick={handlePrevPage}
                            >
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>
                          {renderPageNumbers}
                          <li
                            className={`page-item ${
                              currentPage === totalPages ? "disabled" : ""
                            }`}
                          >
                            <a
                              className="page-link"
                              href="#"
                              aria-label="Next"
                              onClick={handleNextPage}
                            >
                              <span aria-hidden="true">&raquo;</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
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

export default OrderList;
