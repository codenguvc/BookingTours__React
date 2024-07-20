import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { NavLink } from "react-router-dom";

const rooms = [
  {
    id: 1,
    title: "Nha Trang",
    price: 1200000,
    rate: 5,
    people: 10,
    startDate: "2024-01-01",
    endDate: "2024-02-02",
    image: "/assets/Client/img/nhatrang.jpg",
  },
  {
    id: 2,
    title: "Đà lạt",
    price: 1800000,
    rate: 5,
    people: 10,
    startDate: "2024-01-01",
    endDate: "2024-02-02",
    image: "/assets/Client/img/dalat.jpg",
  },
  {
    id: 3,
    title: "Vũng tàu",
    price: 1100000,
    rate: 5,
    people: 10,
    startDate: "2024-01-01",
    endDate: "2024-02-02",
    image: "/assets/Client/img/vungtau.jpg",
  },
  {
    id: 4,
    title: "Phú quốc",
    price: 1000000,
    rate: 5,
    people: 10,
    startDate: "2024-01-01",
    endDate: "2024-02-02",
    image: "/assets/Client/img/phuquoc.jpg",
  },
];

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("vi-VN", options);
};

const RoomItem = ({ room, index }) => (
  <div className="col-md-12 d-flex mb-4">
    <div
      className={`col-lg-6 p-0 order-lg-${
        index % 2 === 0 ? "7" : "8"
      } order-md-${index % 2 === 0 ? "7" : "8"} col-md-6`}
    >
      <div className="room__pic__slider">
        <img src={room.image} alt={room.title} />
      </div>
    </div>
    <div
      className={`col-lg-6 p-0 order-lg-${
        index % 2 === 0 ? "8" : "7"
      } order-md-${index % 2 === 0 ? "8" : "7"} col-md-6`}
    >
      <div className="room__text right__text">
        <h3>Địa điểm: {room.title}</h3>
        <h2>
          <sup></sup>
          {room.price.toLocaleString()} VNĐ<span>/day</span>
        </h2>
        <ul>
          <li>
            <span>Đánh giá:</span>
            {room.rate} Sao
          </li>
          <li>
            <span>Số lượng:</span>
            {room.people} người
          </li>
          <li>
            <span>Ngày bắt đầu:</span>
            {formatDate(room.startDate)}
          </li>
          <li>
            <span>Ngày kết thúc:</span>
            {formatDate(room.endDate)}
          </li>
        </ul>
        <NavLink to="/product-detail" className="mr-3">
          Xem chi tiết
        </NavLink>
        <a href="#">Đặt ngay</a>
      </div>
    </div>
  </div>
);

const Product = () => {
  const breadcrumb = `${process.env.PUBLIC_URL}/assets/Client/img/breadcrumb-bg.jpg`;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;


  const totalPages = Math.ceil(rooms.length / itemsPerPage);

  
  const currentItems = rooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
<div>
        <div
          className="breadcrumb-option set-bg"
          style={{ backgroundImage: `url(${breadcrumb})` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="breadcrumb__text">
                  <h1>Chuyến đi</h1>
                  <div className="breadcrumb__links">
                    <a href="/">Trang chủ</a>
                    <span>Chuyến đi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="rooms spad">
          <div className="container">
            {currentItems.map((room, index) => (
              <RoomItem key={room.id} room={room} index={index} />
            ))}
            <div className="row">
              <div className="col-lg-12">
                <div className="pagination__number">
                  {[...Array(totalPages)].map((_, i) => (
                    <a
                      key={i}
                      href="#"
                      onClick={() => paginate(i + 1)}
                      className={currentPage === i + 1 ? "active" : ""}
                    >
                      {i + 1}
                    </a>
                  ))}
                  {currentPage < totalPages && (
                    <a href="#" onClick={() => paginate(currentPage + 1)}>
                      Next <span className="arrow_right" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Product;