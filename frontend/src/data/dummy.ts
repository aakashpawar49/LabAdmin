// src/data/dummy.ts

export interface MonthlyBug {
  month: string;
  fixed: number;
}

export interface BugStats {
  reported: number;
  fixed: number;
  pending: number;
  fixRate: number;
}

export interface LabStat {
  lab: string;
  openTickets: number;
  closedTickets: number;
}

export interface Technician {
  name: string;
  bugsFixed: number;
}

export interface Ticket {
  title: string;
  lab: string;
  priority: "Low" | "Medium" | "High";
  status: "Fixed" | "In Progress" | "Pending";
}

export interface SoftwareRequestSample {
  softwareName: string;
  version: string;
  requester: string;
  device: string;
  status: "pending" | "installed" | "rejected";
}

export interface BugReportedSample {
  title: string;
  lab: string;
  severity: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved";
  reportedAt: string; // ISO or human-readable
}

// 1. Bug stats
export const bugStats: BugStats = {
  reported: 421,
  fixed: 389,
  pending: 32,
  fixRate: 92.4,
};

// 2. Monthly Bugs
export const monthlyBugs: MonthlyBug[] = [
  { month: "Jan", fixed: 25 },
  { month: "Feb", fixed: 30 },
  { month: "Mar", fixed: 22 },
  { month: "Apr", fixed: 35 },
  { month: "May", fixed: 28 },
  { month: "Jun", fixed: 40 },
  { month: "Jul", fixed: 32 },
  { month: "Aug", fixed: 45 },
  { month: "Sep", fixed: 38 },
  { month: "Oct", fixed: 42 },
  { month: "Nov", fixed: 50 },
  { month: "Dec", fixed: 33 },
];

// 3. Lab-wise Statistics
export const labStats: LabStat[] = [
  { lab: "Lab A", openTickets: 12, closedTickets: 40 },
  { lab: "Lab B", openTickets: 7, closedTickets: 30 },
  { lab: "Lab C", openTickets: 5, closedTickets: 25 },
  { lab: "Lab D", openTickets: 3, closedTickets: 18 },
];

// 4. Technician Performance
export const technicianPerformance: Technician[] = [
  { name: "Aakash", bugsFixed: 120 },
  { name: "Krushanu", bugsFixed: 95 },
  { name: "Nishant", bugsFixed: 87 },
  { name: "Devansh", bugsFixed: 110 },
];

// 5. Recent Tickets
export const recentTickets: Ticket[] = [
  { title: "Projector not working", lab: "Lab A", priority: "High", status: "Fixed" },
  { title: "Wi-Fi disconnecting", lab: "Lab B", priority: "Medium", status: "In Progress" },
  { title: "Computer not booting", lab: "Lab C", priority: "High", status: "Pending" },
  { title: "AC not cooling", lab: "Lab D", priority: "Low", status: "Fixed" },
  { title: "Printer jam issue", lab: "Lab A", priority: "Medium", status: "Fixed" },
];

// 6. Sample Software Requests
export const sampleSoftwareRequests: SoftwareRequestSample[] = [
  { softwareName: "MATLAB", version: "R2024b", requester: "Aakash", device: "Lab A-101", status: "pending" },
  { softwareName: "Python", version: "3.12", requester: "Rehan", device: "Lab B-204", status: "installed" },
  { softwareName: "Anaconda", version: "2024.06", requester: "Madhav", device: "Lab C-301", status: "rejected" },
  { softwareName: "VS Code", version: "1.92", requester: "Dhruv", device: "Lab D-112", status: "installed" },
  { softwareName: "Unity", version: "2022 LTS", requester: "Zaahid", device: "Lab E-220", status: "pending" },
];

// 7. Sample Bugs Reported
export const sampleBugsReported: BugReportedSample[] = [
  { title: "Login button unresponsive", lab: "Lab A", severity: "High", status: "Open", reportedAt: "2025-10-05" },
  { title: "Graph not rendering", lab: "Lab B", severity: "Medium", status: "In Progress", reportedAt: "2025-10-02" },
  { title: "Typo in dashboard header", lab: "Lab C", severity: "Low", status: "Resolved", reportedAt: "2025-09-28" },
  { title: "Export CSV fails", lab: "Lab D", severity: "High", status: "Open", reportedAt: "2025-09-30" },
  { title: "Slow page load", lab: "Lab A", severity: "Medium", status: "In Progress", reportedAt: "2025-10-01" },
];
