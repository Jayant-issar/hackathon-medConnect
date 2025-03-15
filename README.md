## Med Connect

Med Connect is a life-saving application that helps users find the nearest medical resources, such as available hospital beds and blood bank supplies. Designed to provide critical information during emergencies, Med Connect ensures that users can quickly locate the medical assistance they need.

# Solution Overview
- Med Connect is a comprehensive web-based platform designed to address the critical need for real-time coordination between patients, hospitals, and volunteers during medical emergencies. The application provides users with the ability to quickly locate available medical resources, such as hospital beds and blood banks and seek help from the community, ensuring timely assistance when it matters most.

# Demo video Link
- https://www.youtube.com/"yet to upload"
### Key Technologies Used
- **Frontend**: React.js, Tailwind CSS, Tanstack Query
- **Backend**: Hono.js (high-performance web framework), PostgreSQL (managed via Prisma ORM)
- **Hosting**: Cloudflare Pages 
- **Real-Time Notifications**: Socket.io for real-time updates (yet to be implemented)


## Setup & Installation
Follow these steps to set up and run the project locally:

1 **Fork the repository**:
   Fork the repository from GitHub and clone it locally to your desired directory.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/med-connect.git // Replace with your GitHub username
   cd med-connect
   ```

2. **Install dependencies**:
   ```bash
   # For frontend
   cd frontend
   npm install

   # For backend
   cd backend
   npm install
   ```
   backend repo - https://github.com/Jayant-issar/hackathon-medconnect-backend

3. **Set up the environment variables**:
   - Create a `.env` file in both the `frontend` and `backend` directories.
   - Add the required environment variables (refer the env-example file).

4. **Run the application**:
   ```bash
   # Start the backend
   cd backend
   npm run dev

   # Start the frontend
   cd frontend
   npm run dev
   ```

5. **Access the application** at `http://localhost:8080`

# Usage Instructions
- refer to the demo video -
- refer to the README file in the backend repo - https://github.com/Jayant-issar/hackathon-medconnect-backend
- go to the hosted application and use it.

# API Documentation
- refer backend repo - https://github.com/Jayant-issar/hackathon-medconnect-backend

