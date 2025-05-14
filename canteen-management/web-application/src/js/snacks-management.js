const snacks = [
    {
        id: 1,
        name: 'Veg Puff',
        price: 20,
        description: 'Flaky pastry filled with spiced vegetables',
        image: '../images/veg-puff.jpg'
    },
    {
        id: 2,
        name: 'Egg Puff',
        price: 25,
        description: 'Crispy pastry with seasoned egg filling',
        image: '../images/egg-puff.jpg'
    },
    {
        id: 3,
        name: 'Chicken Roll',
        price: 35,
        description: 'Fresh wrap with spiced chicken and vegetables',
        image: '../images/chicken-roll.jpg'
    }
];

// Add event listeners for edit and delete buttons
document.addEventListener('DOMContentLoaded', function() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const addSnackBtn = document.querySelector('.add-snack-btn');
    const userDashboardBtn = document.querySelector('.user-dashboard-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.snack-card');
            const snackName = card.querySelector('.snack-name').textContent;
            editSnack(snackName);
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.snack-card');
            const snackName = card.querySelector('.snack-name').textContent;
            deleteSnack(snackName);
        });
    });

    addSnackBtn.addEventListener('click', addNewSnack);

    if (userDashboardBtn) {
        userDashboardBtn.addEventListener('click', function() {
            window.location.href = '../admin/user-approval.html';
        });
    }
});

function editSnack(snackName) {
    // Implement edit functionality
    alert(`Editing ${snackName}`);
}

function deleteSnack(snackName) {
    if (confirm(`Are you sure you want to delete ${snackName}?`)) {
        // Implement delete functionality
        alert(`${snackName} deleted successfully`);
    }
}

function addNewSnack() {
    // Implement add new snack functionality
    alert('Adding new snack');
}