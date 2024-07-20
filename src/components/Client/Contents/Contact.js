import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const AboutUs = () => {

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
                                        <p>128 người hướng đối tượng,<br />Cần thơ</p>
                                    </div>
                                    <div className="contact__widget__time">
                                        <h4>Mở cửa</h4>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="contact__widget__time__item">
                                                    <ul>
                                                        <li>Thứ 2 - Thứ 6</li>
                                                        <li><span>8 am - 9 pm</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="contact__widget__time__item">
                                                    <ul>
                                                        <li>Thứ 7 - Chủ nhật</li>
                                                        <li><span>8 am - 9 pm</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 offset-lg-1 col-md-6 col-sm-7">
                                <div className="contact__form">
                                    <h2>Câu hỏi?</h2>
                                    <form action="#">
                                        <input type="text" placeholder="Tên của bạn" />
                                        <input type="text" placeholder="Email của bạn" />
                                        <textarea placeholder="Lời nhắn nhủ" defaultValue={""} />
                                        <button type="submit">Gữi lời nhắn</button>
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
