// This file contains JavaScript functions for handling admin login, item addition, and removal, as well as managing user registrations.

document.addEventListener('DOMContentLoaded', function () {
    const adminLoginForm = document.getElementById('admin-login-form');
    const addItemForm = document.getElementById('add-item-form');
    const removeItemForm = document.getElementById('remove-item-form');
    const userApprovalList = document.getElementById('user-approval-list');
    const itemList = document.getElementById('item-list'); // Assuming you have an item list container

    adminLoginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        adminLogin(username, password);
    });

    addItemForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const itemName = document.getElementById('item-name').value;
        addItem(itemName);
    });

    removeItemForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const itemId = document.getElementById('item-id').value;
        removeItem(itemId);
    });

    function adminLogin(username, password) {
        // Logic for admin login (e.g., validate credentials)
        console.log('Admin logged in:', username);
    }

    function addItem(itemName) {
        // Logic for adding an item (e.g., update database)
        console.log('Item added:', itemName);

        // Add item to the DOM with animation
        const item = document.createElement('div');
        item.className = 'item';
        item.textContent = itemName;
        itemList.appendChild(item);

        // Add fade-in animation
        item.style.animation = 'fadeIn 0.5s ease-in-out';
    }

    function removeItem(itemId) {
        // Logic for removing an item (e.g., update database)
        console.log('Item removed:', itemId);

        // Find and remove item from the DOM with animation
        const item = document.getElementById(itemId); // Assuming items have unique IDs
        if (item) {
            item.classList.add('removing'); // Add slide-out animation
            setTimeout(() => {
                item.remove();
            }, 500); // Match the animation duration
        }
    }

    function loadUserApprovals() {
        // Logic to load user registrations for admin approval
        console.log('Loading user approvals...');
    }

    loadUserApprovals();
});