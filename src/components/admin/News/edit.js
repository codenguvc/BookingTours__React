import React, { useEffect, useState } from 'react';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import Footer from '../../admin/Footer';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { app } from '../../../firebase/firebase';
import { getDatabase, ref, get, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert2';

const NewsEdit = () => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        setFocus,
    } = useForm();
    const navigate = useNavigate();
    const { newId } = useParams();
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchNew = async () => {
            const db = getDatabase(app);
            const newsRef = ref(db, 'news/' + newId);
            try {
                const snapshot = await get(newsRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setValue('title', data.title);
                    setValue('image', data.img);
                    setValue('publishDate', data.date);
                    setValue('status', data.condition);
                    setValue('content', data.content);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'News not found.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate('/admin/news');
                    });
                }
            } catch (error) {
                console.error('Error fetching news data:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch news data.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        };

        fetchNew();
    }, [newId, navigate, setValue]);

    const onSubmit = async (data) => {
        const db = getDatabase(app);
        const newsRef = ref(db, 'news/' + newId);

        let imageUrl = data.image;

        if (imageFile) {
            const storage = getStorage(app);
            const imageStorageRef = storageRef(storage, `images/news/${newId}/${imageFile.name}`);
            await uploadBytes(imageStorageRef, imageFile);
            imageUrl = await getDownloadURL(imageStorageRef);
        }

        try {
            await set(newsRef, {
                title: data.title,
                condition: data.status,
                date: data.publishDate,
                img: imageUrl,
                content: data.content,
            });
            Swal.fire({
                title: 'Success!',
                text: 'News has been updated.',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/admin/news');
            });
        } catch (error) {
            console.error('Error updating news:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update news.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    useEffect(() => {
        if (errors) {
            const firstError = Object.keys(errors)[0];
            if (firstError) {
                document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setFocus(firstError);
            }
        }
    }, [errors, setFocus]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

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
                                    <h1>Sửa tin tức</h1>
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
                                            <label htmlFor="image" className="form-label">
                                                Hình ảnh
                                            </label>
                                            <Controller
                                                name="image"
                                                control={control}
                                                render={({ field: { onChange, onBlur } }) => (
                                                    <input
                                                        type="file"
                                                        className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                                        id="image"
                                                        onChange={(e) => {
                                                            handleImageChange(e);
                                                            onChange(e);
                                                        }}
                                                        onBlur={onBlur}
                                                    />
                                                )}
                                            />
                                            {errors.image && (
                                                <div className="invalid-feedback">{errors.image.message}</div>
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
                                                render={({ field }) => (
                                                    <textarea
                                                        className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                                                        id="content"
                                                        rows="5"
                                                        {...field}
                                                    ></textarea>
                                                )}
                                            />
                                            {errors.content && (
                                                <div className="invalid-feedback">{errors.content.message}</div>
                                            )}
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Sửa tin tức
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

export default NewsEdit;
