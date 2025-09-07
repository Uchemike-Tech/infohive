# InfoHive

InfoHive is a dynamic web application designed to serve as a central hub for departmental information, announcements, events, and timetables. It provides a user-friendly interface for students to stay updated with the latest information and an admin dashboard for easy management of the content.

## Features

- **Announcements:** View and manage departmental announcements.
- **Events:** Keep track of upcoming events and activities.
- **Timetable:** Access the semester's timetable.
- **Admin Dashboard:** A secure dashboard for administrators to manage announcements, events, and the timetable.

## Project Structure

The project is structured as follows:

```
infohive/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   ├── background1.jpg
│   │   ├── hackathon.jpg
│   │   ├── hangout.jpg
│   │   └── Logo.png
│   └── js/
│       └── main.js
├── admin-dashboard.html
├── admin-login.html
├── announcements.html
├── announcements.json
├── events.html
├── events.json
├── index.html
├── package.json
├── README.md
├── server.js
├── timetable.html
├── timetable.json
└── users.json
```

- **`assets/`**: Contains all the static files, including CSS, images, and JavaScript.
- **`*.html`**: These are the HTML files for the different pages of the application.
- **`*.json`**: These files act as a simple database to store the application's data.
- **`package.json`**: Lists the project's dependencies.
- **`server.js`**: The backend server script that handles API requests and serves the static files.

## Installation

To set up and run the project on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/infohive.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd infohive
   ```
3. **Install the dependencies:**
   ```bash
   npm install
   ```
4. **Start the server:**
   ```bash
   npm start
   ```
5. **Open your browser and navigate to `http://localhost:3000`**

## Admin Access

To access the admin dashboard, navigate to `http://localhost:3000/admin-login.html` and use the following credentials:

- **Username:** admin
- **Password:** admin

You can change the admin credentials by editing the `users.json` file.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss any changes.
