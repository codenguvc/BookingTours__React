import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <ul className={`navbar-nav bg-primary sidebar sidebar-dark accordion ${isSidebarOpen ? '' : 'toggled'}`} id="accordionSidebar">
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/system">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">
                    SB Admin <sup>2</sup>
                </div>
            </NavLink>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <NavLink className="nav-link" to="/system">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </NavLink>
            </li>
            <hr className="sidebar-divider" />
            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="/system/account">
                    <i className="fas fa-fw fa-user"></i>
                    <span>Tài khoản</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="/system/category">
                    <i className="fas fa-fw fa-book"></i>
                    <span>Danh mục</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="/system/product">
                    <i className="fas fa-fw fa-plane"></i>
                    <span>Chuyến đi</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="/system/role">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Vai trò</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="/system/customers">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Khách hàng</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="/system/permissions">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Quyền</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="/system/news">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Tin tức</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="/system/contact">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Liên hệ khách hàng</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link collapsed" to="/system/orders">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Đơn hàng</span>
                </NavLink>
            </li>
             <hr className="sidebar-divider d-none d-md-block" />
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" onClick={toggleSidebar}></button>
            </div>
        </ul>
    );
};

export default Sidebar;