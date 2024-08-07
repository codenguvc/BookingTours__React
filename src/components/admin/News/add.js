import React, { useEffect } from 'react';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import Footer from '../../admin/Footer';
import { app } from '../../../firebase/firebase';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getDatabase, ref, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadFile = async (file) => {
    if (!file) return null;
    try {
        const storage = getStorage(app);
        const fileRef = storageRef(storage, `images/${Date.now()}-${file.name}`);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

const NewsAdd = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        setFocus,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const db = getDatabase(app);
        const newNewsRef = ref(db, 'news/' + Date.now());

        try {
            const imgUrl = data.newImg ? await uploadFile(data.newImg) : null;
            console.log('Image URL:', imgUrl); // Log the image URL
            await set(newNewsRef, {
                title: data.title,
                img: imgUrl,
                content: data.content,
                date: data.publishDate,
                condition: data.status,
            });
            console.log('New added:', data);
            Swal.fire({
                title: 'Thành công',
                text: 'Thêm mới danh mục thành công',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/admin/news');
            });
        } catch (error) {
            console.error('Error adding new:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add new.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    useEffect(() => {
        if (errors.title) {
            setFocus('title');
            document.getElementById('title')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
                                    <h1>Thêm tin tức</h1>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">
                                                Tiêu đề
                                            </label>
                                            <Controller
                                                name="title"
                                                control={control}
                                                rules={{ required: 'Tiêu đề không được để trống' }}
                                                render={({ field }) => (
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                                        id="title"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors.title && (
                                                <div className="invalid-feedback">{errors.title.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="newImg" className="form-label">
                                                Hình ảnh
                                            </label>
                                            <Controller
                                                control={control}
                                                name="newImg"
                                                rules={{ required: 'Hình ảnh là bắt buộc' }}
                                                render={({ field: { onChange, onBlur } }) => (
                                                    <input
                                                        type="file"
                                                        className={`form-control ${errors.newImg ? 'is-invalid' : ''}`}
                                                        id="newImg"
                                                        onChange={(e) => onChange(e.target.files[0])}
                                                        onBlur={onBlur}
                                                    />
                                                )}
                                            />
                                            {errors.newImg && (
                                                <div className="invalid-feedback">{errors.newImg.message}</div>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="publishDate" className="form-label">
                                                Ngày đăng
                                            </label>
                                            <Controller
                                                name="publishDate"
                                                control={control}
                                                rules={{ required: 'Ngày đăng không được để trống' }}
                                                render={({ field }) => (
                                                    <input
                                                        type="date"
                                                        className={`form-control ${
                                                            errors.publishDate ? 'is-invalid' : ''
                                                        }`}
                                                        id="publishDate"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors.publishDate && (
                                                <div className="invalid-feedback">{errors.publishDate.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="status" className="form-label">
                                                Trạng thái
                                            </label>
                                            <Controller
                                                name="status"
                                                control={control}
                                                render={({ field }) => (
                                                    <select
                                                        className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                                        id="status"
                                                        {...field}
                                                    >
                                                        <option value="">Chọn trạng thái</option>
                                                        <option value="Đã đăng">Đã đăng</option>
                                                    </select>
                                                )}
                                            />
                                            {errors.status && (
                                                <div className="invalid-feedback">{errors.status.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="content" className="form-label">
                                                Nội dung
                                            </label>
                                            <Controller
                                                name="content"
                                                control={control}
                                                rules={{ required: 'Nội dung không được để trống' }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <textarea
                                                        className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                                                        id="content"
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )}
                                            />
                                            {errors.content && (
                                                <div className="invalid-feedback">{errors.content.message}</div>
                                            )}
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Thêm tin tức
                                        </button>
                                        <NavLink className="btn btn-secondary ms-2" to="/admin/news">
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

export default NewsAdd;
