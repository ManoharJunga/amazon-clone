import React from 'react';
import './MenuToggleBar.css';

function MenuToggleBar() {
    return (
        <div style={styles.navPanel}>
            <button className="btn allMenu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <span className="menuIcon"></span>
                <span className="menuText">All</span>
            </button>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
                    </div>
                    <div className="dropdown mt-3">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                            Dropdown button
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style={styles.panelContent}>
                <span className="panelText">CLOTHING</span>
                <span className="panelText">FOOTWEAR</span>
                <span className="panelText">ACCESSORIES</span>
                <span className="panelText">ETHNIC & FESTIVE</span>
                <span className="panelText">WESTERN WEAR</span>
                <span className="panelText">NEW RELEASES</span>
                <span className="panelText">GROOMING</span>
                <span className="panelText">CUSTOMER SERVICES</span>
            </div>
        </div>
    );
}

export default MenuToggleBar;

const styles = {
    navPanel: {
        display: 'flex',
        width: '1536px',
        height: '40px',
        paddingLeft: '11px',
    },
    panelContent: {
        display: 'flex',
        flexDirection: 'row',
        width: '1450px',
    },
};
