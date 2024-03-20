import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbar/MainNavbar";
import { Layout } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import Places from './places/Place';
import Users from './users/User';

function Admin() {
    const location = useLocation();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('places');

    useEffect(() => {
        const newActiveTab = location.pathname.split('/').pop();
        setActiveTab(newActiveTab);
    }, [location]);

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
        navigate(`/admin/${newTab}`);
    };

    return (
        <div>
            
            <Navbar></Navbar>
            <div className="admin">
                <div className="admin__main">
                    <Layout.Content>
                        {activeTab === 'places' && <Places />}
                        {activeTab === 'users' && <Users />}
                    </Layout.Content>
                </div>
            </div>
        </div>
    );
}

export default Admin;
