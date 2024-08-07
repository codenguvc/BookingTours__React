import React, { useEffect, useState } from 'react';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import Footer from '../../admin/Footer';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref, get, set, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase/firebase';
import Swal from 'sweetalert2';

const AccountEdit = () => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        setFocus,
    } = useForm();
    const navigate = useNavigate();
    const { userId } = useParams();

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchAccountData = async () => {
            const db = getDatabase(app);
            const accountRef = ref(db, 'users/' + userId);

            try {
                const snapshot = await get(accountRef);
                if (snapshot.exists()) {
                    const accountData = snapshot.val();
                    setValue('displayName', accountData.displayName || 'No Name');
                    setValue('accountEmail', accountData.email);
                    setValue('accountPhone', accountData.phone);
                    setValue('accountAddress', accountData.address);
                    setValue('role_id', accountData.role_id);
                    if (accountData.photoURL) {
                        setValue('accountAvatar', accountData.photoURL);
                    }
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Account not found.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate('/admin/account');
                    });
                }
            } catch (error) {
                console.error('Error fetching account data:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch account data.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        };

        fetchAccountData();
    }, [userId, navigate, setValue]);

    useEffect(() => {
        const fetchRoles = async () => {
            const db = getDatabase(app);
            const rolesRef = ref(db, 'roles/');

            try {
                onValue(rolesRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const roleList = Object.keys(data).map((key) => ({
                            id: key,
                            name: data[key].name,
                        }));
                        setRoles(roleList);
                    }
                });
            } catch (error) {
                console.error('Error fetching roles:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch roles data.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        };

        fetchRoles();
    }, []);

    const onSubmit = async (data) => {
        const db = getDatabase(app);
        const accountRef = ref(db, 'users/' + userId);

        try {
            const avatarUrl =
                data.accountAvatar instanceof File ? await uploadFile(data.accountAvatar) : data.accountAvatar;

            await set(accountRef, {
                displayName: data.displayName,
                email: data.accountEmail,
                phone: data.accountPhone,
                address: data.accountAddress,
                photoURL: avatarUrl,
                role_id: data.role_id,
            });

            Swal.fire({
                title: 'Success!',
                text: 'Account updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/admin/account');
            });
        } catch (error) {
            console.error('Error updating account:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update account.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const uploadFile = async (file) => {
        if (!file) return null;

        try {
            const storage = getStorage(app);
            const fileRef = storageRef(storage, `images/${Date.now()}_${file.name}`);
            await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(fileRef);
            return downloadURL;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

    useEffect(() => {
        if (errors.role_id) {
            setFocus('role_id');
            document.getElementById('role_id')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
                                <div className="rounded h-100 p-4 bg-white">
                                    <h1 className="mb-4">Sửa tài khoản</h1>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="accountAvatar" className="form-label">
                                                Ảnh đại diện
                                            </label>
                                            <Controller
                                                control={control}
                                                name="accountAvatar"
                                                render={({ field: { onChange, onBlur } }) => (
                                                    <input
                                                        type="file"
                                                        className={`form-control ${
                                                            errors.accountAvatar ? 'is-invalid' : ''
                                                        }`}
                                                        id="accountAvatar"
                                                        onBlur={onBlur}
                                                        onChange={(e) => {
                                                            onChange(e.target.files[0]);
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors.accountAvatar && (
                                                <div className="text-danger">{errors.accountAvatar.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="displayName" className="form-label">
                                                Tên người dùng
                                            </label>
                                            <Controller
                                                control={control}
                                                name="displayName"
                                                rules={{ required: 'Tên người dùng là bắt buộc' }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <input
                                                        type="text"
                                                        className={`form-control ${
                                                            errors.displayName ? 'is-invalid' : ''
                                                        }`}
                                                        id="displayName"
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )}
                                            />
                                            {errors.displayName && (
                                                <div className="text-danger">{errors.displayName.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="accountEmail" className="form-label">
                                                Email
                                            </label>
                                            <Controller
                                                control={control}
                                                name="accountEmail"
                                                rules={{ required: 'Email là bắt buộc' }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <input
                                                        type="email"
                                                        className={`form-control ${
                                                            errors.accountEmail ? 'is-invalid' : ''
                                                        }`}
                                                        id="accountEmail"
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )}
                                            />
                                            {errors.accountEmail && (
                                                <div className="text-danger">{errors.accountEmail.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="accountPhone" className="form-label">
                                                Số điện thoại
                                            </label>
                                            <Controller
                                                control={control}
                                                name="accountPhone"
                                                rules={{ required: 'Số điện thoại là bắt buộc' }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <input
                                                        type="text"
                                                        className={`form-control ${
                                                            errors.accountPhone ? 'is-invalid' : ''
                                                        }`}
                                                        id="accountPhone"
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )}
                                            />
                                            {errors.accountPhone && (
                                                <div className="text-danger">{errors.accountPhone.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="accountAddress" className="form-label">
                                                Địa chỉ
                                            </label>
                                            <Controller
                                                control={control}
                                                name="accountAddress"
                                                rules={{ required: 'Địa chỉ là bắt buộc' }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <input
                                                        type="text"
                                                        className={`form-control ${
                                                            errors.accountAddress ? 'is-invalid' : ''
                                                        }`}
                                                        id="accountAddress"
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )}
                                            />
                                            {errors.accountAddress && (
                                                <div className="text-danger">{errors.accountAddress.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="role_id" className="form-label">
                                                Chức vụ
                                            </label>
                                            <Controller
                                                control={control}
                                                name="role_id"
                                                rules={{ required: 'Chức vụ là bắt buộc' }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <select
                                                        className={`form-control ${errors.role_id ? 'is-invalid' : ''}`}
                                                        id="role_id"
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                    >
                                                        <option value="">Chọn chức vụ</option>
                                                        {roles.map((role) => (
                                                            <option key={role.id} value={role.id}>
                                                                {role.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                            />
                                            {errors.role_id && (
                                                <div className="text-danger">{errors.role_id.message}</div>
                                            )}
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Cập nhật
                                        </button>
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

export default AccountEdit;
