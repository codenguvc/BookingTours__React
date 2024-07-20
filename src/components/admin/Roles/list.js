import React, { useState } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { BiPlus, BiPencil, BiTrash  } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const mockRole = [
  { id: 1, name: "user" },
  { id: 2, name: "admin" },
  { id: 3, name: "moderator" },
  { id: 4, name: "guest" },
  { id: 5, name: "editor" },
  { id: 6, name: "contributor" },
  { id: 7, name: "subscriber" },
  { id: 8, name: "author" },
  { id: 9, name: "superadmin" },
  { id: 10, name: "manager" },
  { id: 11, name: "developer" },
];


const RoleList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockRole.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mockRole.length / itemsPerPage);

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
      <div id="content-wrapper" className="d-flex flex-column" style={{ backgroundColor: '#f0f0f0' }}>
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class=" rounded h-100 p-4 bg-white">
                  <h6 class="mb-4">Vai trò</h6>
                  <div className="d-flex justify-content-end">
                  <NavLink className="btn btn-success btn-sm mb-2" to="/system/role/add">
                    <BiPlus size={25} color="white" />
                  </NavLink>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tên vai trò</th>
                          <th scope="col">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                      {currentItems.map((role) => (
                        <tr key={role.id}>
                          <th scope="row">{role.id}</th>
                          <td>{role.name}</td>
                          <td>
                            <NavLink className="btn btn-warning btn-sm me-2" to="/system/role/edit">
                                <BiPencil size={25} color="white" />
                            </NavLink>
                            <NavLink className="btn btn-danger btn-sm" to="/system/role/delete">
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

export default RoleList;
