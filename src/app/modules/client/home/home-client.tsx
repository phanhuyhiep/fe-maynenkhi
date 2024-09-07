import { useState } from 'react';

const HomeClient = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (event:any) => {
        event.preventDefault();

        try {
            const res = await fetch(`http://192.168.100.89:8123/chat?user_input=${encodeURIComponent(userInput)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(JSON.stringify(errorData));
            }

            const data = await res.json();
            setResponse(data.response);
        } catch (error) {
            console.error('Error:', error);
            setResponse(`An error occurred: `);
        }
    };

    return (
        <div>
            <h1>Send Message to API</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user_input">Message:</label>
                <input
                    type="text"
                    id="user_input"
                    name="user_input"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
            <div id="response">{response}</div>
        </div>
    );
};

export default HomeClient;
