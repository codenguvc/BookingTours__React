import React from "react";

const Footer = () => {
    const footerImg = `${process.env.PUBLIC_URL}/assets/Client/img/footer-bg.jpg`
    return (
        <footer className="footer set-bg" style={{ backgroundImage: `url(${footerImg})` }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="logo__carousel owl-carousel">
                            <div className="logo__carousel__item">
                                <a href="#"><img src="/assets/Client/img/logo/logo-1.png" alt /></a>
                            </div>
                            <div className="logo__carousel__item">
                                <a href="#"><img src="/assets/Client/img/logo/logo-2.png" alt /></a>
                            </div>
                            <div className="logo__carousel__item">
                                <a href="#"><img src="/assets/Client/img/logo/logo-3.png" alt /></a>
                            </div>
                            <div className="logo__carousel__item">
                                <a href="#"><img src="/assets/Client/img/logo/logo-4.png" alt /></a>
                            </div>
                            <div className="logo__carousel__item">
                                <a href="#"><img src="/assets/Client/img/logo/logo-5.png" alt /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="footer__content">
                    <div className="row ">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="footer__about">
                                <div className="footer__logo">
                                    <a href="#"><img src="/assets/Client/img/logo.png" alt /></a>
                                </div>
                                <h4>(123) 456-78-91096</h4>
                                <ul>
                                    <li>128 Người hướng đối tượng</li>
                                    <li>nhdt@gmail.com</li>
                                </ul>
                                <div className="footer__social">
                                    <a href="#"><i className="fa fa-facebook" /></a>
                                    <a href="#"><i className="fa fa-twitter" /></a>
                                    <a href="#"><i className="fa fa-linkedin" /></a>
                                    <a href="#"><i className="fa fa-youtube-play" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1 col-md-5 offset-md-1 col-sm-6">
                            <div className="footer__widget">
<h4>Đường dẫn</h4>
                                <ul>
                                    <li><a href="/">Trang chủ</a></li>
                                    <li><a href="/product">Chuyến đi</a></li>
                                    <li><a href="/aboutus">Về chúng tôi</a></li>
                                    <li><a href="/news">Tin tức</a></li>
                                    <li><a href="/contact">Liên hệ</a></li>
                                </ul>
                                <ul>
                                    <li><a href="#">Dịch vụ</a></li>
                                    <li><a href="#">Vé du lịch</a></li>
                                    <li><a href="#">Nhà hàng</a></li>
                                    <li><a href="#">Thanh toán</a></li>
                                    <li><a href="#">Sự kiện</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-8 col-sm-12">
                            <div className="footer__newslatter">
                                <h4>Hãy đăng kí để nhận được thông báo sớm nhất</h4>
                                <form action="#">
                                    <input type="text" placeholder="Email của bạn" />
                                    <button type="submit">Đăng kí ngay</button>
                                </form>
                                <div className="footer__newslatter__find">
                                    <h5>Tìm đến chúng tôi:</h5>
                                    <div className="footer__newslatter__find__links">
                                        <a href="#"><i className="fa fa-tripadvisor" /></a>
                                        <a href="#"><i className="fa fa-map-o" /></a>
                                        <a href="#"><i className="fa fa-dribbble" /></a>
                                        <a href="#"><i className="fa fa-forumbee" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             
            </div>
        </footer>
    )
}
export default Footer;