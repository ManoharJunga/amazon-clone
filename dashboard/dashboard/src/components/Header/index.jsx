import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
    return (
        <header >
            <div className="container-fluid">
                <div className="row" >
                    {/* Logo Wraooer */}
                    <div className="col-xs-3">
                        <Link to={'/'}></Link>
                    </ div>
                </div>
            </div>
        </header>
    )
}

export default Header