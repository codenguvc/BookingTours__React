import React, { useEffect } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    setFocus
  } = useForm();

  const navigate = useNavigate();

  // Theo dõi giá trị của startDate
  const startDate = watch("startDate");

  const onSubmit = (data) => {
    console.log(data);
    // Xử lý dữ liệu ở đây

    // Điều hướng đến trang khác sau khi gửi form thành công
    navigate("/system/product");
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
                  <h1>Thêm chuyến đi</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="productName" className="form-label">
                        Tên chuyến đi
                      </label>
                      <Controller
                        name="productName"
                        control={control}
                        rules={{ required: "Tên chuyến đi không được để trống" }}
                        render={({ field }) => (
                          <input
                            type="text"
                            className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                            id="productName"
                            {...field}
                          />
                        )}
                      />
                      {errors.productName && (
                        <div className="invalid-feedback">
                          {errors.productName.message}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="productImage" className="form-label">
                        Hình ảnh
                      </label>
                      <Controller
                        name="productImage"
                        control={control}
                        rules={{ required: "Hình ảnh không được để trống" }}
                        render={({ field }) => (
                          <input
                            type="file"
                            className={`form-control ${errors.productImage ? 'is-invalid' : ''}`}
                            id="productImage"
                            {...field}
                          />
                        )}
                      />
                      {errors.productImage && (
                        <div className="invalid-feedback">
                          {errors.productImage.message}
                        </div>
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
                          required: "Số lượng không được để trống",
                          min: { value: 1, message: "Số lượng không được nhỏ hơn 1" }
                        }}
                        render={({ field }) => (
                          <input
                            type="number"
                            className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                            id="quantity"
                            {...field}
                          />
                        )}
                      />
                      {errors.quantity && (
                        <div className="invalid-feedback">
                          {errors.quantity.message}
                        </div>
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
                          required: "Ngày bắt đầu không được để trống",
                          validate: (value) => {
                            const today = new Date().toISOString().split('T')[0];
                            return value >= today || "Ngày bắt đầu không được nhỏ hơn ngày hiện tại";
                          }
                        }}
                        render={({ field }) => (
                          <input
                            type="date"
                            className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                            id="startDate"
                            {...field}
                          />
                        )}
                      />
                      {errors.startDate && (
                        <div className="invalid-feedback">
                          {errors.startDate.message}
                        </div>
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
                          required: "Ngày kết thúc không được để trống",
                          validate: (value) => {
                            return value >= startDate || "Ngày kết thúc không được nhỏ hơn ngày bắt đầu";
                          }
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
                        <div className="invalid-feedback">
                          {errors.endDate.message}
                        </div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Thêm chuyến đi
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

export default ProductAdd;
