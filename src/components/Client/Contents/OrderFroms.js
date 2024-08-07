import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { useAuth } from '../../../context/authContext';
import { app } from '../../../firebase/firebase';
import { getDatabase, ref, set, push } from 'firebase/database';
import Swal from 'sweetalert2';

const OrderForm = () => {
    const { currentUser } = useAuth();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const title = query.get('name') || '';
    const price = query.get('price') || '';
    const startDate = query.get('startDate') || '';

    const today = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const bookingDate = event.target.bookingDate.value;
        const paymentMethod = event.target.paymentMethod.value;

        if (!currentUser.displayName) {
            Swal.fire({
                icon: 'error',
                title: 'Thông tin thiếu',
                text: 'Vui lòng cập nhật tên khách hàng trước khi đặt hàng.',
            }).then(() => {
                navigate('/InfoAccount');
            });
            return;
        }

        const newOrder = {
            user_id: currentUser.uid,
            email: currentUser.email,
            tour_id: title,
            bookingdate: bookingDate,
            total_price: parseFloat(price),
            condition: 'Chờ xử lý',
            paymentMethod,
        };

        try {
            const db = getDatabase(app);
            const ordersRef = ref(db, 'orders');
            const newOrderRef = push(ordersRef);
            await set(newOrderRef, newOrder);

            Swal.fire('Thành công!', 'Đơn hàng đã được thêm!', 'success');

            navigate('/');
        } catch (error) {
            console.error('Error adding order:', error);
            Swal.fire('Lỗi', 'Có lỗi xảy ra khi thêm đơn hàng!', 'error');
        }
    };

    return (
        <div>
            <Header />
            <div className="container mt-5 mb-5">
                <h2 className="mb-4">Thanh Toán</h2>
                <form className="p-4 border rounded shadow-sm bg-white" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="customerName" className="form-label">
                            Tên khách hàng:
                        </label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            className="form-control"
                            placeholder="Nhập tên khách hàng"
                            value={currentUser?.displayName || ''}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
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
                    <div className="mb-3">
                        <label htmlFor="tripName" className="form-label">
                            Tên chuyến đi:
                        </label>
                        <input
                            type="text"
                            id="tripName"
                            name="tripName"
                            className="form-control"
                            value={title}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bookingDate" className="form-label">
                            Ngày đặt:
                        </label>
                        <input
                            type="date"
                            id="bookingDate"
                            name="bookingDate"
                            className="form-control"
                            defaultValue={today}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="totalAmount" className="form-label">
                            Tổng tiền:
                        </label>
                        <input
                            type="number"
                            id="totalAmount"
                            name="totalAmount"
                            className="form-control"
                            value={price}
                            readOnly
                        />
                    </div>
                    <fieldset className="mb-3">
                        <legend className="form-label">Hình thức thanh toán:</legend>
                        <div className="form-check">
                            <input
                                type="radio"
                                id="paymentBankTransfer"
                                name="paymentMethod"
                                value="bankTransfer"
                                className="form-check-input"
                            />
                            <label htmlFor="paymentBankTransfer" className="form-check-label">
                                Chuyển khoản
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                id="paymentDirect"
                                name="paymentMethod"
                                value="direct"
                                className="form-check-input"
                            />
                            <label htmlFor="paymentDirect" className="form-check-label">
                                Thanh toán trực tiếp
                            </label>
                        </div>
                    </fieldset>
                    <button type="submit" className="btn btn-primary">
                        Thanh Toán
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default OrderForm;
