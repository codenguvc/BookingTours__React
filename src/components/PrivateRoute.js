import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../firebase/firebase';
import { roles } from './roles';

const PrivateRoute = ({ element, requiredRole, ...rest }) => {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        const fetchAccountData = async () => {
            if (currentUser) {
                const db = getDatabase(app);
                const accountRef = ref(db, 'users/' + currentUser.uid);
                try {
                    const snapshot = await get(accountRef);
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setUserData(data);

                        if (data.role_id === '1722924944760') {
                            roles.admin = true;
                            roles.user = false;
                        } else {
                            roles.admin = false;
                            roles.user = true;
                        }

                        if (!roles.admin && requiredRole === roles.admin) {
                            setUnauthorized(true);
                        }
                    } else {
                        console.error('No data available for user:', currentUser.uid);
                        setUserData(null);
                    }
                } catch (error) {
                    console.error('Error fetching account data:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchAccountData();
    }, [currentUser, requiredRole]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (unauthorized) {
        return <Navigate to="/admin/unauthorized" />;
    }

    if (!currentUser || userData === null) {
        return <Navigate to="/" />;
    }

    return element;
};

export default PrivateRoute;
