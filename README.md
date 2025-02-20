# Chatting website

Real time communication is possible.

## Description

This project is a real-time chatting website that allows users to communicate instantly with each other, one to another and one to everyone communication is also possible and multiple functions is also available like theme changer feature profile etc.

# 🚀 Tech Stack

## 1. Frontend

- **HTML**  
  The standard markup language used to structure the web content. It's the backbone of any web page.

- **CSS (TailwindCSS)**  
  A utility-first CSS framework that allows for rapid, responsive, and customizable design. TailwindCSS helps in building UI components quickly without writing much custom CSS.

- **JavaScript**  
  The primary scripting language used to create dynamic, interactive web pages. It allows the frontend to handle client-side logic and asynchronous data handling.

- **socket.io-client**  
  A client-side library that enables real-time, bidirectional communication between the browser and the server. It's often used for building chat applications, live updates, and other interactive features.

- **Zustand**  
  A state management library for React. It's lightweight and provides an easy way to manage global state in React applications, reducing the need for more complex solutions like Redux.

- **react-router-dom**  
  A library for handling routing in React applications. It allows you to define navigation paths, render components based on URL changes, and handle client-side routing in single-page applications.

- **Axios**  
  A promise-based HTTP client for the browser and Node.js. It's used to make requests to the backend API, enabling communication between the frontend and backend with ease.

- **GSAP (GreenSock Animation Platform)**  
  A powerful JavaScript library for creating high-performance animations. It's used for creating smooth, interactive animations in the UI, improving user engagement.

---

## 2. Backend

- **MongoDB**  
  A NoSQL database that stores data in flexible, JSON-like documents. MongoDB is scalable and works well with the application's data structure, making it ideal for handling unstructured data.

- **Express**  
  A minimalist web framework for Node.js that simplifies routing and middleware management. Express provides an easy-to-use set of features for building web servers and APIs.

- **Node.js**  
  A JavaScript runtime built on Chrome's V8 engine. It enables the use of JavaScript on the server side, allowing us to build scalable, non-blocking I/O applications.

- **Socket.io**  
  A library used to establish WebSocket-based real-time communication between the client and the server. It's essential for enabling real-time interactions such as live chats or instant notifications.

- **jsonwebtoken (JWT)**  
  A compact, URL-safe means of representing claims to be transferred between two parties. It's used for authentication and ensuring secure communication between the client and server by issuing tokens.

- **CORS**  
  A middleware that enables Cross-Origin Resource Sharing, allowing the backend to securely accept requests from different origins. It's critical for handling requests from frontend applications hosted on different domains.

- **cookie-parser**  
  A middleware to parse cookies attached to the incoming requests. It's used to read cookies and manage user sessions securely.

- **bcrypt**  
  A password-hashing function to store user passwords securely. It helps in protecting user data by ensuring that plain-text passwords are never stored directly in the database.

- **Mongoose**  
  An ODM (Object Data Modeling) library for MongoDB and Node.js. Mongoose provides a straight-forward schema-based solution to model the data, making it easier to work with MongoDB from Node.js.



## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Chatting-website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Chatting-website
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the backend and frontend:
   ```bash
   npm run mc
   ```
2. Open your browser and navigate to `http://localhost:3001`.

## Features

- Real-time messaging
- One to Another messaging
- One to Everyone messaging
- User authentication

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
