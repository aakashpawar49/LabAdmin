import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon, LockIcon } from "../../icons";
import { useAuth } from "../../context/AuthContext";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!isChecked) {
      setError("Please agree to the terms and conditions");
      setIsLoading(false);
      return;
    }

    try {
      const fullName = `${firstName} ${lastName}`.trim();
      console.log('Registering with:', { name: fullName, email, password: '***', role });
      
      const response = await fetch('http://localhost:5285/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fullName, email, password, role }),
      });

      console.log('Registration response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        
        // Store in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on user role
        const userRole = data.user.role;
        switch (userRole) {
          case 'admin':
          case 'faculty':
            navigate('/', { replace: true });
            break;
          case 'labTech':
            navigate('/lab-tech-dashboard', { replace: true });
            break;
          case 'student':
            navigate('/student-dashboard', { replace: true });
            break;
          default:
            navigate('/', { replace: true });
        }
      } else {
        const errorText = await response.text();
        console.log('Registration failed:', response.status, errorText);
        setError("Registration failed. Email might already exist.");
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        {/* Cute Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <LockIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        
        <h2 className="mb-2 text-2xl font-bold text-center text-gray-900 dark:text-white">
          Create Account
        </h2>
        <p className="mb-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Join the Lab Maintenance System
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900 dark:text-red-300">
              {error}
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name *
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name *
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Role *
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="labTech">Lab Technician</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showPassword ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeCloseIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
            />
            <label className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              By creating an account, you agree to our{" "}
              <span className="text-blue-600 hover:text-blue-500 dark:text-blue-400 cursor-pointer">
                Terms and Conditions
              </span>{" "}
              and{" "}
              <span className="text-blue-600 hover:text-blue-500 dark:text-blue-400 cursor-pointer">
                Privacy Policy
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign in here
            </Link>
          </p>
        </div>
        
        <div className="mt-4 p-3 text-sm bg-gray-100 rounded-lg dark:bg-gray-700">
          <p className="font-medium text-gray-700 dark:text-gray-300">Available Roles:</p>
          <p className="text-gray-600 dark:text-gray-400">Student, Faculty, Lab Technician, Admin</p>
        </div>
      </div>
    </div>
  );
}
