# Todo-App-MERN
Todo-App-MERN for IFN666

SparkTasks
SparkTasks is a React Native Expo app designed to help users manage their tasks efficiently. This simple yet powerful tool helps you keep track of your tasks and their due dates effortlessly. With an intuitive swipe functionality, you can check or uncheck tasks by swiping right and delete tasks by swiping left. Stay organized and manage your to-dos with ease using the Task Manager App.

Getting Started<br />
To run SparkTasks locally on your machine, follow these steps:<br />

Clone this repository to your local machine:
git clone https://github.com/Devzio/Todo-App-MERN.git
Navigate to the project directory:
<br />
1)Go to client folder: <br />
cd client<br />
2)Install dependencies: <br />
npm install<br />
3)Start the Expo development server:<br />
npm start<br />
Scan the QR code using the Expo Go app on your mobile device or run it on an emulator by tapping 'a'.<br />
4) On a new terminal go to server folder<br />
cd server<br />
5) Run node js server<br />
npm run dev<br />

Endpoints Used<br />
SparkTasks utilizes the following REST APIs:<br />

POST /register: Register a new user.<br />
POST /login: Authenticate user login.<br />
GET /users: Get all users.<br />
GET /users/:userId: Get a specific user.<br />
GET /tasks: Get all tasks.<br />
GET /tasks/:userId: Get tasks for a specific user.<br />
PUT /tasks/:userId: Update if task is completed or not.<br />
POST /tasks: Add a new task.<br />
DELETE /tasks/:id: Delete a task.<br />
