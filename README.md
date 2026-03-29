# 📝 To-Do List App — Built with FreeSchema

A fully functional To-Do List application built using the **FreeSchema Data Fabric** framework developed by Mentor Friends Pvt. Ltd. This project was developed as part of the Mentor Friends Software Developer technical assessment.

---

## 🚀 Features

- ✅ **Create Task** — Add new to-do tasks with a title and status
- 📋 **List Tasks** — View all created tasks in a clean table layout
- ✏️ **Edit Task** — Modify existing tasks (title and status)
- 🗑️ **Delete Task** — Remove tasks permanently
- 🎨 **Status Badges** — Visual indicators for Pending, In Progress, and Completed tasks

---

## 🛠️ Tech Stack

- **Framework:** FreeSchema (mftsccs-browser)
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Custom CSS

---

## 📦 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)
- A registered account on [develop.freeschema.com](https://develop.freeschema.com)

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/SamyogKarki/todo-app.git
cd todo-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

> ⚠️ Use **Command Prompt (cmd)** on Windows — not PowerShell

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 🔐 Login Required

This app uses FreeSchema authentication. You must log in before using the To-Do app.

1. Visit `http://localhost:5173`
2. Click **Login** and sign in with your FreeSchema account
3. Navigate to `http://localhost:5173/todo`

> Don't have an account? Register at [develop.freeschema.com](https://develop.freeschema.com)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── pages/
│   │   ├── todo/
│   │   │   ├── create.todo.ts       # Create & Edit task widget
│   │   │   ├── list.todo.ts         # List & Delete task widget
│   │   │   ├── wrapper.todo.ts      # Main wrapper combining widgets
│   │   │   └── todo.style.css       # Styles for the To-Do app
│   │   ├── example/                 # Phonebook reference example
│   │   ├── user/                    # Auth (login, register, logout)
│   │   └── home/                    # Home page
│   ├── routes/
│   │   ├── routes.ts                # App route definitions
│   │   └── renderRoute.service.ts   # Route renderer
│   └── environments/
│       └── environment.dev.ts       # Environment config
├── main.ts                          # App entry point
└── style.css                        # Global styles
```

---

## 🧭 How to Use

### Adding a Task
1. Enter a task title in the **Task Title** field
2. Select a status: **Pending**, **In Progress**, or **Completed**
3. Click **Add Task**

### Editing a Task
1. Click the **✏️ Edit** button next to any task
2. The form will populate with the task's current data
3. Make your changes and click **Add Task** to save

### Deleting a Task
1. Click the **🗑️ Delete** button next to any task
2. The task will be permanently removed

---

## 🔗 FreeSchema Resources

- 📘 [FreeSchema Documentation](https://documentation.freeschema.com)
- 💻 [FreeSchema Frontend GitHub](https://github.com/Mentor-Friends/Freeschema-Frontend)
- 🌐 [FreeSchema Portal](https://develop.freeschema.com)

---

## 👤 Author

**Samyog Karki**  
BSc Computer Science — Herald College Kathmandu  
[LinkedIn](https://linkedin.com/in/samyog-karki) | [GitHub](https://github.com/SamyogKarki)

---

## 📄 License

This project was built for educational and assessment purposes as part of the Mentor Friends Pvt. Ltd. hiring process.
