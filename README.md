# Task Manager Backend

A simple task management system developed with Express JS and MongoDB database.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

You need to have the following software installed on your system:

- Node.js
- MongoDB

### Installing

1. Clone the repository to your local machine:

```
git clone https://github.com/Bahinkor/task-manager-backend.git
```

2. Navigate to the project directory:

```
cd task-manager-backend
```

3. Install dependencies:

```
npm install
```

### Setting Up MongoDB

1. Make sure MongoDB is installed and running on your system.

2. Create a new database named `task-manager`.

### Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file:

```
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/task-manager
JWT_SECRET=random-secret-code
```

### Running the Server

Start the server by running the following command:

```
npm start
```

The server will be running on port 8000 by default.

## Usage

Once the server is running, you can access the application by navigating to `http://localhost:8000` in your web browser.