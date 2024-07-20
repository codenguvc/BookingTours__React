import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const AboutUs = () => {
    const breadcrumb = `${process.env.PUBLIC_URL}/assets/Client/img/breadcrumb-bg.jpg`;
    return (
        <div>
            <Header />
            <div>
                <div className="breadcrumb-option set-bg" style={{ backgroundImage: `url(${breadcrumb})` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="breadcrumb__text">
                                    <h1>Tin Tức</h1>
                                    <div className="breadcrumb__links">
                                        <a href="/">Trang Chủ</a>
                                        <span>Tin Tức</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="blog spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-8">
                                <div className="blog__item__large">
                                    <div className="blog__item__large__pic">
                                        <img src="/assets/Client/img/blog/blog-large.jpg" alt="Large Blog" />
                                        <div className="tag">Du Lịch</div>
                                    </div>
                                    <div className="blog__item__large__text">
                                        <p><i className="fa fa-clock-o" /> Ngày 01 tháng 3, 2019</p>
                                        <h4><a href="#">Khám Phá Các Điểm Đến Du Lịch Hấp Dẫn Nhất</a></h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="blog__item">
                                            <div className="blog__item__pic">
                                                <img src="/assets/Client/img/blog/blog-1.jpg" alt="Blog 1" />
                                                <div className="tag">Điểm Đến</div>
                                            </div>
                                            <div className="blog__item__text">
                                                <p><i className="fa fa-clock-o" /> Ngày 02 tháng 3, 2019</p>
                                                <h5><a href="#">Những Điểm Du Lịch Hấp Dẫn Tại Châu Âu</a></h5>
                                            </div>
</div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="blog__item">
                                            <div className="blog__item__pic">
                                                <img src="/assets/Client/img/blog/blog-2.jpg" alt="Blog 2" />
                                                <div className="tag">Khám Phá</div>
                                            </div>
                                            <div className="blog__item__text">
                                                <p><i className="fa fa-clock-o" /> Ngày 03 tháng 3, 2019</p>
                                                <h5><a href="#">Những Địa Điểm Du Lịch Mới Nổi Năm 2019</a></h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="blog__item">
                                            <div className="blog__item__pic">
                                                <img src="/assets/Client/img/blog/blog-3.jpg" alt="Blog 3" />
                                                <div className="tag">Điểm Đến</div>
                                            </div>
                                            <div className="blog__item__text">
                                                <p><i className="fa fa-clock-o" /> Ngày 04 tháng 3, 2019</p>
                                                <h5><a href="#">Top 10 Điểm Du Lịch Thú Vị Ở Đông Nam Á</a></h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="blog__item">
                                            <div className="blog__item__pic">
                                                <img src="/assets/Client/img/blog/blog-4.jpg" alt="Blog 4" />
                                                <div className="tag">Khám Phá</div>
                                            </div>
                                            <div className="blog__item__text">
                                                <p><i className="fa fa-clock-o" /> Ngày 05 tháng 3, 2019</p>
                                                <h5><a href="#">Khám Phá Các Hòn Đảo Đẹp Nhất Thế Giới</a></h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
<div className="blog__item">
                                            <div className="blog__item__pic">
                                                <img src="/assets/Client/img/blog/blog-5.jpg" alt="Blog 5" />
                                                <div className="tag">Du Lịch</div>
                                            </div>
                                            <div className="blog__item__text">
                                                <p><i className="fa fa-clock-o" /> Ngày 07 tháng 3, 2019</p>
                                                <h5><a href="#">Những Địa Điểm Du Lịch Thú Vị Ở Mỹ</a></h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="blog__item">
                                            <div className="blog__item__pic">
                                                <img src="/assets/Client/img/blog/blog-6.jpg" alt="Blog 6" />
                                                <div className="tag">Điểm Đến</div>
                                            </div>
                                            <div className="blog__item__text">
                                                <p><i className="fa fa-clock-o" /> Ngày 08 tháng 3, 2019</p>
                                                <h5><a href="#">Top 5 Thành Phố Du Lịch Phổ Biến Năm 2019</a></h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="pagination__number blog__pagination">
                                            <a href="#">1</a>
                                            <a href="#">2</a>
                                            <a href="#">Tiếp theo <span className="arrow_right" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="blog__sidebar">
                                    <div className="blog__sidebar__search">
                                        <h4>Tìm Kiếm</h4>
                                        <form action="#">
                                            <input type="text" placeholder="Tìm kiếm..." />
                                            <button type="submit">Tìm kiếm</button>
                                        </form>
                                    </div>
<div className="blog__sidebar__recent">
                                        <h4>Bài Viết Gần Đây</h4>
                                        <a href="#" className="blog__sidebar__recent__item">
                                            <div className="blog__sidebar__recent__item__pic">
                                                <img src="/assets/Client/img/blog/sidebar/recent-1.jpg" alt="Recent 1" />
                                            </div>
                                            <div className="blog__sidebar__recent__item__text">
                                                <h6>Giải pháp du lịch bền vững cho năm 2023</h6>
                                                <div className="time"><i className="fa fa-clock-o" /> Ngày 01 tháng 3, 2019</div>
                                            </div>
                                        </a>
                                        <a href="#" className="blog__sidebar__recent__item">
                                            <div className="blog__sidebar__recent__item__pic">
                                                <img src="/assets/Client/img/blog/sidebar/recent-2.jpg" alt="Recent 2" />
                                            </div>
                                            <div className="blog__sidebar__recent__item__text">
                                                <h6>Những địa điểm du lịch phổ biến nhất ở Việt Nam</h6>
                                                <div className="time"><i className="fa fa-clock-o" /> Ngày 02 tháng 3, 2019</div>
                                            </div>
                                        </a>
                                        <a href="#" className="blog__sidebar__recent__item">
                                            <div className="blog__sidebar__recent__item__pic">
                                                <img src="/assets/Client/img/blog/sidebar/recent-3.jpg" alt="Recent 3" />
                                            </div>
                                            <div className="blog__sidebar__recent__item__text">
                                                <h6>Khám phá các điểm đến nổi bật ở Đông Nam Á</h6>
                                                <div className="time"><i className="fa fa-clock-o" /> Ngày 03 tháng 3, 2019</div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="blog__sidebar__categories">
                                        <h4>Danh Mục</h4>
                                        <ul>
                                            <li><a href="#">Phong Cách Sống</a></li>
                                            <li><a href="#">Nhiếp Ảnh</a></li>
<li><a href="#">Công Việc</a></li>
                                            <li><a href="#">Du Lịch</a></li>
                                            <li><a href="#">Thể Thao</a></li>
                                        </ul>
                                    </div>
                                    <div className="blog__sidebar__comment">
                                        <h4>Bình Luận Gần Đây</h4>
                                        <p>Tham gia một triển lãm thương mại có thể là một cách hiệu quả để quảng bá công ty và dịch vụ của bạn</p>
                                        <span>Giải pháp du lịch bền vững cho năm 2023</span>
                                        <p>Khi tôi mới bắt đầu lớp 6, tôi có công việc đầu tiên là giao báo. Ôi, tôi đã rất phấn khích.</p>
                                        <span>Những địa điểm du lịch phổ biến nhất ở Việt Nam</span>
                                        <p>Các dịch vụ đặt tour du lịch của chúng tôi luôn là lựa chọn hàng đầu khi bạn chuẩn bị cho chuyến đi của mình</p>
                                        <span>Khám phá các điểm đến nổi bật ở Đông Nam Á</span>
                                    </div>
                                    <div className="blog__sidebar__tags">
                                        <h4>Thẻ Phổ Biến</h4>
                                        <a href="#">Sáng Tạo</a>
                                        <a href="#">Độc Đáo</a>
                                        <a href="#">Du Lịch</a>
                                        <a href="#">Nhà Hàng</a>
                                        <a href="#">Mẫu Template</a>
                                        <a href="#">Ý Tưởng</a>
                                        <a href="#">Khách Sạn</a>
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