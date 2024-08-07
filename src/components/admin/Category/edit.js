import React, { useEffect } from "react";
import Navbar from "../../admin/Navbar";
import Sidebar from "../../admin/Sidebar";
import Footer from "../../admin/Footer";
import { useForm, Controller } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { app } from "../../../firebase/firebase";
import { getDatabase, ref, get, set } from "firebase/database";
import Swal from 'sweetalert2';

const CategoryEdit = () => {
  const { register, handleSubmit, setValue, control, formState: { errors }, setFocus } = useForm();
  const navigate = useNavigate();
  const { categoryId } = useParams(); 

  useEffect(() => {

    const fetchCategory = async () => {
      const db = getDatabase(app);
      const categoryRef = ref(db, 'categories/' + categoryId);
      try {
        const snapshot = await get(categoryRef);
        if (snapshot.exists()) {
          setValue("categoryName", snapshot.val().name);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Category not found.',
            icon: 'error',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate("/admin/category");
          });
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch category data.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    fetchCategory();
  }, [categoryId, navigate, setValue]);

  const onSubmit = async (data) => {
    const db = getDatabase(app);
    const categoryRef = ref(db, 'categories/' + categoryId);

    try {
      await set(categoryRef, {
        name: data.categoryName
      });
      console.log("Category updated:", data);
      Swal.fire({
        title: 'Success!',
        text: 'Category has been updated.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate("/admin/category");
      });
    } catch (error) {
      console.error("Error updating category:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update category.',
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
                  <h1>Edit Category</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="categoryName" className="form-label">
                        Tên danh mục
                      </label>
                      <Controller
                        name="categoryName"
                        control={control}
                        rules={{ required: "Category name is required" }}
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
                      Cập nhật
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

export default CategoryEdit;
