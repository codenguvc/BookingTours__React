import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Client from '../pages/Client/Client';
import ClientProduct from '../components/Client/Contents/product';
import ClientAbout from '../components/Client/Contents/AboutUs';
import ClientContact from '../components/Client/Contents/Contact';
import ClientNews from '../components/Client/Contents/News';
import ClientLogin from '../components/Client/Login';
import ClientRegister from '../components/Client/Register';
import ClientProductDetail from '../components/Client/Contents/ProductDetail';

import Admin from '../pages/Admin/Admin';
import AdminLogin from '../components/admin/Login';
import CategoryList from '../components/admin/Category/list';
import CategoryAdd from '../components/admin/Category/add';
import CategoryEdit from '../components/admin/Category/edit';
import ProductList from '../components/admin/Product/list';
import ProductAdd from '../components/admin/Product/add';
import ProductEdit from '../components/admin/Product/edit';
import AccountList from '../components/admin/Accounts/list';

import AccountEdit from '../components/admin/Accounts/edit';
import RoleList from '../components/admin/Roles/list';
import RoleAdd from '../components/admin/Roles/add';
import RoleEdit from '../components/admin/Roles/edit';
import CustomersList from '../components/admin/Customers/list';
import CustomersEdit from '../components/admin/Customers/edit';
import PermissionList from '../components/admin/Permissions/list';
import PermissionAdd from '../components/admin/Permissions/add';
import PermissionEdit from '../components/admin/Permissions/edit';
import NewsList from '../components/admin/News/list';
import NewsAdd from '../components/admin/News/add';
import NewsEdit from '../components/admin/News/edit';
import ContactList from '../components/admin/Contact/list';
import OrderList from '../components/admin/Orders/list';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
    // Client Routes
    {
        path: "/",
        element: <Client />,
    },
    {
        path: "/product",
        element: <ClientProduct />,
    },
    {
        path: "/product-detail",
        element: <ClientProductDetail />,
    },
    {
        path: "/aboutus",
        element: <ClientAbout />,
    },
    {
        path: "/contact",
        element: <ClientContact />,
    },
    {
        path: "/news",
        element: <ClientNews />,
    },
    {
        path: "/login",
        element: <ClientLogin />,
    },
    {
        path: "/register",
        element: <ClientRegister />,
    },

    // Admin Routes
    {
        path: "/system/login",
        element: <AdminLogin />,
    },
    {
        path: "/system",
        element: <ProtectedRoute element={<Admin />} />,
    },
    {
        path: "/system/account",
        element: <ProtectedRoute element={<AccountList />} />,
    },
{
        path: "/system/account/edit",
        element: <ProtectedRoute element={<AccountEdit />} />,
    },
    {
        path: "/system/category",
        element: <ProtectedRoute element={<CategoryList />} />,
    },
    {
        path: "/system/category/add",
        element: <ProtectedRoute element={<CategoryAdd />} />,
    },
    {
        path: "/system/category/edit",
        element: <ProtectedRoute element={<CategoryEdit />} />,
    },
    {
        path: "/system/product",
        element: <ProtectedRoute element={<ProductList />} />,
    },
    {
        path: "/system/product/add",
        element: <ProtectedRoute element={<ProductAdd />} />,
    },
    {
        path: "/system/product/edit",
        element: <ProtectedRoute element={<ProductEdit />} />,
    },
    {
        path: "/system/role",
        element: <ProtectedRoute element={<RoleList />} />,
    },
    {
        path: "/system/role/add",
        element: <ProtectedRoute element={<RoleAdd />} />,
    },
    {
        path: "/system/role/edit",
        element: <ProtectedRoute element={<RoleEdit />} />,
    },
    {
        path: "/system/customers",
        element: <ProtectedRoute element={<CustomersList />} />,
    },
    {
        path: "/system/customers/edit",
        element: <ProtectedRoute element={<CustomersEdit />} />,
    },
    {
        path: "/system/permissions",
        element: <ProtectedRoute element={<PermissionList />} />,
    },
    {
        path: "/system/permissions/add",
        element: <ProtectedRoute element={<PermissionAdd />} />,
    },
    {
        path: "/system/permissions/edit",
        element: <ProtectedRoute element={<PermissionEdit />} />,
    },
    {
        path: "/system/news",
        element: <ProtectedRoute element={<NewsList />} />,
    },
    {
        path: "/system/news/add",
        element: <ProtectedRoute element={<NewsAdd />} />,
    },
    {
        path: "/system/news/edit",
        element: <ProtectedRoute element={<NewsEdit />} />,
    },
    {
        path: "/system/contact",
        element: <ProtectedRoute element={<ContactList />} />,
    },
    {
        path: "/system/orders",
        element: <ProtectedRoute element={<OrderList />} />,
    },
]);

export default router;