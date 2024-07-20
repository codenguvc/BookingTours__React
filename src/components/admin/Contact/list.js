import React, { useState } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { BiTrash } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const mockContact = [
  { id: 1, firstName: "Lê", lastName: "John", email: "john@email.com", phone: "1234567890", address: "USA", date: "24-7-2023", status: "Đang chờ xử lý" },
  { id: 2, firstName: "Nguyễn", lastName: "Jane", email: "jane@email.com", phone: "2345678901", address: "Vietnam", date: "25-7-2023", status: "Đã liên hệ" },
  { id: 3, firstName: "Trần", lastName: "Alice", email: "alice@email.com", phone: "3456789012", address: "Canada", date: "26-7-2023", status: "Đã bỏ qua" },
  { id: 4, firstName: "Hoàng", lastName: "Bob", email: "bob@email.com", phone: "4567890123", address: "UK", date: "27-7-2023", status: "Đang chờ xử lý" },
  { id: 5, firstName: "Lâm", lastName: "Charlie", email: "charlie@email.com", phone: "5678901234", address: "Australia", date: "28-7-2023", status: "Đã liên hệ" },
  { id: 6, firstName: "Hồ", lastName: "David", email: "david@email.com", phone: "6789012345", address: "Germany", date: "29-7-2023", status: "Đã bỏ qua" },
  { id: 7, firstName: "Bùi", lastName: "Eve", email: "eve@email.com", phone: "7890123456", address: "France", date: "30-7-2023", status: "Đang chờ xử lý" },
  { id: 8, firstName: "Phan", lastName: "Frank", email: "frank@email.com", phone: "8901234567", address: "Italy", date: "31-7-2023", status: "Đã liên hệ" },
  { id: 9, firstName: "Vũ", lastName: "Grace", email: "grace@email.com", phone: "9012345678", address: "Spain", date: "1-8-2023", status: "Đã bỏ qua" },
  { id: 10, firstName: "Đặng", lastName: "Hank", email: "hank@email.com", phone: "0123456789", address: "Portugal", date: "2-8-2023", status: "Đang chờ xử lý" },
  { id: 11, firstName: "Lý", lastName: "Ivy", email: "ivy@email.com", phone: "1234567891", address: "Brazil", date: "3-8-2023", status: "Đã liên hệ" },
  { id: 12, firstName: "Lưu", lastName: "Jack", email: "jack@email.com", phone: "2345678902", address: "Mexico", date: "4-8-2023", status: "Đã bỏ qua" }
];


const ContactList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockContact.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mockContact.length / itemsPerPage);

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
            <div class="row">
              <div class="col-12">
                <div class=" rounded h-100 p-4 bg-white">
                  <h6 class="mb-4">Liên hệ</h6>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Họ</th>
                          <th scope="col">Tên</th>
                          <th scope="col">Email</th>
                          <th scope="col">Số điện thoại</th>
                          <th scope="col">Địa chỉ</th>
                          <th scope="col">Ngày liên hệ</th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                      {currentItems.map((contact) => (
                        <tr key={contact.id}>
                          <th scope="row">{contact.id}</th>
                          <td>{contact.firstName}</td>
                          <td>{contact.lastName}</td>
                          <td>{contact.email}</td>
                          <td>{contact.phone}</td>
                          <td>{contact.address}</td>
                          <td>{contact.date}</td>
                          <td>{contact.status}</td>
                          <td>
                            <NavLink
                              className="btn btn-danger btn-sm"
                              to="/system/contact/delete"
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

export default ContactList;
