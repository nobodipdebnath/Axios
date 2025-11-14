import React from 'react';

const Navbar = () => {
        const links = <>
    <li>Home</li>
    <li>About</li>
    <li>Blog</li>
    <li>Service</li>
    <li>Contact</li>
    </>
    return (
        <nav>
            <div>
                <h1>logo</h1>
            </div>
            <ul>
                {links}
            </ul>
            <div>
                <button>Login</button>
                <button>Register</button>
            </div>
        </nav>
    );
};

export default Navbar;