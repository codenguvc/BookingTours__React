import React, { useEffect } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const NewsAdd = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setFocus
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    // Xử lý dữ liệu ở đây

    // Điều hướng đến trang khác sau khi gửi form thành công
    navigate("/system/news");
  };

  useEffect(() => {
    if (errors) {
      // Cuộn đến phần có lỗi
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.getElementById(firstError)?.scrollIntoView({ behavior: "smooth", block: "center" });
        setFocus(firstError);
      }
    }
  }, [errors, setFocus]);

  return (
    <div id="wrapper">
      <Sidebar />
      <div
        id="content-wrapper"
        className="d-flex flex-column"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="p-4 bg-white">
                  <h1>Thêm tin tức</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Tiêu đề
                      </label>
                      <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Tiêu đề không được để trống" }}
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
                        <div className="invalid-feedback">
                          {errors.title.message}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="author" className="form-label">
                        Tác giả
                      </label>
                      <Controller
                        name="author"
                        control={control}
                        rules={{ required: "Tác giả không được để trống" }}
                        render={({ field }) => (
                          <input
                            type="text"
                            className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                            id="author"
                            {...field}
                          />
                        )}
                      />
                      {errors.author && (
                        <div className="invalid-feedback">
                          {errors.author.message}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Chuyên mục
                      </label>
                      <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Chuyên mục không được để trống" }}
                        render={({ field }) => (
                          <input
                            type="text"
                            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                            id="category"
                            {...field}
                          />
                        )}
                      />
                      {errors.category && (
                        <div className="invalid-feedback">
                          {errors.category.message}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="publishDate" className="form-label">
                        Ngày đăng
                      </label>
                      <Controller
                        name="publishDate"
                        control={control}
                        rules={{ required: "Ngày đăng không được để trống" }}
                        render={({ field }) => (
                          <input
                            type="date"
                            className={`form-control ${errors.publishDate ? 'is-invalid' : ''}`}
                            id="publishDate"
                            {...field}
                          />
                        )}
                      />
                      {errors.publishDate && (
                        <div className="invalid-feedback">
                          {errors.publishDate.message}
                        </div>
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
                            <option value="draft">Nháp</option>
                            <option value="published">Đã xuất bản</option>
                          </select>
                        )}
                      />
                      {errors.status && (
                        <div className="invalid-feedback">
                          {errors.status.message}
                        </div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Thêm tin tức
                    </button>
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

export default NewsAdd;
