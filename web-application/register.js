document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('regUsername').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value.trim();

        if (!username || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};

        if (registeredUsers[username]) {
            alert('Username already exists');
            return;
        }

        registeredUsers[username] = {
            email,
            password
        };

        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        alert('Registration successful! Please login.');
        window.location.href = 'index.html';
    });
});