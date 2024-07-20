import React, { useState } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { BiPlus, BiPencil, BiTrash } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const mockAccounts = [
  { id: 1, username: "John", email: "john@email.com", phone: "1234567890", address: "USA", role: "user", avatar: "/assets/admin/img/avt-removebg-preview (2).png" },
  { id: 2, username: "Jane", email: "jane@email.com", phone: "2345678901", address: "UK", role: "admin", avatar: "/assets/admin/img/avt-removebg-preview (2).png" },
  { id: 3, username: "Doe", email: "doe@email.com", phone: "3456789012", address: "Canada", role: "user", avatar: "/assets/admin/img/avt-removebg-preview (2).png" },
  { id: 4, username: "Smith", email: "smith@email.com", phone: "4567890123", address: "Australia", role: "admin", avatar: "/assets/admin/img/avt-removebg-preview (2).png" },
  { id: 5, username: "Emily", email: "emily@email.com", phone: "5678901234", address: "New Zealand", role: "user", avatar: "/assets/admin/img/avt-removebg-preview (2).png" },
  { id: 6, username: "Michael", email: "michael@email.com", phone: "6789012345", address: "India", role: "user", avatar: "/assets/admin/img/avt-removebg-preview (2).png" },
  { id: 7, username: "Sarah", email: "sarah@email.com", phone: "7890123456", address: "Germany", role: "admin", avatar: "/assets/admin/img/avt-removebg-preview (2).png" },
  { id: 8, username: "David", email: "david@email.com", phone: "8901234567", address: "France", role: "user", avatar: "/assets/admin/img/avt-removebg-preview (2).png" },
  { id: 9, username: "Anna", email: "anna@email.com", phone: "9012345678", address: "Italy", role: "user", avatar: "/assets/admin/img/avt-removebg-preview (2).png" },
  { id: 10, username: "Tom", email: "tom@email.com", phone: "0123456789", address: "Spain", role: "admin", avatar: "/assets/admin/img/avt-removebg-preview (2).png" },
  { id: 11, username: "Alice", email: "alice@email.com", phone: "1234509876", address: "Portugal", role: "user", avatar: "/assets/admin/img/avt-removebg-preview (2).png" },
];

const AccountList = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockAccounts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mockAccounts.length / itemsPerPage);

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
                  <h6 className="mb-4">Tài khoản</h6>
             
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Avatar</th>
                          <th scope="col">Tên người dùng</th>
                          <th scope="col">Email</th>
                          <th scope="col">Số điện thoại</th>
                          <th scope="col">Địa chỉ</th>
                          <th scope="col">Vai trò</th>
                          <th scope="col">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((account) => (
                          <tr key={account.id}>
                            <th scope="row">{account.id}</th>
                            <td>
                              <img
                                src={account.avatar}
                                alt={account.username}
                                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                              />
                            </td>
                            <td>{account.username}</td>
                            <td>{account.email}</td>
                            <td>{account.phone}</td>
                            <td>{account.address}</td>
                            <td>{account.role}</td>
                            <td>
                              <NavLink
                                className="btn btn-warning btn-sm me-2"
                                to={`/system/account/edit`}
                              >
                                <BiPencil size={25} color="white" />
                              </NavLink>
                              <NavLink
                                className="btn btn-danger btn-sm"
                                to={`/system/account/delete/${account.id}`}
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
                          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <a className="page-link" href="#" aria-label="Previous" onClick={handlePrevPage}>
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>
                          {renderPageNumbers}
                          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <a className="page-link" href="#" aria-label="Next" onClick={handleNextPage}>
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

export default AccountList;
