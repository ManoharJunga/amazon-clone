import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo.svg';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ChatIcon from '@mui/icons-material/Chat';
import MailIcon from '@mui/icons-material/Mail';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import CategoryIcon from '@mui/icons-material/Category';
import './SideNavBar.css';

function SideNavBar() {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const location = useLocation();

    const handleMenuItemClick = (path) => {
        setSelectedMenu(path);
    };

    const menuItems = [
        { path: '/', label: 'Dashboard', icon: <DashboardIcon /> },
        { path: '/customer', label: 'Customer', icon: <PeopleIcon /> },
        { path: '/products', label: 'Products', icon: <ShoppingCartIcon /> },
        { path: '/payments', label: 'Payments', icon: <PaymentIcon /> },
        { path: '/orders', label: 'Orders', icon: <ReceiptIcon /> },
        { path: '/chat', label: 'Chat', icon: <ChatIcon /> },
        { path: '/mail', label: 'Mail', icon: <MailIcon /> },
        { path: '/calendar', label: 'Calendar', icon: <CalendarTodayIcon /> },
        { path: '/brands', label: 'Brands', icon: <BrandingWatermarkIcon /> },
        {path: '/categorymanager', label: 'Category Manager', icon: <CategoryIcon />}
    ];

    const bottomMenuItems = [
        { path: '/setting', label: 'Setting', icon: <SettingsIcon /> },
        { path: '/logout', label: 'Log Out', icon: <ExitToAppIcon /> }
    ];

    return (
        <header>
            <div className="header-container">
                <div className="logo-wrapper">
                    <Link to={'/'}>
                        <img src={logo} className='logo' alt="Logo" />
                    </Link>
                </div>
                <div className="menu-wrapper">
                    {menuItems.map(menu => (
                        <Button
                            key={menu.path}
                            className={`button_menu ${location.pathname === menu.path ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick(menu.path)}
                            startIcon={menu.icon}
                        >
                            <Link to={menu.path} className='menu-link'>
                                <span>{menu.label}</span>
                            </Link>
                        </Button>
                    ))}
                </div>
                <div className="bottom-menu-wrapper">
                    {bottomMenuItems.map(menu => (
                        <Button
                            key={menu.path}
                            className={`button_menu ${location.pathname === menu.path ? 'active' : ''}`}
                            onClick={() => handleMenuItemClick(menu.path)}
                            startIcon={menu.icon}
                        >
                            <Link to={menu.path} className='menu-link'>
                                <span>{menu.label}</span>
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
            
        </header>
    );
}

export default SideNavBar;
