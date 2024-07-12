import React from 'react';
import './MenuToggleBar.css';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from '../src/assets/Logo.svg';

function MenuToggleBar() {
    return (
        <div style={styles.navPanel}>
            <div className='logo'>
                <img src={Logo} />
            </div>
           
            <button className="btn allMenu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <MenuIcon className='menuIcon' htmlColor="#3300FF" />
            </button>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <div className='menuProfile'>
                        <AccountCircleIcon className='userIcon' />
                        <div className='username'>
                            Hello, sign in
                        </div>
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className='menuContainer'>
                    <ul className='menuSection'>
                        <li className='heading'>Trending</li>
                        <li className='menuContent'>Best Sellers</li>
                        <li className='menuContent'>New Arrivals</li>
                        <li className='menuContent'>Top Rated</li>
                    </ul>
                    <ul className='menuSection'>
                        <li className='heading'>Categories</li>
                        <li className='menuContent'>Men</li>
                        <li className='menuContent'>Women</li>
                        <li className='menuContent'>Kids</li>
                    </ul>
                    <ul className='menuSection'>
                        <li className='heading'>Brands</li>
                        <li className='menuContent'>Nike</li>
                        <li className='menuContent'>Adidas</li>
                        <li className='menuContent'>Puma</li>
                    </ul>
                    <ul className='menuSection'>
                        <li className='heading'>Sale</li>
                        <li className='menuContent'>Clearance</li>
                        <li className='menuContent'>Discounts</li>
                        <li className='menuContent'>Special Offers</li>
                    </ul>
                </div>

            </div>
        </div >
    );
}

export default MenuToggleBar;

const styles = {
    navPanel: {
        display: 'flex',
        width: '100%',
        height: '60px',
        alignItems: 'center',
        paddingLeft: '150px',
    },
};
