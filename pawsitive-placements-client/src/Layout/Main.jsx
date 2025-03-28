import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

const Main = () => {
    return (
        <div className="min-h-screen flex flex-col">
            
            <Navbar />
            
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Main;