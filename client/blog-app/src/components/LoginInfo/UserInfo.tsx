import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import accountLogo from '../../assets/icons/account.svg';
import './UserInfo.css';

export const UserInfo = ({ isOriginalHeader } : { isOriginalHeader: boolean }) => {
    const [isUserDropdownDisplay, setIsUserDropdownDisplay] = useState(false);

    const handleLogoMouseOver = useCallback(() => {
        setIsUserDropdownDisplay(true);
    }, [setIsUserDropdownDisplay]);

    const handleLogoMouseLeave = useCallback(() => {
        setIsUserDropdownDisplay(false);
    }, [setIsUserDropdownDisplay]);

    return (
        <div className="logo-container">
            <img
                className="account-logo"
                onMouseOver={handleLogoMouseOver}
                src={accountLogo}
                width={36}
                height={36}
                alt="account"
            />
            <div
                // style={{ backgroundColor: isOriginalHeader ? '#232E52': 'white' }}
                className={`${isUserDropdownDisplay ? `${isOriginalHeader ? 'user-dropdown-original' : 'user-dropdown'}` : 'user-dropdown-hidden'}`}
                onMouseLeave={handleLogoMouseLeave}
            >
                <Link to="/my-account"><p>Your Account</p></Link>
                <Link to="/my-articles"><p>Your Articles</p></Link>
            </div>
        </div>
    );
};
