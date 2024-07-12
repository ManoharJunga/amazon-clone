import React, { useState, useEffect } from 'react';
import './PanelContent.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useLocation } from 'react-router-dom';

function PanelContent() {
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setActiveCategory(path);
    }, [location.pathname]);

    const categories = [
        { name: 'Men', path: '/men' },
        { name: 'Women', path: '/women' },
        { name: 'Kids', path: '/kids' },
        { name: 'Beauty', path: '/beauty' },
        { name: 'Jewellery', path: '/jewellery' },
        { name: 'Sports', path: '/sports' }
    ];

    return (
        <div className="panelContent">
            <div className="grey-line"></div>
            <div className="categories">
                {categories.map((category) => (
                    <div className="category" key={category.name}>
                        <Link to={category.path}>
                            <button
                                className={`category-button ${activeCategory === category.path.slice(1) ? 'active' : ''}`}
                            >
                                <span className="category-text">{category.name}</span>
                                <KeyboardArrowDownIcon className="category-arrow" />
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="grey-line"></div>
        </div>
    );
}

export default PanelContent;
