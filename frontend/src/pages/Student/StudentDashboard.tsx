import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import PageMeta from '../../components/common/PageMeta';
import { PlusIcon, AlertIcon, BoxIcon, EyeIcon } from '../../icons';

interface StudentTicket {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  type: 'bug' | 'software_request';
}

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<StudentTicket[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockTickets: StudentTicket[] = [
      {
        id: 1,
        title: 'Computer not starting in Lab 1',
        description: 'The computer at station 5 in Lab 1 is not starting up properly.',
        status: 'open',
        priority: 'high',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        type: 'bug'
      },
      {
        id: 2,
        title: 'Need Visual Studio Code installed',
        description: 'Requesting Visual Studio Code to be installed on Lab 2 computers.',
        status: 'in_progress',
        priority: 'medium',
        createdAt: '2024-01-14T14:20:00Z',
        updatedAt: '2024-01-16T09:15:00Z',
        type: 'software_request'
      },
      {
        id: 3,
        title: 'Printer not working',
        description: 'The printer in Lab 3 is showing error messages and not printing.',
        status: 'resolved',
        priority: 'medium',
        createdAt: '2024-01-10T16:45:00Z',
        updatedAt: '2024-01-12T11:30:00Z',
        type: 'bug'
      }
    ];
    
    setTickets(mockTickets);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'bug' ? <AlertIcon className="w-4 h-4" /> : <BoxIcon className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Student Dashboard"
        description="View your requests and report new issues"
      />
      
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your lab requests and report issues here.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Report Bug
              </h3>
              <AlertIcon className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Report hardware or software issues in the lab.
            </p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              onClick={() => window.location.href = '/student/report-bug'}>
              <PlusIcon className="w-4 h-4" />
              Report Bug
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Request Software
              </h3>
              <BoxIcon className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Request software installation on lab computers.
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              onClick={() => window.location.href = '/student/request-software'}>
              <PlusIcon className="w-4 h-4" />
              Request Software
            </button>
          </div>
        </div>

        {/* My Requests */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              My Requests
            </h3>
          </div>
          
          <div className="p-6">
            {tickets.length === 0 ? (
              <div className="text-center py-8">
                <EyeIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No requests found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(ticket.type)}
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {ticket.title}
                          </h4>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                          {ticket.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500 dark:text-gray-400">
                            Created: {new Date(ticket.createdAt).toLocaleDateString()}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            Updated: {new Date(ticket.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
