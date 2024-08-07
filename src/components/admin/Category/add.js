import React, { useEffect } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { app } from "../../../firebase/firebase";
import { getDatabase, ref, set } from "firebase/database";
import Swal from 'sweetalert2';

const CategoryAdd = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const db = getDatabase(app);
    const newCategoryRef = ref(db, 'categories/' + Date.now()); 

    try {
      await set(newCategoryRef, {
        name: data.categoryName
      });
      console.log("Category added:", data);
      Swal.fire({
        title: 'Thành công',
        text: 'Thêm mới danh mục thành công',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate("/admin/category");
      });
    } catch (error) {
      console.error("Error adding category:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add category.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
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
      <div id="content-wrapper" className="d-flex flex-column" style={{ backgroundColor: "#f0f0f0" }}>
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
                      <Controller
                        control={control}
                        name="categoryName"
                        rules={{ required: "Category name is required" }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            type="text"
                            className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}
                            id="categoryName"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
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
                      Thêm mới
                    </button>
                    <NavLink className="btn btn-secondary ms-2" to="/admin/category">
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

export default CategoryAdd;
