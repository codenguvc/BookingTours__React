import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import { useAuth } from "../../context/authContext";

const errorMessages = {
  "auth/invalid-email": "Email không hợp lệ.",
  "auth/user-disabled": "Tài khoản này đã bị vô hiệu hóa.",
  "auth/user-not-found": "Không tìm thấy người dùng với email này.",
  "auth/wrong-password": "Sai mật khẩu.",
  "auth/popup-closed-by-user": "Đăng nhập bị hủy bỏ.",
  "auth/cancelled-popup-request": "Yêu cầu đăng nhập bị hủy bỏ.",
  INVALID_LOGIN_CREDENTIALS: "Thông tin đăng nhập không hợp lệ.",
};

function Login() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        setErrorMessage("");
        navigate("/");
      } catch (err) {
        setErrorMessage(
          errorMessages[err.code] || "Email không tồn tại hoặc sai mật khẩu"
        );
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle()
        .then(() => {
          setErrorMessage("");
          navigate("/");
        })
        .catch((err) => {
          setErrorMessage(errorMessages[err.code] || "Đã xảy ra lỗi.");
          setIsSigningIn(false);
        });
    }
  };

  return (
    <div>
      <section className="bg-light p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
              <div className="card border border-light-subtle rounded-4">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <div className="text-center mb-4"></div>
                        <h4 className="text-center">Đăng nhập</h4>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={onSubmit}>
                    <div className="row gy-3 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label htmlFor="password" className="form-label">
                            Mật khẩu
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="remember_me"
                            id="remember_me"
                          />
                          <label
                            className="form-check-label text-secondary"
                            htmlFor="remember_me"
                          >
                            Ghi nhớ đăng nhập
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className="btn bsb-btn-xl btn-primary"
                            type="submit"
                          >
                            Đăng nhập
                          </button>
                        </div>
                      </div>
                    </div>
                    {errorMessage && (
                      <div className="mt-3 text-danger text-center">
                        {errorMessage}
                      </div>
                    )}
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <hr className="mt-5 mb-4 border-secondary-subtle" />
                      <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                        <NavLink
                          to="/register"
                          className="link-secondary text-decoration-none"
                        >
                          Đăng ký
                        </NavLink>
                        <NavLink
                          to="#!"
                          className="link-secondary text-decoration-none"
                        >
                          Quên mật khẩu
                        </NavLink>
                        <NavLink
                          to="/"
                          className="link-secondary text-decoration-none"
                        >
                          Quay lại
                        </NavLink>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p className="mt-5 mb-5">Tiếp tục với</p>
                      <div className="d-flex gap-2 gap-sm-3 justify-content-center">
                        <a
                          href="#!"
                          onClick={onGoogleSignIn}
                          className="btn btn-lg btn-outline-danger p-3 lh-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={28}
                            height={28}
                            fill="currentColor"
                            className="bi bi-google"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                          </svg>
                        </a>
                        <a
                          href="#!"
                          className="btn btn-lg btn-outline-primary p-3 lh-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={28}
                            height={28}
                            fill="currentColor"
                            className="bi bi-facebook"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                          </svg>
                        </a>
                        <a
                          href="#!"
                          className="btn btn-lg btn-outline-dark p-3 lh-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={28}
                            height={28}
                            fill="currentColor"
                            className="bi bi-apple"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.318 1.278c-.943.111-1.984.688-2.631 1.507-.568.725-1.013 1.779-.833 2.82 1.036.053 2.11-.566 2.747-1.376.576-.74.992-1.788.717-2.951zm1.593 8.545c-.044-2.278 1.785-3.38 1.87-3.434-.997-1.457-2.541-1.659-3.085-1.682-1.3-.132-2.534.756-3.195.756-.662 0-1.676-.738-2.758-.717-1.417.021-2.736.823-3.466 2.092-1.475 2.557-.378 6.334 1.058 8.4.704 1.02 1.543 2.161 2.64 2.12 1.048-.041 1.444-.686 2.709-.686 1.264 0 1.631.686 2.758.664 1.14-.021 1.859-1.041 2.563-2.061.812-1.174 1.148-2.307 1.169-2.365-.026-.012-2.248-.865-2.294-3.439z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <hr className="mt-5 mb-4 border-secondary-subtle" />
                      <p className="mb-0 text-secondary text-center">
                        Đọc{" "}
                        <NavLink
                          to="#!"
                          className="text-decoration-none text-primary"
                        >
                          điều khoản dịch vụ
                        </NavLink>{" "}
                        và{" "}
                        <NavLink
                          to="#!"
                          className="text-decoration-none text-primary"
                        >
                          chính sách bảo mật
                        </NavLink>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
