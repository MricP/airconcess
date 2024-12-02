import React, { useState } from 'react';
import { postTest } from '../services/auth';

function TestPage() {
    const [content, setContent] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [errorHtml, setErrorHtml] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            content: content,
        };

        try {
            const response = await postTest(data);
            if (response.message) {
                console.log('Data fetched:', response);
                setResponseMessage(response.message);
            } else {
                setResponseMessage('Test non créé');
                setErrorHtml(JSON.stringify(response));
            }
        } catch (error) {
            if (error.response && typeof error.response.data === 'string') {
                console.log('Error response:', error.response.data);
                setErrorHtml(error.response.data);
            } else {
                setResponseMessage('Une erreur est survenue');
            }
        }
    };

    return (
        <div>
            <h1>Créer un nouveau test</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="content">Contenu</label>
                    <input
                        type="text"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Envoyer</button>
            </form>

            {responseMessage && <p>{responseMessage}</p>}

            {errorHtml && (
                <div
                    dangerouslySetInnerHTML={{ __html: errorHtml }}
                    style={{ color: 'red', marginTop: '20px' }}
                />
            )}
        </div>
    );
}

export default TestPage;
