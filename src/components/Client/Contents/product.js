import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { NavLink } from 'react-router-dom';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { app } from '../../../firebase/firebase';
import { useAuth } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
};

const RoomItem = ({ room, index }) => {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();
    const formatCurrency = (value) => {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '') + ' VNĐ';
    };
    const handleOrderClick = () => {
        if (userLoggedIn) {
            navigate(
                `/orderFroms?name=${encodeURIComponent(room.title)}&price=${room.price}&startDate=${encodeURIComponent(
                    room.startDate,
                )}`,
            );
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Chưa đăng nhập',
                text: 'Vui lòng đăng nhập để đặt hàng!',
                confirmButtonText: 'Đăng nhập',
                confirmButtonColor: '#59C8E0',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        }
    };

    return (
        <div className="col-md-12 d-flex mb-4">
            <div
                className={`col-lg-6 p-0 order-lg-${index % 2 === 0 ? '7' : '8'} order-md-${
                    index % 2 === 0 ? '7' : '8'
                } col-md-6`}
            >
                <div className="room__pic__slider">
                    <img src={room.image} alt={room.title} style={{ width: '600px', height: '350px' }} />
                </div>
            </div>
            <div
                className={`col-lg-6 p-0 order-lg-${index % 2 === 0 ? '8' : '7'} order-md-${
                    index % 2 === 0 ? '8' : '7'
                } col-md-6`}
            >
                <div className="room__text right__text">
                    <h3>Địa điểm: {room.title}</h3>
                    <h2>
                        <sup></sup>
                        {formatCurrency(room.price)}
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
                    <NavLink to={`/product-detail/${room.id}`} className="mr-3">
                        Xem chi tiết
                    </NavLink>
                    <button className="btn btn-warning" onClick={handleOrderClick}>
                        Đặt ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const { userLoggedIn } = useAuth();
    useEffect(() => {
        const fetchProducts = async () => {
            const db = getDatabase(app);
            const productsRef = dbRef(db, 'products');

            onValue(
                productsRef,
                (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const productList = Object.keys(data).map((key) => ({
                            id: key,
                            ...data[key],
                        }));
                        setProducts(productList);
                    } else {
                        setProducts([]);
                    }
                    setLoading(false);
                },
                {
                    onlyOnce: true,
                },
            );
        };

        fetchProducts();
    }, []);

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const currentItems = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const breadcrumb = `${process.env.PUBLIC_URL}/assets/Client/img/breadcrumb-bg.jpg`;

    return (
        <div>
            <Header />
            <div>
                <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${breadcrumb})` }}>
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
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            currentItems.map((product, index) => (
                                <RoomItem
                                    key={product.id}
                                    room={{
                                        id: product.id,
                                        title: product.productName,
                                        price: product.price,
                                        rate: product.rating || 5,
                                        people: product.quantity,
                                        startDate: product.startDate,
                                        endDate: product.endDate,
                                        image: product.productImage,
                                    }}
                                    index={index}
                                    isLoggedIn={userLoggedIn}
                                />
                            ))
                        )}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="pagination__number">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            onClick={() => paginate(i + 1)}
                                            className={currentPage === i + 1 ? 'active' : ''}
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
