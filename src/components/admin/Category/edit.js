import React, { useEffect } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CategoryEdit = () => {
  const { register, handleSubmit, setValue, control, formState: { errors }, setFocus } = useForm();
  const navigate = useNavigate();

  
  useEffect(() => {
  
    setValue("categoryName", "Danh mục cũ"); 
  }, [setValue]);

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
                  <h1>Sửa danh mục</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="categoryName" className="form-label">
                        Tên danh mục
                      </label>
                      <Controller
                        name="categoryName"
                        control={control}
                        rules={{ required: "Tên danh mục không được để trống" }}
                        render={({ field }) => (
                          <input
                            type="text"
                            className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}
                            id="categoryName"
                            {...field}
                          />
                        )}
                      />
                      {errors.categoryName && (
                        <div className="invalid-feedback">
                          {errors.categoryName.message}
                        </div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Cập nhật danh mục
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

export default CategoryEdit;
