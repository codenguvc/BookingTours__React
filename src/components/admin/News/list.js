import React, { useState } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { BiPlus, BiPencil, BiTrash } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const mockNews = [
  { id: 1, title: "ABC", author: "John", category: "ABC", date: "19-7-2024", status: "Đã lưu trữ" },
  { id: 2, title: "XYZ", author: "Jane", category: "XYZ", date: "20-7-2024", status: "Đã lưu trữ" },
  { id: 3, title: "Lorem", author: "Alice", category: "Technology", date: "21-7-2024", status: "Nháp" },
  { id: 4, title: "Ipsum", author: "Bob", category: "Health", date: "22-7-2024", status: "Đã lưu trữ" },
  { id: 5, title: "Dolor", author: "Charlie", category: "Politics", date: "23-7-2024", status: "Đã lưu trữ" },
  { id: 6, title: "Sit", author: "David", category: "Sports", date: "24-7-2024", status: "Đã lưu trữ" },
  { id: 7, title: "Amet", author: "Eve", category: "Entertainment", date: "25-7-2024", status: "Nháp" },
  { id: 8, title: "Consectetur", author: "Frank", category: "Business", date: "26-7-2024", status: "Đã lưu trữ" },
  { id: 9, title: "Adipiscing", author: "Grace", category: "Science", date: "27-7-2024", status: "Đã lưu trữ" },
  { id: 10, title: "Elit", author: "Hank", category: "Travel", date: "28-7-2024", status: "Đã lưu trữ" },
  { id: 11, title: "Vivamus", author: "Ivy", category: "Lifestyle", date: "29-7-2024", status: "Nháp" },
  { id: 12, title: "Lacinia", author: "Jack", category: "Education", date: "30-7-2024", status: "Đã lưu trữ" }
];


const NewsList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockNews.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(mockNews.length / itemsPerPage);

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
                  <h6 class="mb-4">Tin tức</h6>
                  <div className="d-flex justify-content-end">
                    <NavLink
                      className="btn btn-success btn-sm mb-2"
                      to="/system/news/add"
                    >
                      <BiPlus size={25} color="white" />
                    </NavLink>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Tiêu đề</th>
                          <th scope="col">Tác giả</th>
                          <th scope="col">Chuyên mục</th>
                          <th scope="col">Ngày đăng</th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                      {currentItems.map((news) => (
                        <tr key={news.id}>
                          <th scope="row">{news.id}</th>
                          <td>{news.title}</td>
                          <td>{news.author}</td>
                          <td>{news.category}</td>
                          <td>{news.date}</td>
                          <td>{news.status}</td>
                          <td>
                            <NavLink
                              className="btn btn-warning btn-sm me-2"
                              to="/system/news/edit"
                            >
                              <BiPencil size={25} color="white" />
                            </NavLink>
                            <NavLink
                              className="btn btn-danger btn-sm"
                              to="/system/news/delete"
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

export default NewsList;
