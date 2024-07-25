# Task Manager Web App

This Task Manager web app allows users to manage their tasks efficiently by creating, editing, and organizing tasks. It supports user authentication, task categorization, team collaboration, and more, built using the MERN stack.

## Features

- **User Authentication**
  - Secure signup/login
  - Profile management with avatar upload
- **Dashboard**
  - Overview of total, completed, in-progress, and to-do tasks
- **Task Management**
  - Create, read, update, and delete tasks
  - Share tasks with team members
  - Set task priority and stage
  - Add descriptions and due dates
- **Search, Sort, and Filter**
  - Search tasks by title or description
  - Sort tasks by date, priority, or stage
  - Filter tasks by status (To Do, In Progress, Completed)
- **Team Management**
  - Add or remove team members
  - Share tasks with specific team members
- **Trash**
  - Restore or permanently delete tasks
- **Settings**
  - Activate dark theme
  - Delete account
  - Change password

## Technologies Used

- **Frontend**
  - React.js
- **Backend**
  - Node.js
  - Express.js
- **Database**
  - MongoDB
- **API**
  - RESTful API
- **Authentication**
  - JSON Web Tokens (JWT)
- **Styling**
  - Tailwind CSS
- **Deployment**
  - Heroku (or another platform)

## Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/sayedibrahimi786/TaskManagerWebApp.git
   cd TaskManagerWebApp
   ```
   
2. **Install dependencies for the backend**

    ```sh
    cd backend
    npm install
   ```
3. **Install dependencies for the frontend**
    ```sh
    cd frontend
    npm install
    ```
4. **Set up environment variables**

Create a .env file in the backend directory and add your MongoDB URI and other environment variables:
    
    ```sh
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```

5. **Run the backend server**
    ```sh
    cd backend
    npm start
    ```
6. **Run the frontend server**
    ```sh
    cd frontend
    vite
    ```
## Usage

1.  **Sign Up**
    -   Navigate to the signup page and create a new account.
2.  **Log In**
    -   Log in with your credentials.
3.  **Create Tasks**
    -   Go to the tasks section and create new tasks.
4.  **Manage Tasks**
    -   Use the dashboard to track the status of your tasks.
    -   Assign tasks to team members and set priorities.
5.  **Search and Filter**
    -   Use the search bar to find specific tasks.
    -   Filter and sort tasks based on different criteria.
6.  **Team Management**
    -   Invite team members and manage your team from the Team tab.
7.  **Settings**
    -   Adjust your settings, change your password, or delete your account.

## Contact

If you have any questions or suggestions, please open an issue or contact me at ahadibrahimi095(at)gmail(dot)com.

## License

This project is licensed under the MIT License.
