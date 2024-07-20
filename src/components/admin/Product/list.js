import React, { useState } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { BiPlus, BiPencil, BiTrash } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

const mockProduct = [
  {id: 1, name: 'John', image: "/assets/admin/img/avt-removebg-preview (2).png", number: 1, startDate: '2024-07-19', endDate: '2024-07-25' },
  {id: 2, name: 'Emma', image: "/assets/admin/img/avt-removebg-preview (2).png", number: 2, startDate: '2024-07-20', endDate: '2024-07-26'},
  {id: 3, name: 'Oliver', image: "/assets/admin/img/avt-removebg-preview (2).png", number: 3, startDate: '2024-07-21', endDate: '2024-07-27'},
  {id: 4, name: 'Ava', image: "/assets/admin/img/avt-removebg-preview (2).png", number: 4, startDate: '2024-07-22', endDate: '2024-07-28'},
  {id: 5, name: 'William', image: "/assets/admin/img/avt-removebg-preview (2).png", number: 5, startDate: '2024-07-23', endDate: '2024-07-29'},
  {id: 6, name: 'Sophia', image: "/assets/admin/img/avt-removebg-preview (2).png", number: 6, startDate: '2024-07-24', endDate: '2024-07-30'},
  {id: 7, name: 'James', image: "/assets/admin/img/avt-removebg-preview (2).png", number: 7, startDate: '2024-07-25', endDate: '2024-07-31'},
  {id: 8, name: 'Isabella', image: "/assets/admin/img/avt-removebg-preview (2).png", number: 8, startDate: '2024-07-26', endDate: '2024-08-01'},
  {id: 9, name: 'Benjamin', image: "/assets/admin/img/avt-removebg-preview (2).png", number: 9, startDate: '2024-07-27', endDate: '2024-08-02'},
  {id: 10, name: 'Mia', image: "/assets/admin/img/avt-removebg-preview (2).png", number: 10, startDate: '2024-07-28', endDate: '2024-08-03'},
  {id: 11, name: 'Lucas', image: "/assets/admin/img/avt-removebg-preview (2).png", number: 11, startDate: '2024-07-29', endDate: '2024-08-04'},
  {id: 12, name: 'Amelia', image: "/assets/admin/img/avt-removebg-preview (2).png", number: 12, startDate: '2024-07-30', endDate: '2024-08-05'}
];



const ProductList = () => {

const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockProduct.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mockProduct.length / itemsPerPage);

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
      <div id="content-wrapper" className="d-flex flex-column" style={{ backgroundColor: "#f0f0f0" }} >
        <div id="content">
          <Navbar />

          <div className="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class=" rounded h-100 p-4 bg-white">
                  <h6 class="mb-4">Chuyến đi</h6>
                  <div className="d-flex justify-content-end">
                    <NavLink className="btn btn-success btn-sm mb-2" to="/system/product/add" >
                      <BiPlus size={25} color="white" />
                    </NavLink>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tên chuyến đi</th>
                          <th scope="col">Hình ảnh</th>
                          <th scope="col">Số lượng người</th>
                          <th scope="col">Ngày bắt đầu</th>
                          <th scope="col">Ngày kết thúc</th>
                          <th scope="col">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                      {currentItems.map((product) => (
                        <tr key={product.id}>
                          <th scope="row">{product.id}</th>
                          <td>{product.name}</td>
                          <td>
                              <img
                                src={product.image}
                                alt={product.username}
                                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                              />
                            </td>
                          <td>{product.number}</td>
                          <td>{product.startDate}</td>
                          <td>{product.endDate}</td>
                          <td>
                            <NavLink className="btn btn-warning btn-sm me-2" to="/system/product/edit" >
                              <BiPencil size={25} color="white" />
                            </NavLink>
                            <NavLink className="btn btn-danger btn-sm" to="/system/product/delete" >
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

export default ProductList;
