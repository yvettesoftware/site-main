import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-auto">
                    <img src="images/logo.png" width="400" alt='Yvette Software' />
                </div>

                <div className="col">
                    <nav className="nav justify-content-end py-3 px-3 rounded">
                        <NavLink to="/" end className="nav-link">
                            HOME
                        </NavLink>
                        <div
                            className="nav-item dropdown"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                            style={{ position: 'relative' }}
                        >
                            <span className="nav-link dropdown-toggle" role="button">
                                SERVICES
                            </span>
                            {showDropdown && (
                                <ul className="dropdown-menu show" style={{ position: 'absolute' }}>
                                    <li>
                                        <a  href="/login"
                                            className="dropdown-item d-flex justify-content-between align-items-center"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            DomuIQ
                                            <i className="bi bi-box-arrow-up-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </div>
                        <NavLink to="/about" className="nav-link">
                            ABOUT US
                        </NavLink>
                        <NavLink to="/contact" className="nav-link">
                            CONTACT US
                        </NavLink>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Navigation;