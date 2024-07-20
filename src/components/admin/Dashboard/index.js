import React from "react";

const Dashboard = () => {
  return (
   
          <div className="container-fluid mt-5">
            <h1 className="mb-4">Tour Management Dashboard</h1>
            <div className="row">
              <div className="col-md-3">
                <div className="card text-white bg-primary mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Total Revenue</h5>
                    <p className="card-text">10,000,000 VNĐ</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white bg-success mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Total Customers</h5>
                    <p className="card-text">150</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white bg-info mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Total Bookings</h5>
                    <p className="card-text">200</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white bg-warning mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Pending Bookings</h5>
                    <p className="card-text">10</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <h2>Top Locations</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Location</th>
                      <th scope="col">Bookings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Hà Nội</td>
                      <td>50</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>TP. Hồ Chí Minh</td>
                      <td>75</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Đà Nẵng</td>
                      <td>25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-4">
                <h2>Revenue by Location</h2>
                <table className="table w-100">
                  <thead>
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Location</th>
                      <th scope="col">Revenue Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Hà Nội</td>
                      <td>
                        <div className="progress">
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: "40%" }}
                            aria-valuenow={40}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            40%
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>TP. Hồ Chí Minh</td>
                      <td>
                        <div className="progress">
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: "50%" }}
                            aria-valuenow={50}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            50%
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Đà Nẵng</td>
                      <td>
                        <div className="progress">
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: "10%" }}
                            aria-valuenow={10}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            10%
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  );
};

export default Dashboard;
