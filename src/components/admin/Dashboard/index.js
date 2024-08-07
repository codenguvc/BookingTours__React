import React, { useState, useEffect } from "react";
import API_ENDPOINTS from "../../../firebase/urls";
import axios from "axios";

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const ordersResponse = await axios.get(API_ENDPOINTS.orders + '.json');
        const ordersData = Object.values(ordersResponse.data || {});
        setOrders(ordersData);
        const revenue = ordersData.reduce((acc, order) => acc + (order.total_price || 0), 0);
        setTotalRevenue(revenue);
        setTotalBookings(ordersData.length);

      
        const usersResponse = await axios.get(API_ENDPOINTS.users + '.json');
        const usersData = Object.values(usersResponse.data || {});
        setTotalCustomers(usersData.length);

        // Fetch products
        const productsResponse = await axios.get(API_ENDPOINTS.products + '.json');
        const productsData = Object.values(productsResponse.data || {});
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate bookings per product
  const getBookingsByProduct = (productId) => {
    return orders.filter(order => order.product_id === productId).length;
  };

  // Calculate revenue per product
  const getRevenueByProduct = (productId) => {
    return orders
      .filter(order => order.product_id === productId)
      .reduce((acc, order) => acc + (order.total_price || 0), 0);
  };

  // Calculate revenue percentage by product
  const getRevenuePercentage = (productId) => {
    const productRevenue = getRevenueByProduct(productId);
    return totalRevenue > 0 ? ((productRevenue / totalRevenue) * 100).toFixed(2) : '0.00';
  };

  return (
    <div className="container-fluid mt-5">
      <h1 className="mb-4">Bảng Điều Khiển Quản Lý Tour</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Doanh Thu Tổng</h5>
              <p className="card-text">{totalRevenue.toLocaleString()} VNĐ</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Tổng Số Khách Hàng</h5>
              <p className="card-text">{totalCustomers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title">Tổng Số Đặt Tour</h5>
              <p className="card-text">{totalBookings}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h2>Danh Sách Các Sản Phẩm Nổi Bật</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Sản Phẩm</th>
                <th scope="col">Số Lượng Đặt</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.productName}</td>
                  <td>{getBookingsByProduct(product.id) || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4">
          <h2>Doanh Thu Theo Sản Phẩm</h2>
          <table className="table w-100">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Sản Phẩm</th>
                <th scope="col">Tỷ Lệ Doanh Thu</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.productName}</td>
                  <td>
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${getRevenuePercentage(product.id)}%` }}
                        aria-valuenow={getRevenuePercentage(product.id)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        {getRevenuePercentage(product.id)}%
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
