import React, { useState, useEffect } from 'react';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import Footer from '../../admin/Footer';
import { BiTrash } from 'react-icons/bi';
import Swal from 'sweetalert2';
import { app } from '../../../firebase/firebase';
import { getDatabase, ref, get } from 'firebase/database';
import deleteOrders from './delete';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [statusMap, setStatusMap] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const [userMap, setUserMap] = useState({});

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

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
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                <a className="page-link" id={i} onClick={handleClick} href="#">
                    {i}
                </a>
            </li>,
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const ordersRef = ref(db, 'orders');
            const usersRef = ref(db, 'users');
            const productsRef = ref(db, 'products');

            try {
                const [ordersSnapshot, usersSnapshot, productsSnapshot] = await Promise.all([
                    get(ordersRef),
                    get(usersRef),
                    get(productsRef),
                ]);

                if (ordersSnapshot.exists()) {
                    const fetchedOrders = Object.entries(ordersSnapshot.val()).map(([id, order]) => ({
                        id,
                        ...order,
                    }));
                    setOrders(fetchedOrders);
                    const initialStatusMap = fetchedOrders.reduce((acc, order) => {
                        acc[order.id] = order.condition;
                        return acc;
                    }, {});
                    setStatusMap(initialStatusMap);
                } else {
                    console.log('No orders available');
                }

                if (usersSnapshot.exists()) {
                    const fetchedUsers = Object.entries(usersSnapshot.val()).map(([id, user]) => ({
                        id,
                        ...user,
                    }));
                    setUsers(fetchedUsers);

                    // Create a mapping of user_id to displayName
                    const userMap = fetchedUsers.reduce((acc, user) => {
                        acc[user.id] = user.displayName; // Updated to displayName
                        return acc;
                    }, {});
                    setUserMap(userMap);
                } else {
                    console.log('No users available');
                }

                if (productsSnapshot.exists()) {
                    const fetchedProducts = Object.entries(productsSnapshot.val()).map(([id, product]) => ({
                        id,
                        ...product,
                    }));
                    setProducts(fetchedProducts);
                } else {
                    console.log('No products available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        setStatusMap((prevStatusMap) => ({
            ...prevStatusMap,
            [orderId]: newStatus,
        }));
    };

    const handleUpdateStatus = (orderId) => {
        const newStatus = statusMap[orderId];
        Swal.fire('Cập nhật trạng thái', 'Trạng thái đã được cập nhật', 'success');
    };

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
                                    <h1 className="mb-4">Đơn hàng</h1>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Tên Khách Hàng</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Sản Phẩm</th>
                                                    <th scope="col">Ngày Đặt Hàng</th>
                                                    <th scope="col">Tổng Số Tiền</th>
                                                    <th scope="col">Trạng Thái</th>
                                                    <th scope="col">Hành Động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((order) => (
                                                    <tr key={order.id}>
                                                        <th scope="row">{order.id}</th>
                                                        <td>{userMap[order.user_id] || 'Unknown'}</td> {/* Updated */}
                                                        <td>{order.email}</td>
                                                        <td>{order.tour_id}</td>
                                                        <td>{order.bookingdate}</td>
                                                        <td>{order.total_price.toLocaleString()} VNĐ</td>
                                                        <td>
                                                            <select
                                                                className="form-select"
                                                                value={statusMap[order.id]}
                                                                onChange={(e) =>
                                                                    handleStatusChange(order.id, e.target.value)
                                                                }
                                                                disabled={statusMap[order.id] === 'Đã hủy'}
                                                            >
                                                                <option
                                                                    value="Chờ xử lý"
                                                                    disabled={statusMap[order.id] === 'Đã xử lý'}
                                                                >
                                                                    Chờ xử lý
                                                                </option>
                                                                <option value="Đã xử lý">Đã xử lý</option>
                                                                <option value="Đã hủy">Đã hủy</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-warning me-1"
                                                                onClick={() => handleUpdateStatus(order.id)}
                                                            >
                                                                Cập nhật
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm ms-1"
                                                                onClick={() =>
                                                                    deleteOrders(order.id, setOrders, orders)
                                                                }
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
                                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                        <a
                                                            className="page-link"
                                                            href="#"
                                                            aria-label="Previous"
                                                            onClick={handlePrevPage}
                                                        >
                                                            <span aria-hidden="true">&laquo;</span>
                                                        </a>
                                                    </li>
                                                    {renderPageNumbers}
                                                    <li
                                                        className={`page-item ${
                                                            currentPage === totalPages ? 'disabled' : ''
                                                        }`}
                                                    >
                                                        <a
                                                            className="page-link"
                                                            href="#"
                                                            aria-label="Next"
                                                            onClick={handleNextPage}
                                                        >
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

export default OrderList;
