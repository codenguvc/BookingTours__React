import React, { useState, useEffect } from 'react';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import Footer from '../../admin/Footer';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { app } from '../../../firebase/firebase';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import { BiPencil, BiPlus, BiTrash } from 'react-icons/bi';
import deleteProduct from './delete';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
                }
            );
        };

        fetchProducts();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
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
                                <div className="p-4 bg-white">
                                    <h1>Danh sách chuyến đi</h1>
                                    <div className="d-flex justify-content-end mb-2">
                                        <NavLink className="btn btn-success btn-sm" to="/admin/product/add">
                                            <BiPlus size={25} color="white" />
                                        </NavLink>
                                    </div>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>Ảnh</th>
                                                <th>Tên chuyến đi</th>
                                                <th>Danh mục</th>
                                                <th>Giá</th>
                                                <th>Số lượng người</th>
                                                <th>Ngày bắt đầu</th>
                                                <th>Ngày kết thúc</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.length === 0 ? (
                                                <tr>
                                                    <td colSpan="9">Không có sản phẩm nào.</td>
                                                </tr>
                                            ) : (
                                                products.map((product) => (
                                                    <tr key={product.id}>
                                                        <td>{product.id}</td>
                                                        <td>
                                                            <img
                                                                src={product.productImage}
                                                                alt={product.productName}
                                                                style={{ width: '100px', height: 'auto' }}
                                                            />
                                                        </td>
                                                        <td>{product.productName}</td>
                                                        <td>{product.category}</td>
                                                        <td>{formatCurrency(product.price)}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.startDate}</td>
                                                        <td>{product.endDate}</td>
                                                        <td className='d-flex'>
                                                            <NavLink
                                                                className="btn btn-warning btn-sm me-2"
                                                                to={`/admin/product/edit/${product.id}`}
                                                            >
                                                                <BiPencil size={25} color="white" />
                                                            </NavLink>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() =>
                                                                    deleteProduct(product.id, setProducts, products)
                                                                }
                                                            >
                                                                <BiTrash size={25} color="white" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
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
