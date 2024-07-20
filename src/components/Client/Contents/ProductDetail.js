import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../../App.css";
const productDetail = () => {
  const breadcrumb = `${process.env.PUBLIC_URL}/assets/Client/img/breadcrumb-bg.jpg`;

  const product = {
    title: "Nha Trang",
    price: 1200000,
    rate: 5,
    people: 10,
    startDate: "2024-01-01",
    endDate: "2024-02-02",
    image: "/assets/Client/img/nhatrang.jpg",
    description:
      "Khám phá vẻ đẹp tuyệt vời của Nha Trang với những bãi biển trắng tinh và dịch vụ đẳng cấp.",
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  return (
    <div>
      <Header />

      <div>
        <div
          className="breadcrumb-option set-bg"
          style={{ backgroundImage: `url(${breadcrumb})` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="breadcrumb__text">
                  <h1>Chi tiết chuyến đi</h1>
                  <div className="breadcrumb__links">
                    <a href="/">Trang chủ</a>
                    <span>Chi tiết chuyến đi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="product-detail spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="product-detail__image">
                  <img src={product.image} alt={product.title} />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="product-detail__text">
                  <h3>{product.title}</h3>
                  <h2>
                    {product.price.toLocaleString()} VNĐ<span>/day</span>
                  </h2>
                  <ul>
                    <li>
                      <span>Đánh giá:</span> {product.rate} Sao
                    </li>
                    <li>
                      <span>Số lượng:</span> {product.people} người
                    </li>
                    <li>
                      <span>Ngày bắt đầu:</span> {formatDate(product.startDate)}
                    </li>
                    <li>
                      <span>Ngày kết thúc:</span> {formatDate(product.endDate)}
                    </li>
                  </ul>
                  <p>{product.description}</p>
                  <a href="#" className="booking">
                    Đặt ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12">
              <div className="headings d-flex justify-content-between align-items-center mb-3">
                <h5>Unread comments (6)</h5>
                <div className="buttons d-flex align-items-center">
                  <span className="badge bg-white d-flex align-items-center">
                    <span className="text-primary">Comments "ON"</span>
                    <div className="form-check form-switch ms-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        defaultChecked
                      />
                    </div>
                  </span>
                </div>
              </div>

              <div className="card p-3 mb-3 shadow-sm border rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="user d-flex align-items-center">
                    <img
                      src="https://i.imgur.com/hczKIze.jpg"
                      width={30}
                      className="user-img rounded-circle me-2"
                      alt="user"
                    />
                    <span>
                      <small className="fw-bold text-primary">
                        james_olesenn
                      </small>
                      <small className="fw-bold">
                        Hmm, This poster looks cool
                      </small>
                    </span>
                  </div>
                  <small>2 days ago</small>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="reply">
                    <small>Remove</small>
                    <span className="dots mx-2">•</span>
                    <small>Reply</small>
                    <span className="dots mx-2">•</span>
                    <small>Translate</small>
                  </div>
                  <div className="icons d-flex align-items-center">
                    <i className="fa fa-star text-warning me-2"></i>
                    <i className="fa fa-check-circle-o"></i>
                  </div>
                </div>
              </div>

              <div className="card p-3 mb-3 shadow-sm border rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="user d-flex align-items-center">
                    <img
                      src="https://i.imgur.com/C4egmYM.jpg"
                      width={30}
                      className="user-img rounded-circle me-2"
                      alt="user"
                    />
                    <span>
                      <small className="fw-bold text-primary">olan_sams</small>
                      <small className="fw-bold">
                        Loving your work and profile!
                      </small>
                    </span>
                  </div>
                  <small>3 days ago</small>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="reply">
                    <small>Remove</small>
                    <span className="dots mx-2">•</span>
                    <small>Reply</small>
                    <span className="dots mx-2">•</span>
                    <small>Translate</small>
                  </div>
                  <div className="icons d-flex align-items-center">
                    <i className="fa fa-check-circle-o text-primary"></i>
                  </div>
                </div>
              </div>

              <div className="card p-3 mb-3 shadow-sm border rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="user d-flex align-items-center">
                    <img
                      src="https://i.imgur.com/0LKZQYM.jpg"
                      width={30}
                      className="user-img rounded-circle me-2"
                      alt="user"
                    />
                    <span>
                      <small className="fw-bold text-primary">
                        rashida_jones
                      </small>
                      <small className="fw-bold">
                        Really cool! Which filter are you using?
                      </small>
                    </span>
                  </div>
                  <small>3 days ago</small>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="reply">
                    <small>Remove</small>
                    <span className="dots mx-2">•</span>
                    <small>Reply</small>
                    <span className="dots mx-2">•</span>
                    <small>Translate</small>
                  </div>
                  <div className="icons d-flex align-items-center">
                    <i className="fa fa-user-plus text-muted me-2"></i>
                    <i className="fa fa-star-o text-muted me-2"></i>
                    <i className="fa fa-check-circle-o text-primary"></i>
                  </div>
                </div>
              </div>

              <div className="card p-3 mb-3 shadow-sm border rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="user d-flex align-items-center">
                    <img
                      src="https://i.imgur.com/ZSkeqnd.jpg"
                      width={30}
                      className="user-img rounded-circle me-2"
                      alt="user"
                    />
                    <span>
                      <small className="fw-bold text-primary">
                        simona_rnasi
                      </small>
                      <small className="fw-bold text-primary">
                        @macky_lones
                      </small>
                      <small className="fw-bold text-primary">
                        @rashida_jones
                      </small>
                      <small className="fw-bold">Thanks</small>
                    </span>
                  </div>
                  <small>3 days ago</small>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="reply">
                    <small>Remove</small>
                    <span className="dots mx-2">•</span>
                    <small>Reply</small>
                    <span className="dots mx-2">•</span>
                    <small>Translate</small>
                  </div>
                  <div className="icons d-flex align-items-center">
                    <i className="fa fa-check-circle-o text-primary"></i>
                  </div>
                </div>
              </div>
              <div className="card p-3 mb-3 shadow-sm border rounded">
                <div className="">
                  <h4 className="mb-4">Thêm bình luận</h4>
                  <form action="#">
                    <div className="mb-3">
                      <label htmlFor="comment" className="form-label">
                        Nội dung bình luận:
                      </label>
                      <textarea
                        id="comment"
                        className="form-control"
                        rows="4"
                        placeholder="Nhập bình luận của bạn"
                      ></textarea>
                    </div>
                    <button type="submit" className="send__comment">
                      Gửi
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default productDetail;
