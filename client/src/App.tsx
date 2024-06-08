import React, { FC, useContext, useEffect } from 'react';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './components/dash/Dashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App: FC = () => {
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    if (store.isLoading) {
        return (
            <div role="status" className="flex justify-center items-center h-screen">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/login" element={!store.isAuth ? <LoginForm /> : <Navigate to="/dashboard" />} />
                <Route path="/register" element={!store.isAuth ? <RegisterForm /> : <Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={store.isAuth ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/" element={store.isAuth ? <Navigate to="/dashboard" /> : <LoginForm />} />
            </Routes>
        </Router>
    );
};

export default observer(App);
