import React from 'react';
import Navbar from '../../components/admin/Navbar';
import Sidebar from '../../components/admin/Sidebar';
import Footer from '../../components/admin/Footer';
import Dashboard from '../../components/admin/Dashboard';

const Admin = () => {
    return (
        <div id='wrapper'>
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <Dashboard />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Admin;