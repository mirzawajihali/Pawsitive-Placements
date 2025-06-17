import React from 'react';
import Category from '../components/Category';
import Header from '../Layout/Header';
import AboutSection from '../components/AboutSection';

import { Helmet } from 'react-helmet';
import Works from '../components/Works';

const Home = () => {
    return (
        <div>
              <Helmet>
                <meta charSet="utf-8" />
                <title>Pawsitive Placements</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
       <Header></Header>
        <Category />
        <Works/>
     
        
       
        </div>
    );
};

export default Home;