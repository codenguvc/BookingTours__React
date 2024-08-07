import React, { useState, useEffect } from 'react';
import Navbar from '../../admin/Navbar';
import Sidebar from '../../admin/Sidebar';
import Footer from '../../admin/Footer';
import { getDatabase, ref, set, get } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app, storage } from '../../../firebase/firebase';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import { useForm, Controller } from 'react-hook-form';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const ProductEdit = () => {
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
        setFocus,
    } = useForm();

    const navigate = useNavigate();
    const startDate = watch('startDate');
    const [categories, setCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const db = getDatabase(app);
            const categoriesRef = ref(db, 'categories');
            try {
                const snapshot = await get(categoriesRef);
                if (snapshot.exists()) {
                    setCategories(Object.entries(snapshot.val()).map(([id, category]) => ({ id, ...category })));
                } else {
                    console.log('No categories available');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchProduct = async () => {
            const db = getDatabase(app);
            const productRef = ref(db, `products/${id}`);
            try {
                const snapshot = await get(productRef);
                if (snapshot.exists()) {
                    const product = snapshot.val();
                    console.log('Fetched product:', product); // Kiểm tra dữ liệu nhận được
                    setValue('productName', product.productName);
                    setValue('category', product.category);
                    setValue('price', product.price);
                    setValue('quantity', product.quantity);
                    setValue('startDate', product.startDate);
                    setValue('endDate', product.endDate);
                    setValue('description', product.description); // Set the product description
                    setCurrentImage(product.productImage); // Set the current image URL
                } else {
                    console.log('No product found');
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchCategories();
        fetchProduct();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        if (imageFile) {
            const imageRef = storageRef(storage, `images/${v4()}`);
            try {
                await uploadBytes(imageRef, imageFile);
                const imageUrl = await getDownloadURL(imageRef);
                data.productImage = imageUrl;
            } catch (error) {
                console.error('Error uploading file:', error);
                Swal.fire('Upload failed', 'Error uploading file', 'error');
                return;
            }
        } else {
            data.productImage = currentImage;
        }

        const db = getDatabase(app);
        try {
            await set(ref(db, `products/${id}`), data);
            Swal.fire('Success', 'Product updated successfully', 'success').then(() => {
                navigate('/admin/product');
            });
        } catch (error) {
            console.error('Error saving data:', error);
            Swal.fire('Save failed', 'Error saving data', 'error');
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
                                    <h1>Sửa chuyến đi</h1>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="productName" className="form-label">
                                                Tên chuyến đi
                                            </label>
                                            <Controller
                                                name="productName"
                                                control={control}
                                                rules={{ required: 'Tên chuyến đi không được để trống' }}
                                                render={({ field }) => (
                                                    <input
                                                        type="text"
                                                        className={`form-control ${
                                                            errors.productName ? 'is-invalid' : ''
                                                        }`}
                                                        id="productName"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors.productName && (
                                                <div className="invalid-feedback">{errors.productName.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="productImage" className="form-label">
                                                Hình ảnh
                                            </label>
                                            <input
                                                type="file"
                                                className={`form-control ${errors.productImage ? 'is-invalid' : ''}`}
                                                id="productImage"
                                                onChange={(e) => setImageFile(e.target.files[0])}
                                            />
                                            {currentImage && (
                                                <div className="mt-2">
                                                    <img
                                                        src={currentImage}
                                                        alt="Current"
                                                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                                                    />
                                                </div>
                                            )}
                                            {errors.productImage && (
                                                <div className="invalid-feedback">{errors.productImage.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="category" className="form-label">
                                                Danh mục
                                            </label>
                                            <Controller
                                                name="category"
                                                control={control}
                                                rules={{ required: 'Danh mục không được để trống' }}
                                                render={({ field }) => (
                                                    <select
                                                        className={`form-control ${
                                                            errors.category ? 'is-invalid' : ''
                                                        }`}
                                                        id="category"
                                                        {...field}
                                                    >
                                                        <option value="">Chọn danh mục</option>
                                                        {categories.map((cat) => (
                                                            <option key={cat.id} value={cat.id}>
                                                                {cat.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                            />
                                            {errors.category && (
                                                <div className="invalid-feedback">{errors.category.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="price" className="form-label">
                                                Giá
                                            </label>
                                            <Controller
                                                name="price"
                                                control={control}
                                                rules={{
                                                    required: 'Giá không được để trống',
                                                    min: { value: 0, message: 'Giá phải lớn hơn hoặc bằng 0' },
                                                }}
                                                render={({ field }) => (
                                                    <input
                                                        type="number"
                                                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                                        id="price"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors.price && (
                                                <div className="invalid-feedback">{errors.price.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="quantity" className="form-label">
                                                Số lượng người
                                            </label>
                                            <Controller
                                                name="quantity"
                                                control={control}
                                                rules={{
                                                    required: 'Số lượng không được để trống',
                                                    min: { value: 1, message: 'Số lượng không được nhỏ hơn 1' },
                                                }}
                                                render={({ field }) => (
                                                    <input
                                                        type="number"
                                                        className={`form-control ${
                                                            errors.quantity ? 'is-invalid' : ''
                                                        }`}
                                                        id="quantity"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors.quantity && (
                                                <div className="invalid-feedback">{errors.quantity.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="startDate" className="form-label">
                                                Ngày bắt đầu
                                            </label>
                                            <Controller
                                                name="startDate"
                                                control={control}
                                                rules={{
                                                    required: 'Ngày bắt đầu không được để trống',
                                                    validate: (value) => {
                                                        const today = new Date().toISOString().split('T')[0];
                                                        return (
                                                            value >= today ||
                                                            'Ngày bắt đầu không được nhỏ hơn ngày hiện tại'
                                                        );
                                                    },
                                                }}
                                                render={({ field }) => (
                                                    <input
                                                        type="date"
                                                        className={`form-control ${
                                                            errors.startDate ? 'is-invalid' : ''
                                                        }`}
                                                        id="startDate"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors.startDate && (
                                                <div className="invalid-feedback">{errors.startDate.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="endDate" className="form-label">
                                                Ngày kết thúc
                                            </label>
                                            <Controller
                                                name="endDate"
                                                control={control}
                                                rules={{
                                                    required: 'Ngày kết thúc không được để trống',
                                                    validate: (value) => {
                                                        const startDate = watch('startDate');
                                                        return (
                                                            value >= startDate ||
                                                            'Ngày kết thúc không được nhỏ hơn ngày bắt đầu'
                                                        );
                                                    },
                                                }}
                                                render={({ field }) => (
                                                    <input
                                                        type="date"
                                                        className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                                                        id="endDate"
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors.endDate && (
                                                <div className="invalid-feedback">{errors.endDate.message}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">
                                                Mô tả chuyến đi
                                            </label>
                                            <Controller
                                                name="description"
                                                control={control}
                                                rules={{ required: 'Mô tả không được để trống' }}
                                                render={({ field }) => (
                                                    <textarea
                                                        className={`form-control ${
                                                            errors.description ? 'is-invalid' : ''
                                                        }`}
                                                        id="description"
                                                        rows="4" // Adjust the number of rows as needed
                                                        {...field}
                                                    />
                                                )}
                                            />
                                            {errors.description && (
                                                <div className="invalid-feedback">{errors.description.message}</div>
                                            )}
                                        </div>

                                        <button type="submit" className="btn btn-primary">
                                            Cập nhật
                                        </button>
                                        <NavLink to="/admin/product" className="btn btn-secondary ms-2">
                                            Hủy
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

export default ProductEdit;
