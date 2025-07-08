import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../components/ScrollToTop';

const Main = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <Navbar />
            
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Main;