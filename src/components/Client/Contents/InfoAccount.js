import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';

import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { fetchUserData, saveUserData } from '../../../firebase/util';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert2';

function InforAccount() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [image, setImage] = useState(currentUser?.photoURL || null);
    const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (currentUser) {
            fetchUserData(currentUser.uid).then((data) => {
                if (data) {
                    setPhone(data.phone || '');
                    setAddress(data.address || '');
                }
            });
        }
    }, [currentUser]);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (currentUser) {
            const auth = getAuth();
            const storage = getStorage();
            let photoURL = currentUser.photoURL;

            if (imageFile) {
                const storageRef = ref(storage, `users/${currentUser.uid}/profile.jpg`);
                await uploadBytes(storageRef, imageFile);
                photoURL = await getDownloadURL(storageRef);
            }

            await updateProfile(auth.currentUser, {
                displayName: displayName,
                photoURL: photoURL,
            });

            const existingData = await fetchUserData(currentUser.uid);
            await saveUserData(currentUser.uid, {
                phone,
                address,
                photoURL: photoURL,
                displayName,
                email: currentUser.email || '',
                role_id: existingData.role_id, // Giữ nguyên role_id
            });

            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thông tin thành công!',
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            });
        }
    };

    return (
        <div>
            <Header />
            <div className="container mt-3">
                <div className="row align-items-center">
                    <div className="col-md-6 text-center">
                        <div className="mb-4">
                            <img
                                src={image || 'path_to_your_image.jpg'}
                                alt="Nhấn vào đây cập nhật ảnh...!"
                                className="img-fluid rounded-circle"
                                style={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
                                onClick={handleImageClick}
                            />
                            <input
                                type="file"
                                className="d-none"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className="mb-4">
                            <p>Tên đăng nhập: {currentUser?.displayName || 'lorem'}</p>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
                            <h2 className="text-center mb-4" style={{ fontSize: '2rem' }}>
                                Thông tin tài khoản
                            </h2>
                            <form onSubmit={handleUpdate}>
                                <div className="form-group mb-3">
                                    <label className="name" style={{ fontSize: '1rem' }}>
                                        Tên người dùng:
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="Nhập tên người dùng"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="email" style={{ fontSize: '1rem' }}>
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Nhập email"
                                        value={currentUser?.email || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="phone" style={{ fontSize: '1rem' }}>
                                        Số điện thoại:
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Nhập số điện thoại"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="address" style={{ fontSize: '1rem' }}>
                                        Địa chỉ:
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="form-control"
                                        placeholder="Nhập địa chỉ"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-warning w-100">
                                        Cập nhật
                                    </button>
                                    <NavLink to="/" className="btn btn-secondary w-100">
                                        Quay lại
                                    </NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default InforAccount;
