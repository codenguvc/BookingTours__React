import React from "react";

const Content = () => {
  const heroImage = `${process.env.PUBLIC_URL}/assets/Client/img/hero.jpg`;

  return (
    <div>
      <section
        className="hero spad set-bg"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero__text">
                <h5>Chào mừng HIROTO</h5>
                <h2>Hãy khám phá những nơi bạn chưa tới.</h2>
              </div>
              <form action="#" className="filter__form">
                <div className="filter__form__item filter__form__item--search">
                  <label htmlFor="location">Địa điểm</label>
                  <div className="filter__form__input">
                    <input
                      type="text"
                      id="location"
                      placeholder="Vui lòng nhập địa điểm"
                    />
                    <span className="icon_search" />
                  </div>
                </div>
                <div className="filter__form__item">
                  <label htmlFor="checkin">Ngày bắt đầu</label>
                  <div className="filter__form__datepicker">
                    <span className="icon_calendar" />
                    <input
                      type="date"
                      id="checkin"
                      className="datepicker_pop check__in"
                      placeholder="Vui lòng chọn ngày bắt đầu"
                    />
                  </div>
                </div>
                <div className="filter__form__item">
                  <label htmlFor="checkout">Ngày kết thúc</label>
                  <div className="filter__form__datepicker">
                    <span className="icon_calendar" />
                    <input
                      type="date"
                      id="checkout"
                      className="datepicker_pop check__out"
                      placeholder="Vui lòng chọn ngày kết thúc"
                    />
                  </div>
                </div>
                <div className="filter__form__item">
                  <label htmlFor="guests">Số lượng khách</label>
                  <div className="filter__form__datepicker">
                    <span className="icon_calendar" />
                    <input
                      type="number"
                      id="guests"
                      className="datepicker_pop check__out"
                      placeholder="Vui lòng nhập số lượng khách"
                    />
                  </div>
                </div>
                <button type="submit">Kiểm tra</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="home-about">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="home__about__text">
                <div className="section-title">
                  <h5>
                    Về chúng tôi<i></i>
                  </h5>
                  <h2>Chào mừng bạn đến với Hiroto</h2>
                </div>
                <p className="first-para">
                  Khám phá những chuyến du lịch tuyệt vời cùng chúng tôi. Với
                  nhiều địa điểm độc đáo và dịch vụ chất lượng, chúng tôi đảm
                  bảo mang đến cho bạn những trải nghiệm đáng nhớ.
                </p>
                <p className="last-para">
                  Đặt tour ngay hôm nay và tận hưởng những ưu đãi hấp dẫn. Chúng
                  tôi cam kết mang lại cho bạn chuyến đi hoàn hảo, không lo lắng
                  và đầy niềm vui.
                </p>

                <img
                  src="/assets/Client/img/home-about/sign.png"
                  alt="Signature"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="home__about__pic">
                <img
                  src="/assets/Client/img/home-about/home-about.png"
                  alt="About Home"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="services__item">
                <img
                  src="/assets/Client/img/services/services-1.png"
                  alt="Service 1"
                />
                <h4>Wi-Fi miễn phí</h4>
                <p>
                  Chúng tôi hiểu rằng kết nối internet là một phần không thể
                  thiếu trong mỗi chuyến đi. Với Wi-Fi miễn phí tại tất cả các
                  điểm đến, bạn sẽ luôn kết nối và chia sẻ những khoảnh khắc
                  tuyệt vời cùng bạn bè và gia đình.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="services__item">
                <img
                  src="/assets/Client/img/services/services-2.png"
                  alt="Service 2"
                />
                <h4>Hồ bơi cao cấp</h4>
                <p>
                  Tận hưởng kỳ nghỉ của bạn với hồ bơi cao cấp tại các điểm đến
                  của chúng tôi. Hãy để chúng tôi giúp bạn chọn lựa từ 4 kiểu hồ
                  bơi độc đáo hoặc tạo nên trải nghiệm riêng hoàn hảo cho bạn.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="services__item">
                <img
                  src="/assets/Client/img/services/services-3.png"
                  alt="Service 3"
                />
                <h4>Máy pha cà phê</h4>
                <p>
                  Khởi đầu ngày mới với ly cà phê thơm ngon từ máy pha cà phê
                  hiện đại tại các địa điểm nghỉ dưỡng của chúng tôi. Dù bạn ở
                  đâu, chúng tôi đảm bảo mang lại sự thoải mái và tiện nghi nhất
                  cho chuyến đi của bạn.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="services__item">
                <img
                  src="/assets/Client/img/services/services-4.png"
                  alt="Service 4"
                />
                <h4>Quầy rượu</h4>
                <p>
                  Thưởng thức các loại rượu vang hảo hạng tại quầy rượu sang
                  trọng của chúng tôi. Chúng tôi mang đến cho bạn không gian lý
                  tưởng để thư giãn và tận hưởng những khoảnh khắc đáng nhớ
                  trong kỳ nghỉ của mình.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="services__item">
                <img
                  src="/assets/Client/img/services/services-5.png"
                  alt="Service 5"
                />
                <h4>TV HD</h4>
                <p>
                  Thư giãn và giải trí với TV HD tại phòng nghỉ của bạn. Chúng
                  tôi cung cấp các kênh truyền hình đa dạng và chất lượng cao,
                  giúp bạn có những giây phút giải trí thoải mái sau một ngày
                  khám phá.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="services__item">
                <img
                  src="/assets/Client/img/services/services-6.png"
                  alt="Service 6"
                />
                <h4>Nhà hàng</h4>
                <p>
                  Thưởng thức ẩm thực tuyệt vời tại các nhà hàng của chúng tôi.
                  Với nhiều món ăn đặc sắc và phong cách phục vụ chuyên nghiệp,
                  chúng tôi đảm bảo mang đến cho bạn trải nghiệm ẩm thực đáng
                  nhớ trong suốt kỳ nghỉ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="latest-blog spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h5>Chuyến đi HOT</h5>
                <h2>Chuyến đi đánh giá cao</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3 d-flex">
              <div className="col-md-6">
                <img
                  src="/assets/Client/img/nhatrang.jpg"
                  className="h-100"
                  alt="Blog Post 1"
                />
              </div>
              <div className="latest__blog__text col-md-6">
                <div className="label">Nha Trang</div>
                <h5>
                  Khám phá vẻ đẹp của Nha Trang với những bãi biển tuyệt vời
                </h5>
                <p className="price">Giá từ: 1.500.000 VNĐ</p>
                <a href="#">Đọc thêm</a>
              </div>
            </div>
            <div className="col-md-6 mb-3 d-flex">
              <div className="col-md-6">
                <img
                  src="/assets/Client/img/dalat.jpg"
                  className="h-100"
                  alt="Blog Post 2"
                />
              </div>
              <div className="latest__blog__text col-md-6">
                <div className="label">Đà Lạt</div>
                <h5>Khám phá vẻ đẹp thơ mộng của Đà Lạt</h5>
                <p className="price">Giá từ: 1.500.000 VNĐ</p>
                <a href="#">Đọc thêm</a>
              </div>
            </div>
            <div className="col-md-6 mb-3 d-flex">
              <div className="col-md-6">
                <img
                  src="/assets/Client/img/vungtau.jpg"
                  className="h-100"
                  alt="Blog Post 3"
                />
              </div>
              <div className="latest__blog__text col-md-6">
                <div className="label">Vũng Tàu</div>
                <h5>Trải nghiệm những bãi biển tuyệt vời tại Vũng Tàu</h5>
                <p className="price">Giá từ: 1.500.000 VNĐ</p>
                <a href="#">Đọc thêm</a>
              </div>
            </div>

            <div className="col-md-6 mb-3 d-flex">
              <div className="col-md-6">
                <img
                  src="/assets/Client/img/phuquoc.jpg"
                  className="h-100"
                  alt="Blog Post 4"
                />
              </div>
              <div className="latest__blog__text col-md-6">
                <div className="label">Phú Quốc</div>
                <h5>Khám phá vẻ đẹp hoang sơ của Phú Quốc</h5>
                <p className="price">Giá từ: 1.500.000 VNĐ</p>
                <a href="#">Đọc thêm</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
