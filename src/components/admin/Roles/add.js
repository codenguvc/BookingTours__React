import React, { useEffect } from 'react';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import Footer from '../../admin/Footer';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { app } from '../../../firebase/firebase';
import { getDatabase, ref, set } from 'firebase/database';

const RoleAdd = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        setFocus,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const db = getDatabase(app);
        const newRoles = ref(db, 'roles/' + Date.now());

        try {
            await set(newRoles, {
                name: data.roleName,
            });
            console.log('Roles added:', data);
            Swal.fire({
                title: 'Thành công',
                text: 'Thêm mới danh mục thành công',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/admin/role');
            });
        } catch (error) {
            console.error('Error adding category:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add category.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    useEffect(() => {
        if (errors.roleName) {
            setFocus('roleName');
            document.getElementById('roleName')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [errors, setFocus]);

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
                                    <h1>Thêm vai trò</h1>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="roleName" className="form-label">
                                                Tên vai trò
                                            </label>
                                            <Controller
                                                control={control}
                                                name="roleName"
                                                rules={{ required: 'Roles name is required' }}
                                                render={({ field: { onChange, onBlur, value } }) => (
<input
                                                        type="text"
                                                        className={`form-control ${
                                                            errors.roleName ? 'is-invalid' : ''
                                                        }`}
                                                        id="roleName"
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )}
                                            />
                                            {errors.roleName && (
                                                <div className="invalid-feedback">{errors.roleName.message}</div>
                                            )}
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Thêm vai trò
                                        </button>
                                        <NavLink className="btn btn-secondary ms-2" to="/admin/Role">
                                            Quay lại
                                        </NavLink>
                                    </form>
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

export default RoleAdd;