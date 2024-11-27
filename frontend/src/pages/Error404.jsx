import React from 'react';
import { Link } from 'react-router-dom';

export default function Error404() {
    return (
        <div>
            <div>
                <h1>404</h1>
                <p>Page Not Found</p>
                <p>Sorry, the page you are looking for does not exist.</p>
                <Link to={'/'}>
                    Go Home
                </Link>
            </div>
        </div>
    );
}
