document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.getElementById('loginContainer');
    const mainContent = document.getElementById('mainContent');

    // Define hostelData at the top level so it's accessible everywhere
    const hostelData = {
        availableRooms: 15,
        totalVacancies: 25,
        pendingFees: [
            { name: "John Doe", room: "101", amount: 5000 },
            { name: "Jane Smith", room: "102", amount: 3500 },
            { name: "Mike Johnson", room: "103", amount: 4200 }
        ]
    };

    const validCredentials = {
        admin: {
            username: 'admin',
            password: 'admin'
        }
    };

    // Get registered users from localStorage
    const getRegisteredUsers = () => {
        return JSON.parse(localStorage.getItem('registeredUsers')) || {};
    };

    // Single declaration of typeButtons and currentUserType
    const typeButtons = document.querySelectorAll('.type-btn');
    let currentUserType = 'user';

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentUserType = button.dataset.type;
            toggleRegistrationButton(currentUserType);
        });
    });

    function toggleRegistrationButton(userType) {
        const registerBtn = document.querySelector('.register-btn');
        if (registerBtn) {
            registerBtn.style.display = userType === 'user' ? 'block' : 'none';
        }
    }

    // Handle registration modal
    const registerBtn = document.querySelector('.register-btn');
    const registerModal = document.getElementById('registerModal');
    
    if (registerBtn && registerModal) {
        registerBtn.addEventListener('click', () => {
            registerModal.style.display = 'block';
        });
    }

    // Handle registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newUsername = document.getElementById('newUsername').value.trim();
            const newPassword = document.getElementById('newPassword').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!newUsername || !newPassword || !email) {
                alert('Please fill all fields');
                return;
            }

            const registeredUsers = getRegisteredUsers();
            if (registeredUsers[newUsername]) {
                alert('Username already exists!');
                return;
            }

            registeredUsers[newUsername] = {
                password: newPassword,
                email: email
            };
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            
            alert('Registration successful! You can now login.');
            registerModal.style.display = 'none';
            registerForm.reset();
        });
    }

    // Login form handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (currentUserType === 'admin') {
            handleAdminLogin(username, password);
        } else {
            handleUserLogin(username, password);
        }
    });

    function handleAdminLogin(username, password) {
        if (username === validCredentials.admin.username && 
            password === validCredentials.admin.password) {
            showSuccessAndRedirect(username, 'admin');
        } else {
            alert('Invalid admin credentials.');
        }
    }

    function handleUserLogin(username, password) {
        const registeredUsers = getRegisteredUsers();
        if (registeredUsers[username] && registeredUsers[username].password === password) {
            showSuccessAndRedirect(username, 'user');
        } else {
            alert('Invalid user credentials.');
        }
    }

    function showSuccessAndRedirect(username, userType) {
        const popup = document.createElement('div');
        popup.className = 'success-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <h3>Success!</h3>
                <p>Login successful. Welcome, ${username}!</p>
            </div>
        `;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
            loginContainer.style.display = 'none';
            if (userType === 'admin') {
                showAdminDashboard();
            } else {
                showUserDashboard();
            }
        }, 2000);
    }

    function showAdminDashboard() {
        const adminContent = `
            <div class="admin-dashboard fade-in">
                <header class="admin-header">
                    <h1 class="slide-down">Hostel Management System</h1>
                    <button class="admin-control-btn pulse" onclick="showAdminControls()">
                        <span class="btn-text">Admin Controls</span>
                        <span class="btn-icon">⚙️</span>
                    </button>
                </header>
                <div class="info-cards">
                    <div class="card slide-in-left">
                        <h3>Room Status</h3>
                        <p>Available Rooms: <span id="availableRooms">${hostelData.availableRooms}</span></p>
                        <p>Total Vacancies: <span id="vacancyCount">${hostelData.totalVacancies}</span></p>
                    </div>
                    <div class="card slide-in-up">
                        <h3>Pending Fees</h3>
                        <div id="pendingFeesList" class="fees-list">
                            ${hostelData.pendingFees.map(fee => `
                                <div class="fee-item">
                                    <div><strong>${fee.name}</strong> - Room ${fee.room}</div>
                                    <div>₹${fee.amount}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="card slide-in-right">
                        <h3>Quick Stats</h3>
                        <p>Total Students: ${hostelData.pendingFees.length}</p>
                        <p>Total Rooms: ${hostelData.availableRooms + hostelData.totalVacancies}</p>
                    </div>
                </div>
            </div>
        `;
        mainContent.innerHTML = adminContent;
        mainContent.style.display = 'block';
        mainContent.classList.add('fade-in');
    }

    function showUserDashboard() {
        const userContent = `
            <div class="user-dashboard fade-in">
                <div class="dashboard-header">
                    <button class="back-btn" onclick="goBackToLogin()">← Back to Login</button>
                    <h2 class="slide-down">Hostel Information</h2>
                </div>
                <div class="info-cards">
                    <div class="card slide-in-left" onclick="showInfoModal('location')">
                        <h3>Location</h3>
                        <p>123 Hostel Street, City Name</p>
                        <p>Landmark: Near Central Park</p>
                    </div>
                    <div class="card slide-in-up" onclick="showInfoModal('rooms')">
                        <h3>Room Availability</h3>
                        <p>Available Rooms: ${hostelData.availableRooms}</p>
                        <p>Starting Rent: ₹5000/month</p>
                    </div>
                    <div class="card slide-in-right" onclick="showInfoModal('contact')">
                        <h3>Contact Information</h3>
                        <p>Phone: +1234567890</p>
                        <p>Email: info@hostel.com</p>
                    </div>
                    <div class="card slide-in-right" onclick="showInfoModal('rent')">
                        <h3>Rent Details</h3>
                        <p>Starting from ₹3000/month</p>
                        <p>All utilities included</p>
                    </div>
                </div>
            </div>
        
            <!-- Modal templates -->
            <div id="locationModal" class="info-card-modal">
                <div class="info-card-content">
                    <button class="close-modal" onclick="closeInfoModal('location')">&times;</button>
                    <h3>Location Details</h3>
                    <div class="info-details">
                        <p><strong>Address:</strong> 123 Hostel Street, City Name</p>
                        <p><strong>Landmark:</strong> Near Central Park</p>
                        <p><strong>Area:</strong> Downtown</p>
                        <p><strong>Nearby:</strong></p>
                        <ul>
                            <li>Bus Station - 0.5 km</li>
                            <li>Shopping Mall - 1 km</li>
                            <li>Hospital - 1.5 km</li>
                            <li>Restaurant Zone - 0.3 km</li>
                        </ul>
                    </div>
                </div>
            </div>
        
            <div id="roomsModal" class="info-card-modal">
                <div class="info-card-content">
                    <button class="close-modal" onclick="closeInfoModal('rooms')">&times;</button>
                    <h3>Room Details</h3>
                    <div class="info-details">
                        <p><strong>Available Rooms:</strong> ${hostelData.availableRooms}</p>
                        <p><strong>Room Types:</strong></p>
                        <ul>
                            <li>Single Occupancy - ₹5000/month</li>
                            <li>Double Sharing - ₹3500/month</li>
                            <li>Triple Sharing - ₹3000/month</li>
                        </ul>
                        <p><strong>Facilities:</strong></p>
                        <ul>
                            <li>Attached Bathroom</li>
                            <li>Hot Water</li>
                            <li>Study Table</li>
                            <li>Wi-Fi Connection</li>
                        </ul>
                    </div>
                </div>
            </div>
        
            <div id="contactModal" class="info-card-modal">
                <div class="info-card-content">
                    <button class="close-modal" onclick="closeInfoModal('contact')">&times;</button>
                    <h3>Contact Details</h3>
                    <div class="info-details">
                        <p><strong>Phone Numbers:</strong></p>
                        <ul>
                            <li>Main Office: +1234567890</li>
                            <li>Warden: +1234567891</li>
                            <li>Security: +1234567892</li>
                        </ul>
                        <p><strong>Email Addresses:</strong></p>
                        <ul>
                            <li>General Inquiries: info@hostel.com</li>
                            <li>Admissions: admissions@hostel.com</li>
                            <li>Complaints: support@hostel.com</li>
                        </ul>
                        <p><strong>Office Hours:</strong></p>
                        <p>Monday to Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 2:00 PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                </div>
            </div>
            <div id="rentModal" class="info-card-modal">
                <div class="info-card-content">
                    <button class="close-modal" onclick="closeInfoModal('rent')">&times;</button>
                    <h3>Rent Information</h3>
                    <div class="info-details">
                        <p><strong>Room Types & Rates:</strong></p>
                        <ul>
                            <li>Single Occupancy: ₹5000/month</li>
                            <li>Double Sharing: ₹3500/month</li>
                            <li>Triple Sharing: ₹3000/month</li>
                        </ul>
                        <p><strong>Security Deposit:</strong> ₹5000 (Refundable)</p>
                        <p><strong>Included in Rent:</strong></p>
                        <ul>
                            <li>Electricity & Water</li>
                            <li>Wi-Fi Connection</li>
                            <li>Room Cleaning</li>
                            <li>Basic Furniture</li>
                        </ul>
                        <p><strong>Payment Terms:</strong></p>
                        <ul>
                            <li>Monthly payment before 5th of each month</li>
                            <li>Late fee: ₹500 after due date</li>
                            <li>Accepted payment methods: Cash, UPI, Bank Transfer</li>
                        </ul>
                        <p><strong>Additional Charges:</strong></p>
                        <ul>
                            <li>AC rooms: +₹1000/month</li>
                            <li>Parking: ₹500/month</li>
                            <li>Laundry service: ₹800/month</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        mainContent.innerHTML = userContent;
        mainContent.style.display = 'block';
    
        // Add these functions to window object for onclick access
        window.showInfoModal = function(type) {
            document.getElementById(`${type}Modal`).style.display = 'block';
        };
    
        window.closeInfoModal = function(type) {
            document.getElementById(`${type}Modal`).style.display = 'none';
        };
    
        // Close modal when clicking outside
        document.querySelectorAll('.info-card-modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    function initializeMainContent() {
        try {
            const availableRoomsElement = document.getElementById('availableRooms');
            const vacancyCountElement = document.getElementById('vacancyCount');
            const feesListElement = document.getElementById('pendingFeesList');

            if (!availableRoomsElement || !vacancyCountElement || !feesListElement) {
                console.error('Required elements for hostel data not found!');
                return;
            }

            availableRoomsElement.textContent = hostelData.availableRooms;
            vacancyCountElement.textContent = hostelData.totalVacancies;
            
            feesListElement.innerHTML = '';
            hostelData.pendingFees.forEach(fee => {
                const feeItem = document.createElement('div');
                feeItem.className = 'fee-item';
                feeItem.innerHTML = `
                    <div>
                        <strong>${fee.name}</strong> - Room ${fee.room}
                    </div>
                    <div>₹${fee.amount}</div>
                `;
                feesListElement.appendChild(feeItem);
            });
        } catch (error) {
            console.error('Error initializing main content:', error);
            alert('An error occurred while loading hostel data.');
        }
    }
    
    // Remove the duplicate goBackToLogin function and keep only one version
    function goBackToLogin() {
        const loginContainer = document.getElementById('loginContainer');
        const registrationContainer = document.getElementById('registrationContainer');
        const mainContent = document.getElementById('mainContent');
        
        registrationContainer.style.opacity = '0';
        mainContent.style.display = 'none';
        
        setTimeout(() => {
            registrationContainer.style.display = 'none';
            loginContainer.style.display = 'flex';
            setTimeout(() => {
                loginContainer.style.opacity = '1';
            }, 50);
            // Clear form fields
            document.getElementById('registrationForm').reset();
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }, 300);
    }

    // Remove the duplicate showRegisterModal content and keep the function
    function showRegisterModal() {
        const loginContainer = document.getElementById('loginContainer');
        const registrationContainer = document.getElementById('registrationContainer');
        
        loginContainer.style.opacity = '0';
        setTimeout(() => {
            loginContainer.style.display = 'none';
            registrationContainer.style.display = 'flex';
            setTimeout(() => {
                registrationContainer.style.opacity = '1';
            }, 50);
        }, 300);
    }

    // Remove the registerContent variable and its related code since we already have the registration form in HTML

    // Update the registration form submission handler
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            username: document.getElementById('regUsername').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            address: document.getElementById('address').value.trim(),
            roomType: document.getElementById('roomType').value,
            password: document.getElementById('regPassword').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            registrationDate: new Date().toISOString()
        };

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Get existing users or initialize empty object
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};
        
        // Check if username already exists
        if (registeredUsers[formData.username]) {
            alert('Username already exists!');
            return;
        }

        // Save new user
        registeredUsers[formData.username] = formData;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        
        alert('Registration successful! Please login.');
        goBackToLogin();
    });

    function closeRegisterModal() {
        document.getElementById('registerModal').style.display = 'none';
        document.getElementById('registerForm').reset();
    }
});


function showAdminControls() {
    const adminModal = document.createElement('div');
    adminModal.className = 'admin-modal';
    adminModal.id = 'adminModal';
    adminModal.innerHTML = `
        <div class="admin-form-container">
            <h2>Admin Controls</h2>
            <form id="adminControlForm">
                <div class="form-group">
                    <label>Available Rooms</label>
                    <input type="number" id="availableRoomsInput" min="0" required>
                </div>
                <div class="form-group">
                    <label>Total Vacancies</label>
                    <input type="number" id="vacanciesInput" min="0" required>
                </div>
                <div class="form-group">
                    <label>Add Pending Fee</label>
                    <input type="text" id="studentName" placeholder="Student Name" required>
                    <input type="text" id="roomNumber" placeholder="Room Number" required>
                    <input type="number" id="feeAmount" placeholder="Amount" required>
                </div>
                <div class="button-group">
                    <button type="submit" class="register-submit-btn">Update</button>
                    <button type="button" class="cancel-btn" onclick="closeAdminModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(adminModal);
    adminModal.style.display = 'block';

    document.getElementById('adminControlForm').addEventListener('submit', handleAdminUpdate);
}

function closeAdminModal() {
    const adminModal = document.getElementById('adminModal');
    if (adminModal) {
        adminModal.remove();
    }
}

function handleAdminUpdate(e) {
    e.preventDefault();
    const availableRooms = document.getElementById('availableRoomsInput').value;
    const vacancies = document.getElementById('vacanciesInput').value;
    const studentName = document.getElementById('studentName').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const feeAmount = document.getElementById('feeAmount').value;

    // Update the display
    document.getElementById('availableRooms').textContent = availableRooms;
    document.getElementById('vacancyCount').textContent = vacancies;

    // Add new fee to the list
    const feesList = document.getElementById('pendingFeesList');
    const feeItem = document.createElement('div');
    feeItem.className = 'fee-item';
    feeItem.innerHTML = `
        <div>
            <strong>${studentName}</strong> - Room ${roomNumber}
        </div>
        <div>₹${feeAmount}</div>
    `;
    feesList.appendChild(feeItem);

    closeAdminModal();
    alert('Updates saved successfully!');
}