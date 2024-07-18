import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.svg';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Button from '@mui/material/Button'; 
import './Header.css';

function Header() {
    return (
        <header>
            <div className="container-fluid">
                <div className="row align-items-center">
                    {/* Logo Wrapper */}
                    <div className="col-6 col-md-3">
                        <Link to={'/'}>
                            <img src={logo} className='logo' alt="Logo" />
                        </Link>
                    </div>
                    {/* Button Wrapper */}
                    <div className="col-6 col-md-3 d-flex justify-content-end">
                        <Button className="round-button">
                            <MenuOpenIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
