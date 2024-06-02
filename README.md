# Todo-App-MERN
Todo-App-MERN for IFN666

SparkTasks
SparkTasks is a React Native Expo app designed to help users manage their tasks efficiently. This simple yet powerful tool helps you keep track of your tasks and their due dates effortlessly. With an intuitive swipe functionality, you can check or uncheck tasks by swiping right and delete tasks by swiping left. Stay organized and manage your to-dos with ease using the Task Manager App.

Getting Started
To run SparkTasks locally on your machine, follow these steps:

Clone this repository to your local machine:

bash
Copy code
git clone https://github.com/Devzio/Todo-App-MERN.git
Navigate to the project directory:

1)Go to client folder: 
cd client
2)Install dependencies: 
npm install
3)Start the Expo development server:
npm start
Scan the QR code using the Expo Go app on your mobile device or run it on an emulator by tapping 'a'.
4) On a new terminal go to server folder
cd server
5) Run node js server
npm run dev

Endpoints Used
SparkTasks utilizes the following REST APIs:

POST /register: Register a new user.
POST /login: Authenticate user login.
GET /users: Get all users.
GET /users/:userId: Get a specific user.
GET /tasks: Get all tasks.
GET /tasks/:userId: Get tasks for a specific user.
PUT /tasks/:userId: Update if task is completed or not.
POST /tasks: Add a new task.
DELETE /tasks/:id: Delete a task.
