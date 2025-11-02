# Lab Maintenance System

A comprehensive full-stack web application for managing laboratory maintenance operations, including device tracking, ticket management, work logs, and software requests. The system supports multiple user roles (students, lab technicians, administrators) with role-based access control.

## Features

- **User Management**: Authentication and authorization with JWT tokens, supporting different user roles (Student, Lab Tech, Admin)
- **Device Management**: Track laboratory devices with details like type, brand, model, serial number, and status
- **Lab Management**: Organize devices and operations by laboratory locations
- **Ticket System**: Create, update, and track maintenance tickets for device issues
- **Work Logs**: Record maintenance activities and technician performance
- **Software Requests**: Manage software installation and update requests
- **Dashboard Analytics**: Visualize bug metrics, technician performance, and lab statistics
- **Responsive UI**: Modern React-based interface with Tailwind CSS styling

## Tech Stack

### Backend
- **Framework**: ASP.NET Core (.NET 9.0)
- **Database**: MySQL with Entity Framework Core
- **Authentication**: JWT Bearer tokens
- **API Documentation**: Swagger/OpenAPI
- **ORM**: Entity Framework Core with Pomelo MySQL provider

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: ApexCharts, React Vector Maps
- **Routing**: React Router
- **State Management**: React Context API

## Prerequisites

Before running this application, make sure you have the following installed:

- **.NET 9.0 SDK** (for backend)
- **Node.js** (version 18 or higher, for frontend)
- **MySQL Server** (version 8.0 or higher)
- **Git** (for cloning the repository)

## Installation

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd NetBackend
   ```

2. **Navigate to the backend directory**:
   ```bash
   cd backend/LabMaintenanceAPI
   ```

3. **Restore dependencies**:
   ```bash
   dotnet restore
   ```

4. **Set up the database**:
   - Create a MySQL database
   - Update the connection string in `appsettings.json`:
     ```json
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=your_database_name;User=your_username;Password=your_password;"
     }
     ```
   - Update JWT settings in `appsettings.json`:
     ```json
     "Jwt": {
       "SecretKey": "YourSuperSecretKeyThatIsAtLeast32CharactersLong!"
     }
     ```

5. **Run database migrations**:
   ```bash
   dotnet ef database update
   ```

6. **Run the backend**:
   ```bash
   dotnet run
   ```
   The API will be available at `http://localhost:5285` and `https://localhost:7251`

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## Usage

1. **Access the application**:
   - Open your browser and navigate to `http://localhost:5173`
   - Register a new account or log in with existing credentials

2. **API Documentation**:
   - Visit `http://localhost:5285/swagger` for interactive API documentation

3. **Key Workflows**:
   - **Administrators**: Manage users, labs, and system settings
   - **Lab Technicians**: Handle maintenance tickets, update device status, log work
   - **Students**: Submit software requests and view device information

## API Documentation

The API provides RESTful endpoints for all major operations:

- **Authentication**: `/api/Auth/login`, `/api/Auth/register`
- **Users**: `/api/User`
- **Devices**: `/api/Device`
- **Labs**: `/api/Lab`
- **Tickets**: `/api/Ticket`
- **Work Logs**: `/api/WorkLog`
- **Software Requests**: `/api/SoftwareRequest`

All endpoints (except authentication) require JWT token authentication. Include the token in the Authorization header: `Bearer <token>`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
