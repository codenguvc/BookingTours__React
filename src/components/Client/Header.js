import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { useAuth } from '../../context/authContext/index';
import { doSignOut } from '../../firebase/auth';

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const handleSignOut = () => {
        doSignOut().then(() => {
            navigate('/');
        });
    };

    return (
        <div>
            <header className="header">
                <div className="header__top__fix">
                    <div className="container">
                        <div className="row header__top__fix__responsive">
                            <div className="col-lg-7">
                                <ul className="header__top__widget">
                                    <li>
                                        <span className="icon_pin_alt" /> 128 người hướng đối tượng
                                    </li>
                                    <li>
                                        <span className="icon_phone" /> (123) 456-78-910
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-5">
                                <div className="header__top__right">
                                    <div className="header__top__auth">
                                        <ul>
                                            {currentUser ? (
                                                <>
                                                    {currentUser.displayName && (
                                                        <li>
                                                            <span>Chào, {currentUser.displayName}</span>
                                                        </li>
                                                    )}
                                                    <li>
                                                        <NavLink to="/InfoAccount" className="text-decoration-none">
                                                            <i className="fas fa-fw fa-user"></i> Tài khoản
                                                        </NavLink>
                                                    </li>
                                                    <li className="pe-auto">
                                                        <button onClick={handleSignOut} className="btn btn-dark">
                                                            Đăng xuất
                                                        </button>
                                                    </li>
                                                </>
                                            ) : (
                                                <>
                                                    <li>
                                                        <NavLink to="/login">Đăng nhập</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to="/register">Đăng ký</NavLink>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header__nav__option">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2 col-6">
                                <div className="header__logo">
                                    <NavLink to="/">
                                        <img src="/assets/Client/img/logo.png" alt="Logo" />
                                    </NavLink>
                                </div>
                            </div>
                            <div className="col-lg-10 d-none d-lg-block">
                                <div className="header__nav">
                                    <nav className="header__menu">
                                        <ul className="menu__class">
                                            <li className="active">
                                                <NavLink to="/">Trang chủ</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/product">Chuyến đi</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/aboutus">Về chúng tôi</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/news">Tin tức</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/contact">Liên hệ</NavLink>
                                            </li>
                                        </ul>
                                    </nav>
                                    <div className="header__nav__widget">
                                        <NavLink to="/product">
                                            Đặt vé ngay <span className="arrow_right" />
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 d-lg-none">
                                <div className="canvas__open" onClick={toggleMobileMenu}>
                                    <span className="fa fa-bars" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`mobile__menu ${isMobileMenuOpen ? 'open' : ''} d-lg-none`}>
                    <div className="mobile__menu__header">
                        <span className="fa fa-times close__icon bright__icon" onClick={closeMobileMenu} />
                    </div>
                    <nav className="header__menu">
                        <ul className="menu__class">
                            <div className="col-md-12">
                                <li className="active">
                                    <NavLink to="/" onClick={closeMobileMenu}>
                                        Trang chủ
                                    </NavLink>
                                </li>
                            </div>
                            <div className="col-md-12">
                                <li>
                                    <NavLink to="/product" onClick={closeMobileMenu}>
                                        Chuyến đi
                                    </NavLink>
                                </li>
                            </div>
                            <div className="col-md-12">
                                <li>
                                    <NavLink to="/aboutus" onClick={closeMobileMenu}>
                                        Về chúng tôi
                                    </NavLink>
                                </li>
                            </div>
                            <div className="col-md-12">
                                <li>
                                    <NavLink to="/news" onClick={closeMobileMenu}>
                                        Tin tức
                                    </NavLink>
                                </li>
                            </div>
                            <div className="col-md-12">
                                <li>
                                    <NavLink to="/contact" onClick={closeMobileMenu}>
                                        Liên hệ
                                    </NavLink>
                                </li>
                            </div>
                        </ul>
                    </nav>
                    <div className="col-md-12 ml-3 header__nav__widget">
                        <NavLink to="/product" onClick={closeMobileMenu}>
                            Đặt vé ngay <span className="arrow_right" />
                        </NavLink>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
