import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';

const Main = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Main;