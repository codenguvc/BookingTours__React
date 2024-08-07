import React, { useEffect } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const PermissionEdit = () => {
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
    navigate("/admin/permissions");
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
                  <h1>Sửa quyền</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="permissionName" className="form-label">
                        Tên quyền
                      </label>
                      <Controller
                        name="permissionName"
                        control={control}
                        rules={{ required: "Tên quyền không được để trống" }}
                        render={({ field }) => (
                          <input
                            type="text"
                            className={`form-control ${errors.permissionName ? 'is-invalid' : ''}`}
                            id="permissionName"
                            {...field}
                          />
                        )}
                      />
                      {errors.permissionName && (
                        <div className="invalid-feedback">
                          {errors.permissionName.message}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="slug" className="form-label">
                        Slug
                      </label>
                      <Controller
                        name="slug"
                        control={control}
                        rules={{ required: "Slug không được để trống" }}
                        render={({ field }) => (
                          <input
                            type="text"
                            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                            id="slug"
                            {...field}
                          />
                        )}
                      />
                      {errors.slug && (
                        <div className="invalid-feedback">
                          {errors.slug.message}
                        </div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Sửa quyền
                    </button>
                    <NavLink className="btn btn-secondary ms-2" to="/admin/Permissions">
                      Quay lại
                    </NavLink>
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

export default PermissionEdit;
