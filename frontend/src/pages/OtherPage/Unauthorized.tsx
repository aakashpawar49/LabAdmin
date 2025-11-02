import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { ROLE_DISPLAY_NAMES } from '../../constants/roles';

const Unauthorized: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
        </div>

        {user && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Current Role:
            </p>
            <p className="font-medium text-gray-900 dark:text-white">
              {ROLE_DISPLAY_NAMES[user.role as keyof typeof ROLE_DISPLAY_NAMES] || user.role}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link
            to="/"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 inline-block"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/profile"
            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 inline-block"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

