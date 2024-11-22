ReactJS Web App with Laravel API
This is a sample web application built with ReactJS for the frontend and Laravel for the backend API. The app provides basic authentication features, allowing users to register, login, and logout.

Features
Frontend (ReactJS)
Login Page:

A form that requires email and password for authentication.
Validates user credentials against the Laravel API.
Redirects to the homepage upon successful login.
Register Page:

A form that requires the user’s name, email, and password to create a new account.
Upon successful registration, the user can log in with the credentials they’ve just created.
Home Page:

Provides a button for users to log out of the application.
Backend (Laravel API)
Registration Endpoint:

Handles user registration, storing name, email, and password securely in the database.
Login Endpoint:

Authenticates the user based on provided email and password.
Returns a JWT token on successful login for maintaining the session.
Logout Endpoint:

Logs the user out by invalidating the JWT token.
