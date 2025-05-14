// This file contains JavaScript functions for authentication processes, including user registration, login, and logout functionalities.

const users = [];
let loggedInUser = null;

// Function to register a new user
function registerUser(username, password) {
    const user = { username, password, approved: false };
    users.push(user);
    saveUsers();
    alert("Registration submitted for approval.");
}

// Function to approve user registration by admin
function approveUser(username) {
    const user = users.find(u => u.username === username);
    if (user) {
        user.approved = true;
        saveUsers();
        alert(`User ${username} has been approved successfully.`);
        return true;
    }
    return false;
}

// Function to login a user
function loginUser(username, password) {
    const user = users.find(u => u.username === username);
    if (user && user.password === password) {
        if (user.approved) {
            loggedInUser = user;
            alert(`Welcome, ${username}!`);
            return true;
        } else {
            alert("Your account is not approved yet.");
            return false;
        }
    } else {
        alert("Invalid username or password.");
        return false;
    }
}

// Function to logout the user
function logoutUser() {
    if (loggedInUser) {
        alert(`Goodbye, ${loggedInUser.username}!`);
        loggedInUser = null;
    } else {
        alert("No user is currently logged in.");
    }
}

// Admin credentials
const ADMIN_CREDENTIALS = {
    username: 'sheik',
    password: 'wasima'
};

// Admin login validation
function validateAdminLogin(username, password) {
    return username === ADMIN_CREDENTIALS.username && 
           password === ADMIN_CREDENTIALS.password;
}

// Handle admin login form submission
// Function to handle admin login and redirect
document.addEventListener('DOMContentLoaded', function() {
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (validateAdminLogin(username, password)) {
                alert('Login successful! Welcome Admin.');
                window.location.href = '../admin/dashboard.html'; // Changed to snacks dashboard
            } else {
                alert('Invalid admin credentials. Please try again.');
            }
        });
    }
});

// Function to approve user registration
function approveUser(username) {
    const user = users.find(u => u.username === username);
    if (user) {
        user.approved = true;
        alert(`User ${username} has been approved successfully.`);
        return true;
    }
    return false;
}

// Modified login function to check approval status
function loginUser(username, password) {
    const user = users.find(u => u.username === username);
    if (user && user.password === password) {
        if (user.approved) {
            loggedInUser = user;
            alert('Login successful!');
            return true;
        } else {
            alert('Your account is pending approval. Please wait for admin approval.');
            return false;
        }
    }
    alert('Invalid credentials or user not found.');
    return false;
}

// Store users in localStorage to persist data
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsers() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
        users.push(...JSON.parse(savedUsers));
    }
}

// Modified registerUser function
function registerUser(username, password) {
    const user = { username, password, approved: false };
    users.push(user);
    saveUsers();
    alert("Registration submitted for approval.");
}

// Modified approveUser function
function approveUser(username) {
    const user = users.find(u => u.username === username);
    if (user) {
        user.approved = true;
        saveUsers();
        alert(`User ${username} has been approved successfully.`);
        return true;
    }
    return false;
}

// Load existing users when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    
    // Admin login form handler
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (validateAdminLogin(username, password)) {
                alert('Login successful! Welcome Admin.');
                window.location.href = '../admin/dashboard.html';
            } else {
                alert('Invalid admin credentials. Please try again.');
            }
        });
    }

    // Display pending users in admin dashboard
    const pendingUsersContainer = document.getElementById('pendingUsers');
    if (pendingUsersContainer) {
        const pendingUsers = users.filter(user => !user.approved);
        pendingUsers.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'user-item';
            userElement.innerHTML = `
                <div class="user-info">
                    <h3>${user.username}</h3>
                </div>
                <button class="approve-btn" onclick="approveUserAndUpdate('${user.username}')">
                    Approve User
                </button>
            `;
            pendingUsersContainer.appendChild(userElement);
        });
    }
});

// Function to handle user approval and UI update
function approveUserAndUpdate(username) {
    if (approveUser(username)) {
        const userElement = document.querySelector(`[data-username="${username}"]`);
        if (userElement) {
            userElement.remove();
        }
    }
}