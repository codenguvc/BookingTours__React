import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { app } from '../../../firebase/firebase';
import { useAuth } from '../../../context/authContext';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
};

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const db = getDatabase(app);
            const productRef = dbRef(db, `products/${id}`);

            onValue(
                productRef,
                (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        setProduct(data);
                    } else {
                        setProduct(null);
                    }
                    setLoading(false);
                },
                {
                    onlyOnce: true,
                },
            );
        };

        fetchProduct();
    }, [id]);

    const handleOrderClick = () => {
        if (userLoggedIn) {
            navigate(
                `/orderFroms?name=${encodeURIComponent(product.productName)}&price=${
                    product.price
                }&startDate=${encodeURIComponent(product.startDate)}`,
            );
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Chưa đăng nhập',
                text: 'Vui lòng đăng nhập để đặt hàng!',
                confirmButtonText: 'Đăng nhập',
                confirmButtonColor: '#59C8E0', // Your custom color
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        }
    };

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
                                    <h1>Chi tiết chuyến đi</h1>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb justify-content-center">
                                            <li className="breadcrumb-item">
                                                <a href="/">Trang chủ</a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                Chi tiết chuyến đi
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="product-detail spad py-5">
                    <div className="container">
                        {loading ? (
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : product ? (
                            <div className="row g-4">
                                <div className="col-lg-6 col-md-6">
                                    <div className="product-detail__image overflow-hidden rounded">
                                        <img
                                            src={product.productImage}
                                            alt={product.productName}
                                            className="img-fluid w-100 h-auto"
                                            style={{ objectFit: 'cover', height: '335px' }}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="product-detail__text p-4 bg-white rounded shadow-sm">
                                        <h3 className="mb-3 fw-bold">Địa điểm: {product.productName}</h3>
                                        <h2 className="mb-4">
                                            Giá:
                                            <span className="text-danger fs-3 fw-bold">
                                                {product.price.toLocaleString('vi-VN')}
                                            </span>{' '}
                                            VNĐ
                                            <span className="text-muted fs-6">/day</span>
                                        </h2>
                                        <ul className="list-unstyled mb-4">
                                            <li className="mb-2">
                                                <strong>Đánh giá:</strong> {product.rating || 5} Sao
                                            </li>
                                            <li className="mb-2">
                                                <strong>Số lượng:</strong> {product.quantity} người
                                            </li>
                                            <li className="mb-2">
                                                <strong>Ngày bắt đầu:</strong> {formatDate(product.startDate)}
                                            </li>
                                            <li className="mb-2">
                                                <strong>Ngày kết thúc:</strong> {formatDate(product.endDate)}
                                            </li>
                                        </ul>
                                        <button className="btn btn-warning" onClick={handleOrderClick}>
                                            Đặt ngay
                                        </button>
                                    </div>
                                </div>

                                <div className="product-detail__description mt-5 p-4 bg-white rounded shadow">
                                    <h4 className="fw-bold mb-3">Chi tiết chuyến đi</h4>
                                    <p className="text-break">{product.description}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center">Product not found.</p>
                        )}
                    </div>
                </section>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5>Unread comments (6)</h5>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="flexSwitchCheckChecked"
                                        defaultChecked
                                    />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                        Comments "ON"
                                    </label>
                                </div>
                            </div>

                            <div className="card p-3 mb-3 shadow-sm rounded border">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="https://i.imgur.com/hczKIze.jpg"
                                            width={30}
                                            className="rounded-circle me-2"
                                            alt="user"
                                        />
                                        <div>
                                            <strong className="text-primary">james_olesenn</strong>
                                            <p className="mb-0">Hmm, This poster looks cool</p>
                                        </div>
                                    </div>
                                    <small>2 days ago</small>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <div>
                                        <small className="text-muted">Remove</small>
                                        <span className="mx-2">•</span>
                                        <small className="text-muted">Reply</small>
                                        <span className="mx-2">•</span>
                                        <small className="text-muted">Translate</small>
                                    </div>
                                    <div>
                                        <i className="fa fa-star text-warning me-2"></i>
                                        <i className="fa fa-check-circle-o"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="card p-3 shadow-sm rounded border">
                                <h4 className="mb-4">Thêm bình luận</h4>
                                <form action="#">
                                    <div className="mb-3">
                                        <label htmlFor="comment" className="form-label">
                                            Nội dung bình luận:
                                        </label>
                                        <textarea
                                            id="comment"
                                            className="form-control"
                                            rows="4"
                                            placeholder="Nhập bình luận của bạn"
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-danger">
                                        Gửi
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;