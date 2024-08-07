import React, { useEffect, useState } from 'react';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import Footer from '../../admin/Footer';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase/firebase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

const AddAccount = () => {
    const [roles, setRoles] = useState([]);
    const {
        handleSubmit,
        control,
        formState: { errors },
        setFocus,
    } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        const db = getDatabase(app);
        const rolesRef = ref(db, 'roles/');

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
    }, []);

    const onSubmit = async (data) => {
        const db = getDatabase(app);
        const newAccount = ref(db, 'users/' + Date.now());

        try {
            const avatarUrl = data.accountAvatar ? await uploadFile(data.accountAvatar) : null;

            await set(newAccount, {
                name: data.accountName,
                email: data.accountEmail,
                phone: data.accountPhone,
                address: data.accountAddress,
                password: data.accountPassword,
                avatar: avatarUrl,
                role_id: data.role_id,
            });

            Swal.fire({
                title: 'Thành công',
                text: 'Thêm mới tài khoản thành công',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/admin/account');
            });
        } catch (error) {
            console.error('Error adding account:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add account.',
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
                                    <h1 className="mb-4">Thêm tài khoản</h1>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="accountName" className="form-label">
                                                Tên người dùng
                                            </label>
                                            <Controller
                                                control={control}
                                                name="accountName"
                                                rules={{ required: 'Tên người dùng là bắt buộc' }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <input
                                                        type="text"
                                                        className={`form-control ${
                                                            errors.accountName ? 'is-invalid' : ''
                                                        }`}
                                                        id="accountName"
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )}
                                            />
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
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="accountPassword" className="form-label">
                                                Mật khẩu
                                            </label>
                                            <Controller
                                                control={control}
                                                name="accountPassword"
                                                rules={{ required: 'Mật khẩu là bắt buộc' }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <input
                                                        type="password"
                                                        className={`form-control ${
                                                            errors.accountPassword ? 'is-invalid' : ''
                                                        }`}
                                                        id="accountPassword"
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )}
                                            />
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
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="role_id" className="form-label">
                                                Vai trò
                                            </label>
                                            <Controller
                                                control={control}
                                                name="role_id"
rules={{ required: 'Vai trò là bắt buộc' }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <select
                                                        className={`form-control ${errors.role_id ? 'is-invalid' : ''}`}
                                                        id="role_id"
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                    >
                                                        <option value="">Chọn vai trò</option>
                                                        {roles.map((role) => (
                                                            <option key={role.id} value={role.id}>
                                                                {role.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="accountAvatar" className="form-label">
                                                Ảnh đại diện
                                            </label>
                                            <Controller
                                                control={control}
                                                name="accountAvatar"
                                                rules={{ required: 'Ảnh đại diện là bắt buộc' }}
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
                                        </div>
<button type="submit" className="btn btn-primary">
                                            Thêm tài khoản
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

export default AddAccount;