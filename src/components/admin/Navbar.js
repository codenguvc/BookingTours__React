import React, { useContext } from 'react'; 
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const handleLogout = () => {
        setAuth(null); // Clear the authentication state
        navigate('/system/login');
    };

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle me-3">
                <i className="fa fa-bars" />
            </button>
            <form className="d-none d-sm-inline-block form-inline me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                    <button className="btn btn-primary" type="button">
                        <i className="fas fa-search fa-sm" />
                    </button>
                </div>
            </form>
            <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-search fa-fw" />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                        <li>
                            <form className="form-inline me-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm" />
                                    </button>
                                </div>
                            </form>
                        </li>
                    </ul>
                </li>
                <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-bell fa-fw" />
                        <span className="badge badge-danger badge-counter">3+</span>
                    </a>
                </li>
                <li className="nav-item dropdown no-arrow mx-1">
<a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-envelope fa-fw" />
                        <span className="badge badge-danger badge-counter">7</span>
                    </a>
                </li>
                <div className="topbar-divider d-none d-sm-block" />
                <li className="nav-item dropdown no-arrow mr-5">
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant="link" id="dropdown-basic">
                            <span className="me-2 d-none d-lg-inline text-gray-600 small text-black">Touring</span>
                            <img className="img-profile rounded-circle" src="/assets/admin/img/undraw_profile.svg" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown-menu-end">
                            <Dropdown.Item href="#">
                                <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400" />
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                                <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400" />
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                                <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400" />
                                Activity Log
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout} href="#" data-bs-toggle="modal" data-bs-target="#logoutModal">
                                <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" />
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;