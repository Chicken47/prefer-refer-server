### Prefer Refer Backend

Prefer Refer is a backend application built to facilitate employee referrals in the hiring process. It allows users to post job referrals and apply to them, connecting referrers with potential candidates.

#### Technologies Used

- Node.js: Backend server environment
- Express.js: Web framework for handling API routes
- PostgreSQL: Relational database for storing user data and job referrals
- bcrypt: Library for hashing passwords
- jwt: Library for generating and verifying JSON Web Tokens for user authentication
- multer: Middleware for handling file uploads
- pg: PostgreSQL client for Node.js
- dotenv: Library for loading environment variables from a .env file
- nodemon: Development tool for automatically restarting the server on file changes

#### Setup Instructions

1. Clone the repository:

```
git clone https://github.com/Chicken47/prefer-refer-server.git
```

2. Install dependencies:

```
cd prefer-refer-server
npm install
```

3. Set up the PostgreSQL database:
   - Create a new PostgreSQL database.
   - Copy the `.env.example` file to `.env` and update the database connection details.

4. Run the database migrations to create the required tables:

```
npm run migrate
```

5. Start the server:

```
npm run start
```

#### API Endpoints

##### Authentication

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in an existing user and receive a JWT token for authentication.

##### Referral Postings

- `POST /referral/post`: Create a new job referral posting.
- `GET /referral/posts`: Get all job referral postings.
- `GET /referral/post/:postId`: Get details of a specific job referral posting by its ID.
- `PUT /referral/post/:postId`: Update details of a specific job referral posting.
- `DELETE /referral/post/:postId`: Delete a specific job referral posting.

##### Referral Applications

- `POST /referral/post/:postId/apply`: Apply to a job referral posting.
- `GET /referral/applications/user/:userId`: Get all job referral applications submitted by a user.
- `GET /referral/applications/posting/:postId`: Get all job referral applications for a specific job referral posting.

#### Author

- Your Name
- GitHub: [github.com/your-username](https://github.com/Chicken47)

#### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
