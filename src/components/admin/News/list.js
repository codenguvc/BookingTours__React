import React, { useState, useEffect } from 'react';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import Footer from '../../admin/Footer';
import { app } from '../../../firebase/firebase';
import deleteNew from './delete';
import { getDatabase, ref, get } from 'firebase/database';
import { BiPlus, BiPencil, BiTrash } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchNews = async () => {
            const db = getDatabase(app);
            const newsRef = ref(db, 'news');
            try {
                const snapshot = await get(newsRef);
                if (snapshot.exists()) {
                    setNews(Object.entries(snapshot.val()).map(([id, news]) => ({ id, ...news })));
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchNews();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(news.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
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
                                    <h1 className="mb-4">Tin tức</h1>
                                    <div className="d-flex justify-content-end mb-2">
                                        <NavLink className="btn btn-success btn-sm" to="/admin/news/add">
                                            <BiPlus size={25} color="white" />
                                        </NavLink>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Tiêu đề</th>
                                                    <th scope="col">Hình ảnh</th>
                                                    <th scope="col">Nội dung</th>
                                                    <th scope="col">Ngày đăng</th>
                                                    <th scope="col">Trạng thái</th>
                                                    <th scope="col">Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((newsItem) => (
                                                    <tr key={newsItem.id}>
                                                        <th scope="row">{newsItem.id}</th>
                                                        <td>{newsItem.title}</td>
                                                        <td>
                                                            <img src={newsItem.img} style={{ width: '100px' }} />
                                                        </td>
                                                        <td>{truncateText(newsItem.content, 40)}</td>
                                                        <td>{newsItem.date}</td>
                                                        <td>{newsItem.condition}</td>
                                                        <td>
                                                            <NavLink
                                                                className="btn btn-warning btn-sm me-2"
                                                                to={`/admin/news/edit/${newsItem.id}`}
                                                            >
                                                                <BiPencil size={25} color="white" />
                                                            </NavLink>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => deleteNew(newsItem.id, setNews, news)}
                                                            >
                                                                <BiTrash size={25} color="white" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <nav aria-label="Page navigation">
                                            <ul className="pagination justify-content-end">
                                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <a
                                                        className="page-link"
                                                        href="#!"
                                                        aria-label="Previous"
                                                        onClick={handlePrevPage}
                                                    >
                                                        <span aria-hidden="true">&laquo;</span>
                                                    </a>
                                                </li>
                                                {[...Array(totalPages)].map((_, index) => (
                                                    <li
                                                        key={index + 1}
                                                        className={`page-item ${
                                                            currentPage === index + 1 ? 'active' : ''
                                                        }`}
                                                    >
                                                        <a
                                                            className="page-link"
                                                            href="#!"
                                                            onClick={() => handlePageChange(index + 1)}
                                                        >
                                                            {index + 1}
                                                        </a>
                                                    </li>
                                                ))}
                                                <li
                                                    className={`page-item ${
                                                        currentPage === totalPages ? 'disabled' : ''
                                                    }`}
                                                >
                                                    <a
                                                        className="page-link"
                                                        href="#!"
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
                <Footer />
            </div>
        </div>
    );
};

export default NewsList;
