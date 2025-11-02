export const ROLES = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  LAB_TECH: 'labTech',
  STUDENT: 'student'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: {
    canViewAllRequests: true,
    canViewAnalytics: true,
    canManageUsers: true,
    canManageLabs: true,
    canViewAllTickets: true,
    canAssignTickets: true,
    canViewReports: true,
    canCreateTickets: true,
    canUpdateTickets: true,
    canDeleteTickets: true,
    canViewDashboard: true,
    canViewCalendar: true,
    canViewProfile: true
  },
  [ROLES.FACULTY]: {
    canViewAllRequests: true,
    canViewAnalytics: true,
    canManageUsers: false,
    canManageLabs: false,
    canViewAllTickets: true,
    canAssignTickets: false,
    canViewReports: true,
    canCreateTickets: true,
    canUpdateTickets: false,
    canDeleteTickets: false,
    canViewDashboard: true,
    canViewCalendar: true,
    canViewProfile: true
  },
  [ROLES.LAB_TECH]: {
    canViewAllRequests: false,
    canViewAnalytics: false,
    canManageUsers: false,
    canManageLabs: false,
    canViewAllTickets: false,
    canAssignTickets: false,
    canViewReports: false,
    canCreateTickets: false,
    canUpdateTickets: true,
    canDeleteTickets: false,
    canViewDashboard: false,
    canViewCalendar: false,
    canViewProfile: true,
    canViewAssignedTickets: true,
    canUpdateAssignedTickets: true
  },
  [ROLES.STUDENT]: {
    canViewAllRequests: false,
    canViewAnalytics: false,
    canManageUsers: false,
    canManageLabs: false,
    canViewAllTickets: false,
    canAssignTickets: false,
    canViewReports: false,
    canCreateTickets: true,
    canUpdateTickets: false,
    canDeleteTickets: false,
    canViewDashboard: false,
    canViewCalendar: false,
    canViewProfile: true,
    canViewOwnTickets: true,
    canReportBugs: true,
    canRequestSoftware: true
  }
} as const;

export const ROLE_DISPLAY_NAMES = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.FACULTY]: 'Faculty',
  [ROLES.LAB_TECH]: 'Lab Technician',
  [ROLES.STUDENT]: 'Student'
} as const;

