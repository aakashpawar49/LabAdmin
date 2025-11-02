import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import PageMeta from '../../components/common/PageMeta';
import { CheckLineIcon, TimeIcon, AlertIcon, BoxIcon } from '../../icons';

interface AssignedTicket {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  type: 'bug' | 'software_request';
  requesterName: string;
  labLocation: string;
}

const LabTechDashboard: React.FC = () => {
  const { user } = useAuth();
  const [assignedTickets, setAssignedTickets] = useState<AssignedTicket[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockTickets: AssignedTicket[] = [
      {
        id: 1,
        title: 'Computer not starting in Lab 1',
        description: 'The computer at station 5 in Lab 1 is not starting up properly.',
        status: 'in_progress',
        priority: 'high',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-16T09:15:00Z',
        type: 'bug',
        requesterName: 'John Doe',
        labLocation: 'Lab 1 - Station 5'
      },
      {
        id: 2,
        title: 'Need Visual Studio Code installed',
        description: 'Requesting Visual Studio Code to be installed on Lab 2 computers.',
        status: 'open',
        priority: 'medium',
        createdAt: '2024-01-14T14:20:00Z',
        updatedAt: '2024-01-14T14:20:00Z',
        type: 'software_request',
        requesterName: 'Jane Smith',
        labLocation: 'Lab 2 - All Stations'
      },
      {
        id: 3,
        title: 'Printer not working',
        description: 'The printer in Lab 3 is showing error messages and not printing.',
        status: 'resolved',
        priority: 'medium',
        createdAt: '2024-01-10T16:45:00Z',
        updatedAt: '2024-01-12T11:30:00Z',
        type: 'bug',
        requesterName: 'Mike Johnson',
        labLocation: 'Lab 3 - Printer Station'
      }
    ];
    
    setAssignedTickets(mockTickets);
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

  const updateTicketStatus = (ticketId: number, newStatus: string) => {
    setAssignedTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, status: newStatus as any, updatedAt: new Date().toISOString() }
          : ticket
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const openTickets = assignedTickets.filter(t => t.status === 'open').length;
  const inProgressTickets = assignedTickets.filter(t => t.status === 'in_progress').length;
  const resolvedTickets = assignedTickets.filter(t => t.status === 'resolved').length;

  return (
    <>
      <PageMeta
        title="Lab Technician Dashboard"
        description="Manage assigned tickets and lab maintenance tasks"
      />
      
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your assigned tickets and lab maintenance tasks.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Tickets</p>
                <p className="text-2xl font-bold text-red-600">{openTickets}</p>
              </div>
              <TimeIcon className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{inProgressTickets}</p>
              </div>
              <TimeIcon className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{resolvedTickets}</p>
              </div>
              <CheckLineIcon className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Assigned Tickets */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Assigned Tickets
            </h3>
          </div>
          
          <div className="p-6">
            {assignedTickets.length === 0 ? (
              <div className="text-center py-8">
                <TimeIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No assigned tickets</p>
              </div>
            ) : (
              <div className="space-y-4">
                {assignedTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(ticket.type)}
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {ticket.title}
                          </h4>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                          {ticket.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <span>Requester: {ticket.requesterName}</span>
                          <span>Location: {ticket.labLocation}</span>
                          <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-2">
                          {ticket.status === 'open' && (
                            <button
                              onClick={() => updateTicketStatus(ticket.id, 'in_progress')}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-medium py-1 px-3 rounded transition-colors duration-200"
                            >
                              Start Work
                            </button>
                          )}
                          {ticket.status === 'in_progress' && (
                            <button
                              onClick={() => updateTicketStatus(ticket.id, 'resolved')}
                              className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-1 px-3 rounded transition-colors duration-200"
                            >
                              Mark Resolved
                            </button>
                          )}
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

export default LabTechDashboard;
