import React, { useEffect } from 'react';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import Footer from '../../admin/Footer';
import { useForm, Controller } from 'react-hook-form';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { app } from '../../../firebase/firebase';
import { getDatabase, ref, get, set } from 'firebase/database';
import Swal from 'sweetalert2';
const RoleEdit = () => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        setFocus,
    } = useForm();
    const navigate = useNavigate();
    const { rolesId } = useParams();

    useEffect(() => {
        const fetchRoles = async () => {
            const db = getDatabase(app);
            const rolesRef = ref(db, 'roles/' + rolesId);
            try {
                const snapshot = await get(rolesRef);
                if (snapshot.exists()) {
                    setValue('rolesName', snapshot.val().name);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'role not found.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate('/admin/role');
                    });
                }
            } catch (error) {
                console.error('Error fetching role data:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch role data.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        };

        fetchRoles();
    }, [rolesId, navigate, setValue]);

    const onSubmit = async (data) => {
        const db = getDatabase(app);
        const rolesRef = ref(db, 'roles/' + rolesId);

        try {
            await set(rolesRef, {
                name: data.rolesName,
            });
            console.log('roles updated:', data);
            Swal.fire({
                title: 'Success!',
                text: 'roles has been updated.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/admin/role');
            });
        } catch (error) {
            console.error('Error updating roles:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update roles.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    useEffect(() => {
        if (errors.rolesName) {
            setFocus('rolesName');
            document.getElementById('rolesName')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
                                    <h1>Sửa vai trò</h1>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="rolesName" className="form-label">
                                                Tên vai trò
                                            </label>
                                            <Controller
                                                name="rolesName"
                                                control={control}
                                                rules={{ required: 'Category name is required' }}
                                                render={({ field }) => (
                                                    <input
                                                        type="text"
                                                        className={`form-control ${
                                                            errors.rolesName ? 'is-invalid' : ''
                                                        }`}
                                                        id="rolesName"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors.roleName && (
                                                <div className="invalid-feedback">{errors.roleName.message}</div>
                                            )}
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Sửa vai trò
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

export default RoleEdit;