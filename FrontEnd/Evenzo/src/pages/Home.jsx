import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Home() {
    return (
        <>
          <Navbar/>
            <div className="min-h-screen flex flex-col items-center bg-gray-100 pt-24">
                <h1 className="text-4xl font-bold text-gray-600 mb-4">Welcome to EventSphere</h1>
                <p className="text-lg text-gray-700 mb-6">Streamline your event planning and coordination</p>
            </div>
            <Footer />
        </>

    );
}

export default Home;