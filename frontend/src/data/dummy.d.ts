// src/data/dummy.d.ts
declare module "./dummy" {
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

  export const bugStats: BugStats;
  export const monthlyBugs: MonthlyBug[];
  export const labStats: LabStat[];
  export const technicianPerformance: Technician[];
  export const recentTickets: Ticket[];
}
