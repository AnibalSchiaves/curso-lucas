import React from 'react';
import Menu from '../components/Menu';
import logo from '../logo.svg';


const Home = () => {
    return (
        <>
            <Menu></Menu>
            <img src={logo} className="App-logo" alt="logo" />
        </>
    );
}

export default Home;