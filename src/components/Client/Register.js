import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/authContext';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { set, ref } from 'firebase/database';
import { database } from '../../firebase/firebase';

const errorMessages = {
    'auth/weak-password': 'Mật khẩu phải có ít nhất 6 ký tự',
    'auth/email-already-in-use': 'Email đã được sử dụng',
    'auth/invalid-email': 'Email không hợp lệ',
};

const saveUserInfo = async (userId, userInfo) => {
    try {
        await set(ref(database, `users/${userId}`), userInfo);
    } catch (error) {
        console.error('Error saving user info:', error);
    }
};

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        name: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.username) newErrors.username = 'Tên đăng nhập là bắt buộc';
        if (!formData.email) newErrors.email = 'Email là bắt buộc';
        if (!formData.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
        if (!formData.name) newErrors.name = 'Họ và tên là bắt buộc';
        if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mật khẩu không khớp';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        try {
            const userCredential = await doCreateUserWithEmailAndPassword(formData.email, formData.password);
            const user = userCredential.user;
            const userInfo = {
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                name: formData.name,
            };
            await saveUserInfo(user.uid, userInfo);
            setLoading(false);
            Swal.fire({
                title: 'Đăng ký thành công!',
                text: 'Bạn đã đăng ký thành công. Bạn sẽ được chuyển hướng đến trang đăng nhập.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/login');
            });
        } catch (error) {
            setLoading(false);
            const errorKey = error.code || error.message;
            const message = errorMessages[errorKey] || 'Đã xảy ra lỗi. Vui lòng thử lại.';
            setErrorMessage(message);
        }
    };

    return (
        <div>
            <section className="bg-light p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                            <div className="card border border-light-subtle rounded-4">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="mb-5">
                                                <div className="text-center mb-4"></div>
                                                <h4 className="text-center">Đăng ký</h4>
                                            </div>
                                        </div>
                                    </div>
                                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                    <form onSubmit={handleSubmit}>
                                        <div className="row gy-3 overflow-hidden">
                                            <div className="col-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="username"
                                                        id="username"
                                                        placeholder="name@example.com"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="username" className="form-label">
                                                        Tên đăng nhập
                                                    </label>
                                                    {errors.username && (
                                                        <small className="text-danger">{errors.username}</small>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        name="email"
                                                        id="email"
                                                        placeholder="name@example.com"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="email" className="form-label">
                                                        Email
                                                    </label>
                                                    {errors.email && (
                                                        <small className="text-danger">{errors.email}</small>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="phone"
                                                        id="phone"
                                                        placeholder="name@example.com"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="phone" className="form-label">
                                                        Số điện thoại
                                                    </label>
                                                    {errors.phone && (
                                                        <small className="text-danger">{errors.phone}</small>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="name"
                                                        id="name"
                                                        placeholder="name@example.com"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="name" className="form-label">
                                                        Họ và tên
                                                    </label>
                                                    {errors.name && (
                                                        <small className="text-danger">{errors.name}</small>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="password" className="form-label">
                                                        Mật khẩu
                                                    </label>
                                                    {errors.password && (
                                                        <small className="text-danger">{errors.password}</small>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="confirmPassword"
                                                        id="confirmPassword"
                                                        placeholder="Password"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="confirmPassword" className="form-label">
                                                        Nhập lại mật khẩu
                                                    </label>
                                                    {errors.confirmPassword && (
                                                        <small className="text-danger">{errors.confirmPassword}</small>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="rememberMe"
                                                        id="remember_me"
                                                        checked={formData.rememberMe}
                                                        onChange={handleChange}
                                                    />
                                                    <label
                                                        className="form-check-label text-secondary"
                                                        htmlFor="remember_me"
                                                    >
                                                        Đồng ý điều khoản
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid">
                                                    <button
                                                        className="btn bsb-btn-xl btn-primary"
                                                        type="submit"
                                                        disabled={loading}
                                                    >
                                                        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-12 mt-3">
                                                <div className="d-flex justify-content-center">
                                                    <p className="text-muted mb-0">
                                                        Đã có tài khoản?{' '}
                                                        <NavLink to="/login" className="text-decoration-none">
                                                            Đăng nhập
                                                        </NavLink>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Register;
