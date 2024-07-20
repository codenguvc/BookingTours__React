import React from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const CategoryAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/system/category");
  };

  useEffect(() => {
    if (errors.categoryName) {
      setFocus("categoryName");
      document.getElementById("categoryName")?.scrollIntoView({ behavior: "smooth", block: "center" });
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
                  <h1>Thêm danh mục</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="categoryName" className="form-label">
                        Tên danh mục
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}
                        id="categoryName"
                        {...register("categoryName", { required: "Tên danh mục không được để trống" })}
                      />
                      {errors.categoryName && (
                        <div className="invalid-feedback">
                          {errors.categoryName.message}
                        </div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Thêm danh mục
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

export default CategoryAdd;
