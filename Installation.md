# Installation Guide for Med Connect

Welcome to Med Connect! Follow these instructions to set up and run the application locally.

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

- **Node.js**: Version 18 or higher. You can download it from [nodejs.org](https://nodejs.org/). It includes npm, the Node.js package manager.
- **Git**:  You'll need Git to clone the repository. Install it from [git-scm.com](https://git-scm.com/).

## Installation Steps

1. **Clone the Repository**

   Open your terminal and navigate to the directory where you want to clone the Med Connect repository. Use the following command, replacing `yourusername` with your GitHub username:

   ```bash
   git clone https://github.com/yourusername/hackathon-medconnect.git
   cd med-connect
   ```

2. **Install Dependencies**

   The project has separate `frontend` and `backend` directories. You need to install dependencies for both.

   - **Frontend Dependencies**:

     Navigate to the `frontend` directory:

     ```bash
     cd frontend
     npm install
     ```

     This command installs all the necessary npm packages listed in `frontend/package.json`.

   - **Backend Dependencies**:

     Navigate to the `backend` directory:

     ```bash
     cd backend
     npm install
     ```
    backend repo - https://github.com/Jayant-issar/hackathon-medconnect-backend

    This command installs all the necessary npm packages listed in `backend/package.json`.

   **Note**: Please refer to the backend repository's README for specific backend setup instructions as it is a separate repository. [https://github.com/Jayant-issar/hackathon-medconnect-backend](https://github.com/Jayant-issar/hackathon-medconnect-backend)

3. **Environment Variables Setup**

   You need to configure environment variables for both the `frontend` and `backend`.

   - In both `frontend` and `backend` directories, create a `.env` file.
   - Add the necessary environment variables as mentioned in the `env-example` file in each directory.
   - **Important**: Ensure you have your Clerk API keys and backend API URL configured in these `.env` files.

   Example `.env` file content (for frontend - adjust based on `env-example`):

   ```
   VITE_CLERK_PUBLISHABLE_KEY = "your_clerk_frontend_api_key"
   VITE_API_URL = "http://localhost:3000" // or your backend API URL
   ```

   Refer to `env-example` and your cloud provider or backend documentation for all required variables.

4. **Run the Application**

   Start both the backend and frontend servers.

   - **Start the Backend**:

     ```bash
     cd backend
     npm run dev
     ```

     This command typically starts the backend server using `nodemon` or a similar development server as configured in the backend project.

   - **Start the Frontend**:

     Open a new terminal window, navigate to the `frontend` directory, and run:

     ```bash
     cd frontend
     npm run dev
     ```

     This command starts the frontend development server, usually on `http://localhost:8080` (see `vite.config.ts`).

5. **Access the Application**

   Once both servers are running, you can access the Med Connect application in your web browser at:

   `http://localhost:8080`

## Further Configuration

- **Database**: Ensure your PostgreSQL database is set up and the connection details are correctly configured in your backend `.env` or `.dev.vars` file and Prisma schema if applicable (refer to backend documentation).
- **Cloudflare Pages**: The project is designed to be hosted on Cloudflare Pages. Refer to Cloudflare Pages documentation for deployment instructions.

- **Real-time Notifications**: Socket.io is mentioned for real-time notifications but is marked as "yet to be implemented". Implementation and setup will be required for real-time features.

By following these steps, you should have Med Connect running locally and be ready to explore its features. For detailed API documentation and usage instructions, please refer to the backend repository's README and the provided demo video link in the main `README.md`. 