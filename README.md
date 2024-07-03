# Writeway!
## Way to Write Amazing  Stories and Blogs 


| Check out Live App Now | [https://write-wa.vercel.app/] |



This Application provides features like  Medium App and  developed as part of Cohort 2.0 by Harkirat. The project is built from scratch using a modern tech stack and deployed on Vercel and Cloudflare Workers.xs

## Features 
- User Authentication (JWT)
- Skeleton Loading for a smoother user experience
- Connection Pooling with Prisma
- Type Inference and Validation with Zod

## TechStack

**Frontend**

- **React** -  A JavaScript library for building user interfaces.
- **Vite** -  A build tool that significantly improves the development experience 
- **Skeleton Loading** - For enhanced UX during data fetches.

**Backend**

- **Cloudflare Workers** : Serverless functions for handling backend logic.
- **TypeScript** : A strongly typed programming language that builds on JavaScript.
- **Prisma** : ORM for database interaction with connection pooling.
- **PostgreSQL** : The relational database used.
- **Zod**  : For schema validation and type inference.
- **JWT**  : For secure authentication.

**Getting Started**
Follow these instructions to set up the project locally.

**Prerequisites**
- Node.js
- PostreSQL 


## Installation
 1) Clone the  repository :
   ```sh
  git clone (https://github.com/sarb001/Writeway-.git)
  ```

 2) Navigate the Project Directory 
 ```sh
    cd Writeway-
 ```

3) Install the dependencies:
    ```sh
     npm install 
    ```
  
## Configuration 
1) Setup your environment variables . Create a .env file in root directory and add the following:
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret

2) Configure Cloudflare Workers and Vercel for deployment (refer to their respective documentation for detailed steps).

## Running the Application 
1) Start the backend (Cloudflare Workers) and frontend (Vercel):
 **For the backend** 
 ```sh
 npm run start:backend
```
  **For the Frontend -** 
   ```sh
 npm run start:frontend
```
 
 2) Open http://localhost:5173 to view  vite application in your browser.

## Deployment 

**Backend**
 - Deploy the backend using Cloudflare Workers. Follow the Cloudflare Workers documentation for detailed deployment instructions.

**Frontend**
 - Deploy the frontend on Vercel. Follow the Vercel documentation for detailed deployment instructions.

**Contributing**
 - Contributions are welcome! Please fork the repository and submit a pull request.
 -----------|-----------

