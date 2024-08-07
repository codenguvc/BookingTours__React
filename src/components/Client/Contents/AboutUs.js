import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const AboutUs = () => {
    const breadcrumb = `${process.env.PUBLIC_URL}/assets/Client/img/breadcrumb-bg.jpg`;
    const chooseus = `${process.env.PUBLIC_URL}/assets/Client/img/chooseus-bg.jpg`;

    return (
        <div>
            <Header />
            <div>
                <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${breadcrumb})` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="breadcrumb__text">
                                    <h1>Về Chúng Tôi</h1>
                                    <div className="breadcrumb__links">
                                        <a href="/">Trang chủ</a>
                                        <span>Về Chúng Tôi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="about spad">
                    <div className="container">
                        <div className="about__content">
                            <div className="row">
                                <div className="col-lg-5">
                                    <div className="section-title">
                                        <h5>Chuyên Môn Của Chúng Tôi</h5>
                                        <h2>Chào Mừng Đến Với Dịch Vụ Đặt Tour Du Lịch Của Chúng Tôi</h2>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="about__text">
                                        <p>Chúng tôi chuyên cung cấp các dịch vụ đặt tour du lịch chất lượng cao với các gói dịch vụ đa dạng. Từ các chuyến đi thư giãn ở bãi biển đến các chuyến khám phá văn hóa, chúng tôi đảm bảo rằng bạn sẽ có một trải nghiệm không thể quên.</p>
                                        <p>Chúng tôi cam kết mang đến cho bạn những gói tour tốt nhất với giá cả hợp lý và dịch vụ khách hàng tận tâm. Hãy để chúng tôi giúp bạn lên kế hoạch cho chuyến đi hoàn hảo của bạn.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-6">
                                <div className="services__item">
                                    <img src="/assets/Client/img/services/services-1.png" alt />
<h4>Wifi Miễn Phí</h4>
                                    <p>Chúng tôi cung cấp kết nối internet tốc độ cao miễn phí trong suốt chuyến đi của bạn.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6">
                                <div className="services__item">
                                    <img src="/assets/Client/img/services/services-2.png" alt />
                                    <h4>Bể Bơi Cao Cấp</h4>
                                    <p>Thư giãn và tận hưởng bể bơi cao cấp tại các điểm đến của chúng tôi.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6">
                                <div className="services__item">
                                    <img src="/assets/Client/img/services/services-3.png" alt />
                                    <h4>Máy Pha Cà Phê</h4>
                                    <p>Thưởng thức cà phê tươi ngon ngay tại chỗ với dịch vụ máy pha cà phê của chúng tôi.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6">
                                <div className="services__item">
                                    <img src="/assets/Client/img/services/services-4.png" alt />
                                    <h4>Quầy Rượu Bar</h4>
                                    <p>Thư giãn tại quầy rượu bar với những loại rượu và cocktail đa dạng.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6">
                                <div className="services__item">
                                    <img src="/assets/Client/img/services/services-5.png" alt />
                                    <h4>TV HD</h4>
                                    <p>Chúng tôi cung cấp TV HD để bạn có thể xem các chương trình yêu thích của mình.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6">
                                <div className="services__item">
                                    <img src="/assets/Client/img/services/services-6.png" alt />
                                    <h4>Nhà Hàng</h4>
                                    <p>Thưởng thức các món ăn ngon tại nhà hàng của chúng tôi với thực đơn phong phú.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="chooseus spad set-bg" style={{ backgroundImage: `url(${chooseus})` }}>
<div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8 text-center">
                                <div className="chooseus__text">
                                    <div className="section-title">
                                        <h5>TẠI SAO CHỌN CHÚNG TÔI</h5>
                                        <h2>Liên hệ ngay để nhận ưu đãi mới nhất và đặt tour tiếp theo</h2>
                                    </div>
                                    <a href="#" className="primary-btn">Đặt Ngay</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="history spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title history-title">
                                    <h5>Lịch Sử Của Chúng Tôi</h5>
                                    <h2>Khám Phá Dịch Vụ Đặt Tour Của Chúng Tôi</h2>
                                </div>
                            </div>
                        </div>
                        <div className="history__content">
                            <div className="row">
                                <div className="col-lg-5 col-md-5">
                                    <div className="history__item left__item">
                                        <div className="history__date" />
                                        <span>11 Tháng 12, 1990</span>
                                        <h4>Khởi Đầu Dịch Vụ Đặt Tour</h4>
                                        <img src="/assets/Client/img/history/history-1.jpg" alt />
                                        <p>Chúng tôi bắt đầu hành trình của mình bằng việc cung cấp dịch vụ đặt tour chất lượng cao cho khách hàng.</p>
                                    </div>
                                    <div className="history__item left__item mb-0">
                                        <div className="history__date" />
                                        <span>29 Tháng 1, 1990</span>
                                        <h4>Khám Phá Những Điểm Đến Mới</h4>
                                        <img src="/assets/Client/img/history/history-3.jpg" alt />
                                        <p>Chúng tôi liên tục mở rộng danh sách các điểm đến hấp dẫn để đáp ứng nhu cầu của khách hàng.</p>
                                    </div>
                                </div>
                                <div className="col-lg-5 offset-lg-2 col-md-5 offset-md-2">
<div className="history__item right__first__item">
                                        <div className="history__date" />
                                        <span>08 Tháng 3, 1990</span>
                                        <h4>Giải Thưởng Dịch Vụ Xuất Sắc Nhất</h4>
                                        <img src="/assets/Client/img/history/history-2.jpg" alt />
                                        <p>Chúng tôi vinh dự nhận giải thưởng Dịch Vụ Xuất Sắc Nhất trong năm.</p>
                                    </div>
                                    <div className="history__item mb-0">
                                        <div className="history__date" />
                                        <span>06 Tháng 7, 1990</span>
                                        <h4>Mở Rộng Dịch Vụ Đến nước ngoài</h4>
                                        <img src="/assets/Client/img/history/history-4.jpg" alt />
                                        <p>Chúng tôi mở rộng dịch vụ của mình đến nước ngoài, mang đến cho khách hàng trải nghiệm mới mẻ.</p>
                                    </div>
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