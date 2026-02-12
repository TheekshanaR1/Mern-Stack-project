# Construction Company Management System (CCMS)

A comprehensive web-based management system designed for construction companies to efficiently manage projects, inventory, monitoring, scheduling, and more.

## 🚀 Features

- **User Management**: Multi-role system (Admin, Project Manager, Client, Supplier, Quantity Surveyor, Site Supervisor, Inventory Manager, Finance Officer)
- **Project Monitoring**: Auto-generated project IDs with real-time tracking
- **Inventory Management**: Track materials, equipment, and supplier orders
- **Financial Management**: Budget tracking and expense management
- **Schedule Management**: Project scheduling and task assignment
- **Feedback System**: Client feedback and communication
- **Real-time Notifications**: Keep all stakeholders informed

## 📋 Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** (via Mongoose)
- **bcrypt** for password hashing
- RESTful API architecture

### Frontend
- **React.js** with Hooks
- **React Router** for navigation
- **Axios** for API calls
- **Bootstrap** and custom CSS
- **React Toastify** for notifications
- **Framer Motion** for animations

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure database connection in `util/db.js`:
```javascript
const db = mongoose.connect("your-mongodb-connection-string");
```

4. Start the backend server:
```bash
node app.js
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🔑 Default Admin Credentials

After initial setup, run the seed script to create a default admin user:

```bash
cd Backend
node seedAdmin.js
```

**Login Credentials:**
- User ID: `ADMIN001`
- Email: `admin@ccms.com`
- Password: `Admin@123`

⚠️ **Important**: Change the password after first login!

## 📁 Project Structure

```
Construction-Company-Management-System-CCMS-Development/
├── Backend/
│   ├── Controllers/       # Request handlers
│   ├── Model/            # MongoDB schemas
│   ├── Router/           # API routes
│   ├── util/             # Utilities (DB connection)
│   ├── app.js            # Entry point
│   ├── seedAdmin.js      # Admin user seeder
│   └── package.json
│
└── frontend/
    ├── public/           # Static files
    ├── src/
    │   ├── Component/    # React components
    │   │   ├── Admin/
    │   │   ├── Client/
    │   │   ├── SiteSupervisor/
    │   │   ├── Inventory/
    │   │   ├── topNav/
    │   │   └── bottomNav/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🎯 Key Features Breakdown

### Monitoring System
- Auto-generated unique Project IDs (PROJ-001, PROJ-002, etc.)
- Weather condition tracking
- Worker presence monitoring
- Issue reporting and tracking

### Inventory Management
- Material tracking
- Equipment management
- Supplier coordination
- Order confirmation system

### User Roles & Permissions
- **Admin**: Full system access
- **Project Manager**: Project oversight and management
- **Site Supervisor**: On-site monitoring and reporting
- **Inventory Manager**: Stock and material management
- **Finance Officer**: Budget and expense tracking
- **Quantity Surveyor**: Cost estimation and measurement
- **Client**: View project progress and provide feedback
- **Supplier**: Manage orders and deliveries

## 🔒 Security Features

- Password hashing using bcrypt
- Role-based access control
- Session management
- Input validation and sanitization

## 🌐 API Endpoints

### Monitoring
- `GET /Monitoring` - Get all monitoring records
- `POST /Monitoring` - Create new monitoring record
- `GET /Monitoring/next-project-id` - Get next available Project ID
- `GET /Monitoring/:id` - Get specific record
- `PUT /Monitoring/:id` - Update monitoring record
- `DELETE /Monitoring/:id` - Delete monitoring record

### Users
- `GET /users` - Get all users
- `POST /users` - Register new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

*(Additional endpoints for Materials, Equipment, Orders, Tasks, Schedules, etc.)*

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Development Team

## 📧 Contact

For any inquiries or support, please contact the development team.

---

**Note**: This is an active development project. Features and documentation are continuously updated.
