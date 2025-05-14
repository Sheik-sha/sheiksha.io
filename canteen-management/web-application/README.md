# Web Application Documentation

## Overview
This web application is designed to facilitate user registration and management by an admin. It includes features for admin login, user registration, user login, logout, and item management.

## Features
- **Admin Login**: Admins can log in to manage user registrations and items.
- **User Registration**: Users can register, but their accounts require admin approval before they can log in.
- **User Login**: Registered users can log in after receiving approval from the admin.
- **Logout**: Both admins and users can log out of their accounts.
- **Item Management**: Admins can add and remove items from the application.

## Project Structure
```
web-application
├── src
│   ├── admin
│   │   ├── admin-login.html
│   │   ├── admin-dashboard.html
│   │   └── admin.js
│   ├── user
│   │   ├── user-registration.html
│   │   ├── user-login.html
│   │   ├── user-dashboard.html
│   │   └── user.js
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   ├── auth.js
│   │   ├── items.js
│   │   └── utils.js
│   └── index.html
├── README.md
└── assets
    └── logo.svg
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Open the `index.html` file in your web browser to access the application.
3. Ensure that you have a local server running if you plan to use any server-side functionalities.

## Usage Guidelines
- **Admin Login**: Navigate to the admin login page to access the admin dashboard.
- **User Registration**: Users can fill out the registration form, which will be sent to the admin for approval.
- **Admin Dashboard**: Admins can view pending registrations and manage items from the dashboard.
- **User Dashboard**: After approval, users can log in and access their dashboard to view available items.

## Technologies Used
- HTML
- CSS
- JavaScript

## License
This project is licensed under the MIT License.