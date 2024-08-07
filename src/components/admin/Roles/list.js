import React, { useState, useEffect } from 'react';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import Footer from '../../admin/Footer';
import { BiPlus, BiPencil, BiTrash } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { app } from '../../../firebase/firebase';
import { getDatabase, ref, get } from 'firebase/database';
import deleteRoles from './delete';

const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchRole = async () => {
            const db = getDatabase(app);
            const RolesRef = ref(db, 'roles');
            try {
                const snapshot = await get(RolesRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const rolesArray = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                    }));
                    setRoles(rolesArray);
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRole();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = roles.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(roles.length / itemsPerPage);

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
                                    <h1 className="mb-4">Vai trò</h1>
<div className="d-flex justify-content-end">
                                        <NavLink className="btn btn-success btn-sm mb-2" to="/admin/role/add">
                                            <BiPlus size={25} color="white" />
                                        </NavLink>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table">
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
                                                            <NavLink
                                                                className="btn btn-warning btn-sm me-2"
                                                                to={`/admin/role/edit/${role.id}`}
                                                            >
                                                                <BiPencil size={25} color="white" />
                                                            </NavLink>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => deleteRoles(role.id, setRoles, roles)}
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

export default RoleList;