import { useState } from "react";
import { useNavigate } from "react-router";
import { LockIcon } from "../../icons";

export default function SimpleLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log('Attempting login with:', { email, password: '***' });
      
      const response = await fetch('http://localhost:5285/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        
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
        console.log('Login failed:', response.status, errorText);
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check console.');
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
          Simple Login Test
        </h2>
        <p className="mb-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Access the Lab Maintenance System
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900 dark:text-red-300">
              {error}
            </div>
          )}
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-4 p-3 text-sm bg-gray-100 rounded-lg dark:bg-gray-700">
          <p className="font-medium text-gray-700 dark:text-gray-300">Test Credentials:</p>
          <p className="text-gray-600 dark:text-gray-400">Email: aakash12@example.com</p>
          <p className="text-gray-600 dark:text-gray-400">Password: password123</p>
        </div>
      </div>
    </div>
  );
}


