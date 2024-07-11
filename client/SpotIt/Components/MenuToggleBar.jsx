import React from 'react';
import './MenuToggleBar.css';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function MenuToggleBar() {
    return (
        <div style={styles.navPanel}>
            <button className="btn allMenu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <MenuIcon className='menuIcon' htmlColor="#3300FF" />
            </button>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <div className='menuProfile'>
                        <AccountCircleIcon className='userIcon'/>
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
                        <li className='menuContent'>New Releases</li>
                        <li className='menuContent'>New Shops</li>
                    </ul>
                </div>
            </div>
        </div>
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
