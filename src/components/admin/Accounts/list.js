import React, { useState, useEffect } from 'react';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import Footer from '../../admin/Footer';
import { BiPlus, BiPencil, BiTrash } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { app } from '../../../firebase/firebase';
import { getDatabase, ref, get } from 'firebase/database';
import deleteUsers from './delete';

const AccountList = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [roleMap, setRoleMap] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchUsersAndRoles = async () => {
            const db = getDatabase(app);
            const usersRef = ref(db, 'users');
            const rolesRef = ref(db, 'roles');
            try {
                const [usersSnapshot, rolesSnapshot] = await Promise.all([get(usersRef), get(rolesRef)]);
        
                if (usersSnapshot.exists()) {
                    const usersData = usersSnapshot.val();
                    const usersArray = Object.keys(usersData).map((key) => ({
                        id: key,
                        ...usersData[key],
                    }));
                    setUsers(usersArray);
                }
        
                if (rolesSnapshot.exists()) {
                    const rolesData = rolesSnapshot.val();
                    const rolesArray = Object.keys(rolesData).map((key) => ({
                        id: key,
                        name: rolesData[key].name,
                    }));
                    setRoles(rolesArray);
        
                    const newRoleMap = rolesArray.reduce((acc, role) => {
                        acc[role.id] = role.name;
                        return acc;
                    }, {});
                    setRoleMap(newRoleMap);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        

        fetchUsersAndRoles();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(users.length / itemsPerPage);

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
            </li>
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
                                    <h1 className="mb-4">Tài khoản</h1>
                                    <div className="d-flex d-none justify-content-end">
                                        <NavLink className="btn btn-success btn-sm mb-2" to="/admin/account/add">
                                            <BiPlus size={25} color="white" />
                                        </NavLink>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Avatar</th>
                                                    <th scope="col">Tên người dùng</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Số điện thoại</th>
                                                    <th scope="col">Địa chỉ</th>
                                                    <th scope="col">Vai trò</th>
                                                    <th scope="col">Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems.map((user) => {
                                                    const userRoleName = roleMap[user.role_id] || 'Unknown Role';
                                                    const displayName = user.displayName || user.name || 'No Name';
                                                    const avatar = user.photoURL || user.avatar || 'path_to_default_avatar.jpg';
                                                    return (
                                                        <tr key={user.id}>
                                                            <th scope="row">{user.id}</th>
                                                            <td>
                                                                <img
                                                                    src={avatar}
                                                                    alt={displayName}
                                                                    style={{
                                                                        width: '50px',
                                                                        height: '50px',
                                                                        borderRadius: '50%',
                                                                    }}
                                                                />
                                                            </td>
                                                            <td>{displayName}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.phone}</td>
                                                            <td>{user.address}</td>
                                                            <td>{userRoleName}</td>
                                                            <td>
                                                                <NavLink
                                                                    className="btn btn-warning btn-sm me-2"
                                                                    to={`/admin/account/edit/${user.id}`}
                                                                >
                                                                    <BiPencil size={25} color="white" />
                                                                </NavLink>
                                                                <button
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() =>
                                                                        deleteUsers(user.id, setUsers, users)
                                                                    }
                                                                >
                                                                    <BiTrash size={25} color="white" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
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
                                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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

export default AccountList;
