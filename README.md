# dice-game

Welcome to Dice Game, a simple game with technically beautiful implementation. This project is built using Node.js with Express for the backend, and React for the frontend (though not yet connected). The database is a containerized MySQL implementation using Docker and Prisma.

The project is divided into two main parts:

1. client/: This directory will contain the frontend of the application in React, but is not implemented yet.
2. server/: This directory contains the backend of the application, built with Node.js and Express. It also includes a Docker setup for MySQL and Prisma.

## Getting Started

Prerequisites:

- Node.js
- Docker

### Installation

- Clone the repository.
- Install the dependencies for both the client and server:

```sh
cd client && npm install
cd ../server && npm install
```

### Running the Application

1. Start the server:

```sh
cd server && npm run start

```

2. Start the client:

```sh
cd client && npm run start
```

The server runs on http://localhost:3001 and the client runs on http://localhost:3000.
