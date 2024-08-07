import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useForm, Controller } from 'react-hook-form';
import { getDatabase, ref, set } from 'firebase/database';
import Swal from 'sweetalert2';
import { app } from '../../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            content: '',
        },
    });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const db = getDatabase(app);
        const contactsRef = ref(db, 'contacts/' + Date.now());
        try {
            await set(contactsRef, {
                name: data.name,
                email: data.email,
                content: data.content
            });
            console.log("Contact:", data);
            
            Swal.fire({
                title: 'Thành công!',
                text: 'Tin nhắn của bạn đã được gửi thành công!',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/contact');
            });
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
            Swal.fire({
                title: 'Lỗi!',
                text: 'Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div>
            <Header />
            <div>
            <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31432.9454360019!2d105.7372065078912!3d10.0070960007009!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0882139720a77%3A0x3916a227d0b95a64!2sFPT%20University!5e0!3m2!1svi!2s!4v1721295274727!5m2!1svi!2s"
                        width={800} height={600} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
                <section className="contact spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-6 col-sm-5">
                                <div className="contact__widget">
                                    <div className="contact__widget__item">
                                        <h4>Contact Us</h4>
                                        <ul>
                                            <li>0902 451 251</li>
                                            <li>nguoihuongdoituong@gmail.com</li>
</ul>
                                    </div>
                                    <div className="contact__widget__item">
                                        <h4>Địa chỉ</h4>
                                        <p>
                                            128 người hướng đối tượng,
                                            <br />
                                            Cần thơ
                                        </p>
                                    </div>
                                    <div className="contact__widget__time">
                                        <h4>Mở cửa</h4>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="contact__widget__time__item">
                                                    <ul>
                                                        <li>Thứ 2 - Thứ 6</li>
                                                        <li>
                                                            <span>8 am - 9 pm</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="contact__widget__time__item">
                                                    <ul>
                                                        <li>Thứ 7 - Chủ nhật</li>
                                                        <li>
                                                            <span>8 am - 9 pm</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 offset-lg-1 col-md-6 col-sm-7">
                                <div className="contact__form">
                                    <h2>Thông tin liên hệ</h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label">
                                                Tên khách hàng
                                            </label>
                                            <Controller
                                                name="name"
control={control}
                                                rules={{ required: 'Tên khách hàng không được để trống' }}
                                                render={({ field }) => (
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                        id="name"
                                                        {...field}
                                                        placeholder="Tên của bạn"
                                                    />
                                                )}
                                            />
                                            {errors.name && (
                                                <div className="invalid-feedback">{errors.name.message}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email" className="form-label">
                                                Email
                                            </label>
                                            <Controller
                                                name="email"
                                                control={control}
                                                rules={{
                                                    required: 'Email không được để trống',
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: 'Email không hợp lệ',
                                                    },
                                                }}
                                                render={({ field }) => (
                                                    <input
                                                        type="email"
                                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                        id="email"
                                                        {...field}
                                                        placeholder="Email của bạn"
                                                    />
                                                )}
                                            />
                                            {errors.email && (
                                                <div className="invalid-feedback">{errors.email.message}</div>
                                            )}
</div>
                                        <div className="form-group">
                                            <label htmlFor="content" className="form-label">
                                                Nội dung
                                            </label>
                                            <Controller
                                                name="content"
                                                control={control}
                                                rules={{ required: 'Nội dung không được để trống' }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <textarea
                                                        id="content"
                                                        className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                        placeholder="Nội dung tin nhắn"
                                                        rows="4"
                                                    />
                                                )}
                                            />
                                            {errors.content && (
                                                <div className="invalid-feedback">{errors.content.message}</div>
                                            )}
                                        </div>
                                        <button type="submit">Gửi lời nhắn</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;