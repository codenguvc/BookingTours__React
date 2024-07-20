import React, { useEffect } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RoleAdd = () => {
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
    navigate("/system/role");
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
                  <h1>Thêm vai trò</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="roleName" className="form-label">
                        Tên vai trò
                      </label>
                      <Controller
                        name="roleName"
                        control={control}
                        rules={{ required: "Tên vai trò không được để trống" }}
                        render={({ field }) => (
                          <input
                            type="text"
                            className={`form-control ${errors.roleName ? 'is-invalid' : ''}`}
                            id="roleName"
                            {...field}
                          />
                        )}
                      />
                      {errors.roleName && (
                        <div className="invalid-feedback">
                          {errors.roleName.message}
                        </div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Thêm vai trò
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

export default RoleAdd;
