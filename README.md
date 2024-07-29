# Chaintech Network Task

## Description

This project is a full-stack web application for user management and authentication. It includes functionalities for user registration, login, profile management, and account deletion. The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and follows best practices for secure and scalable web development.

## Features

- **User Registration:** Users can create new accounts by providing their details.
- **Login:** Existing users can log in to their accounts.
- **Profile Management:** Users can update their profile information.
- **Account Deletion:** Users can delete their accounts.
- **Password Visibility Toggle:** Users can toggle password visibility during registration and login.
- **Responsive Design:** The application is responsive and works well on various devices.
- **Error Handling:** Includes error handling and validation for user inputs.


## Screenshots

1. **Registration Form:**
    ![Registration Form](https://github.com/user-attachments/assets/c2b53471-e2ca-46e1-aeb5-4324cd433952)

2. **Login Form:**
    ![Login Form](https://github.com/user-attachments/assets/8c63a3e1-d6ce-43b6-ba69-d7209fe4332f)

3. **Profile Management:**
    ![Profile Management](https://github.com/user-attachments/assets/fe526cc6-686f-4c61-8a46-2a09b679200b)



## Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/vishalj6/ChaintechNetworkTask.git
    ```
2. **Navigate to the Project Directory:**
    ```bash
    cd ChaintechNetworkTask
    ```
3. **Install Dependencies:**

    For the backend:
    ```bash
    cd backend
    npm install
    ```

    For the frontend:
    ```bash
    cd account-management-app
    npm install
    ```

4. **Set Up Environment Variables:**

    Create a `.env` file in the `backend` directory and add your environment variables:
    ```plaintext
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

5. **Run the Application:**

    For the backend:
    ```bash
    cd backend
    npm start
    ```

    For the frontend:
    ```bash
    cd frontend
    npm start
    ```

## Usage

- **Registration:** Go to `/register` to create a new account.
- **Login:** Go to `/login` to log in to your account.
- **Profile Management:** After logging in, go to `/` to manage your profile.
- **Account Deletion:** Click the "Delete Account" button in the profile management section.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
