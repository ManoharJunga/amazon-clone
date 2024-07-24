import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header() {
    return (
        <div className="header-side">
            <div className="user-info">
                <p>Hello, Robert Fox</p>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search your products" />
                <button className="search-button">
                    <SearchIcon />
                </button>
            </div>
            <div className="notification-bar">
                <span>
                    <NotificationsNoneIcon />
                </span>
                <span>
                    <MailOutlineIcon />
                </span>
                <span>
                    <AccountCircleIcon className='user-avatar' alt='User Profile' />
                </span>
            </div>
        </div>
    )
}

export default Header