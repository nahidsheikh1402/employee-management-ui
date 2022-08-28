import React from 'react';

const HeaderComponent = () => {
    const onLogoutClick = () => {
        window.location.href="/"
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="navbar-brand">Employee Management</div>
                    <button className="btn btn-primary" style={{ marginRight: 0 }} onClick={onLogoutClick}> Home</button> 
                </nav>
            </header>
        </div>
    )
}
export default HeaderComponent;
