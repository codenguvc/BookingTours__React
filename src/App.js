import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';

import Client from '../src/pages/Client/Client';
import ClientProduct from '../src/components/Client/Contents/product';
import ClientAbout from '../src/components/Client/Contents/AboutUs';
import ClientContact from '../src/components/Client/Contents/Contact';
import ClientNews from '../src/components/Client/Contents/News';
import ClientLogin from '../src/components/Client/Login';
import ClientRegister from '../src/components/Client/Register';
import ClientProductDetail from '../src/components/Client/Contents/ProductDetail';
import ClientInfoAccount from '../src/components/Client/Contents/InfoAccount';
import ClientOrdersFrom from '../src/components/Client/Contents/OrderFroms';

import Admin from '../src/pages/Admin/Admin';
import AdminLogin from '../src/components/admin/Login';
import CategoryList from '../src/components/admin/Category/list';
import CategoryAdd from '../src/components/admin/Category/add';
import CategoryEdit from '../src/components/admin/Category/edit';
import ProductList from '../src/components/admin/Product/list';
import ProductAdd from '../src/components/admin/Product/add';
import ProductEdit from '../src/components/admin/Product/edit';
import AccountList from '../src/components/admin/Accounts/list';
import AccountAdd from '../src/components/admin/Accounts/add';
import AccountEdit from '../src/components/admin/Accounts/edit';
import RoleList from '../src/components/admin/Roles/list';
import RoleAdd from '../src/components/admin/Roles/add';
import RoleEdit from '../src/components/admin/Roles/edit';
import CustomersList from '../src/components/admin/Customers/list';
import CustomersEdit from '../src/components/admin/Customers/edit';
import PermissionList from '../src/components/admin/Permissions/list';
import PermissionAdd from '../src/components/admin/Permissions/add';
import PermissionEdit from '../src/components/admin/Permissions/edit';
import NewsList from '../src/components/admin/News/list';
import NewsAdd from '../src/components/admin/News/add';
import NewsEdit from '../src/components/admin/News/edit';
import ContactList from '../src/components/admin/Contact/list';
import OrderList from '../src/components/admin/Orders/list';
import Unauthorized from './components/Unauthorized';

import { roles } from './components/roles';

console.log(roles);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Client />,
    },
    {
        path: '/InfoAccount',
        element: <ClientInfoAccount />,
    },
    {
        path: '/product',
        element: <ClientProduct />,
    },
    {
        path: '/product-detail/:id',
        element: <ClientProductDetail />,
    },
    {
        path: '/aboutus',
        element: <ClientAbout />,
    },
    {
        path: '/contact',
        element: <ClientContact />,
    },
    {
        path: '/news',
        element: <ClientNews />,
    },
    {
        path: '/login',
        element: <ClientLogin />,
    },
    {
        path: '/register',
        element: <ClientRegister />,
    },
    {
        path: '/orderFroms',
        element: <ClientOrdersFrom />,
    },

    {
        path: '/admin/login',
        element: <AdminLogin />,
    },
    {
        path: '/admin',
        element: <PrivateRoute element={<Admin />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/account',
        element: <PrivateRoute element={<AccountList />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/account/add',
        element: <PrivateRoute element={<AccountAdd />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/account/edit/:userId',
        element: <PrivateRoute element={<AccountEdit />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/category',
        element: <PrivateRoute element={<CategoryList />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/category/add',
        element: <PrivateRoute element={<CategoryAdd />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/category/edit/:categoryId',
        element: <PrivateRoute element={<CategoryEdit />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/product',
        element: <PrivateRoute element={<ProductList />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/product/add',
        element: <PrivateRoute element={<ProductAdd />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/product/edit/:id',
        element: <PrivateRoute element={<ProductEdit />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/role',
        element: <PrivateRoute element={<RoleList />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/role/add',
        element: <PrivateRoute element={<RoleAdd />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/role/edit/:rolesId',
        element: <PrivateRoute element={<RoleEdit />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/customers',
        element: <PrivateRoute element={<CustomersList />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/customers/edit',
        element: <PrivateRoute element={<CustomersEdit />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/permissions',
        element: <PrivateRoute element={<PermissionList />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/permissions/add',
        element: <PrivateRoute element={<PermissionAdd />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/permissions/edit',
        element: <PrivateRoute element={<PermissionEdit />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/news',
        element: <PrivateRoute element={<NewsList />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/news/add',
        element: <PrivateRoute element={<NewsAdd />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/news/edit/:newId',
        element: <PrivateRoute element={<NewsEdit />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/contact',
        element: <PrivateRoute element={<ContactList />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/orders',
        element: <PrivateRoute element={<OrderList />} requiredRole={roles.admin} />,
    },
    {
        path: '/admin/unauthorized',
        element: <Unauthorized />,
    },
]);

const App = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;
