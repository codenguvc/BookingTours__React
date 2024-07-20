import React, { useState } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { BiPlus, BiPencil, BiTrash, BiEdit } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const mockCategory = [
  {id: 1, name: "John"},
  {id: 2, name: "Jane"},
  {id: 3, name: "Doe"},
  {id: 4, name: "Smith"},
  {id: 5, name: "Emily"},
  {id: 6, name: "Michael"},
  {id: 7, name: "Sarah"},
  {id: 8, name: "David"},
  {id: 9, name: "Anna"},
  {id: 10, name: "Tom"},
  {id: 11, name: "Alice"},

]

const CategoryList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockCategory.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mockCategory.length / itemsPerPage);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  }

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
                  <h6 class="mb-4">Danh mục</h6>
                  <div className="d-flex justify-content-end">
                    <NavLink
                      className="btn btn-success btn-sm mb-2"
                      to="/system/category/add"
                    >
                      <BiPlus size={25} color="white" />
                    </NavLink>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tên danh mục</th>
                          <th scope="col">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((category) => ( 
                        <tr key={category.id}>
                          <th scope="row">{category.id}</th>
                          <td>{category.name}</td>
                          <td>
                            <NavLink
                              className="btn btn-warning btn-sm me-2"
                              to="/system/category/edit"
                            >
                              <BiPencil size={25} color="white" />
                            </NavLink>
                            <NavLink
                              className="btn btn-danger btn-sm"
                              to="/system/category/delete"
                            >
                              <BiTrash size={25} color="white" />
                            </NavLink>
                          </td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className ="container-fluid">
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

export default CategoryList;
