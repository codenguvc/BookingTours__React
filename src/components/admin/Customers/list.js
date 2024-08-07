import React, { useState } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { BiPencil, BiTrash  } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const mockCustomers = [
  {id: 1, name: "John", email: "john@email.com", phone: "1234567890", address: "USA"},
  {id: 2, name: "Jane", email: "jane@email.com", phone: "0987654321", address: "Canada"},
  {id: 3, name: "Alice", email: "alice@email.com", phone: "1122334455", address: "UK"},
  {id: 4, name: "Bob", email: "bob@email.com", phone: "6677889900", address: "Australia"},
  {id: 5, name: "Charlie", email: "charlie@email.com", phone: "1231231234", address: "Germany"},
  {id: 6, name: "David", email: "david@email.com", phone: "4564564567", address: "France"},
  {id: 7, name: "Eva", email: "eva@email.com", phone: "7897897890", address: "Italy"},
  {id: 8, name: "Frank", email: "frank@email.com", phone: "3213213210", address: "Spain"},
  {id: 9, name: "Grace", email: "grace@email.com", phone: "6546546543", address: "Japan"},
  {id: 10, name: "Hank", email: "hank@email.com", phone: "9879879876", address: "China"},
  {id: 11, name: "Ivy", email: "ivy@email.com", phone: "7417417410", address: "Brazil"}
];




const CustomersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockCustomers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mockCustomers.length / itemsPerPage);

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

  const handleDeleteClick = async (id) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xoá khách hàng này?",
      text: "Bạn không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xoá",
      cancelButtonText: "Huỷ"
    });

    if (result.isConfirmed) {
      // Handle the deletion logic here
      Swal.fire("Đã xoá!", "Khách hàng đã được xoá.", "success");
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
      <div id="content-wrapper" className="d-flex flex-column" style={{ backgroundColor: '#f0f0f0' }}>
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="rounded h-100 p-4 bg-white">
                  <h1 className="mb-4">Khách hàng</h1>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tên khách hàng</th>
                          <th scope="col">Email</th>
                          <th scope="col">Số điện thoại</th>
                          <th scope="col">Địa chỉ</th>
                          <th scope="col">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((customer) => (
                          <tr key={customer.id}>
                            <th scope="row">{customer.id}</th>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>
                              <NavLink className="btn btn-warning btn-sm me-2" to={`/admin/customers/edit/${customer.id}`}>
                                <BiPencil size={25} color="white" />
                              </NavLink>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteClick(customer.id)}
                              >
                                <BiTrash size={25} color="white" />
                              </button>
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

export default CustomersList;
