## Reddit App
This project is similar to Reddit website. The backend is a GraphQL server and the frontend has been created with a React framework (Next.js).

Technologies used for frontend:
- Apollo Client to connect and use GraghQL server
- React Bootstrap for the design with some custome CSS modules

Technologies used for backend:
- SQLite for the database (saved in dev.db)
- Prisma to connect to database and send queries

## Getting Started

First, open one terminal and start the GraphQL server:
```bash
cd graphl-api
node src/index.js
```
Then, open another terminal and start the nextjs application:
```bash
cd nextjs-client
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Also, feel free to test backend on [http://localhost:4000](http://localhost:4000)

