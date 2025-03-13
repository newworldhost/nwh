document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('messageForm');
    const messagesDiv = document.getElementById('messages');

    const getMessagesFromCookies = () => {
        const cookies = document.cookie.split('; ');
        const messagesCookie = cookies.find(cookie => cookie.startsWith('messages='));
        if (messagesCookie) {
            return JSON.parse(decodeURIComponent(messagesCookie.split('=')[1]));
        }
        return [];
    };

    const saveMessagesToCookies = (messages) => {
        document.cookie = `messages=${encodeURIComponent(JSON.stringify(messages))}; path=/; max-age=31536000`;
    };

    const loadMessages = () => {
        const messages = getMessagesFromCookies();
        messagesDiv.innerHTML = messages.map(msg => `
            <div class="message">
                <strong>${msg.username}</strong>: ${msg.message}
            </div>
        `).join('');
    };

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const message = document.getElementById('message').value;

        const messages = getMessagesFromCookies();
        messages.push({ username, message });
        saveMessagesToCookies(messages);

        document.getElementById('username').value = '';
        document.getElementById('message').value = '';
        loadMessages();
    });

    loadMessages();
});