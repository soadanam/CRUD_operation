import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header-main'>

            <Link className='headers-route' to={'/Home'}>Home</Link>
            <Link className='headers-route' to={'/users/'}>Users</Link>
            <Link className='headers-route' to={'/addUser'}>Add User</Link>


        </div>
    );
};

export default Header;