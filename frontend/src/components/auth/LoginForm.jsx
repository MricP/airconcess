import React from 'react';

export default function LoginForm() {

    const handleSubmit = () => {
        console.log('submit');
    }

    return (
        <form>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" placeholder='albertDupond@example.com' />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder='********' />
            <button onClick={handleSubmit}>Envoyer</button>
        </form>
    );
}
