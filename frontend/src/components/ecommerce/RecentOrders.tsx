import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Define the TypeScript interface for the tickets
interface Ticket {
  id: number; // Unique identifier for each ticket
  title: string; // Ticket title / short description
  lab: string; // Lab where the issue occurred
  technician: string; // Assigned technician
  priority: "Low" | "Medium" | "High"; // Priority level
  status: "Open" | "In Progress" | "Closed"; // Ticket status
}

// Dummy data for recent tickets
const ticketData: Ticket[] = [
  {
    id: 1,
    title: "Projector not working",
    lab: "Lab A-101",
    technician: "John Doe",
    priority: "High",
    status: "Open",
  },
  {
    id: 2,
    title: "System overheating",
    lab: "Lab B-204",
    technician: "Alice Smith",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Software installation request",
    lab: "Lab C-301",
    technician: "Mike Johnson",
    priority: "Low",
    status: "Closed",
  },
  {
    id: 4,
    title: "Air conditioning issue",
    lab: "Lab D-112",
    technician: "Sara Wilson",
    priority: "High",
    status: "Open",
  },
  {
    id: 5,
    title: "WiFi connectivity problem",
    lab: "Lab E-220",
    technician: "David Brown",
    priority: "Medium",
    status: "Closed",
  },
];

export default function RecentTickets() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Tickets
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ticket
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Lab
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Technician
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Priority
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {ticketData.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="py-3 text-gray-800 text-theme-sm dark:text-white/90">
                  {ticket.title}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {ticket.lab}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {ticket.technician}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      ticket.priority === "High"
                        ? "error"
                        : ticket.priority === "Medium"
                        ? "warning"
                        : "success"
                    }
                  >
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      ticket.status === "Closed"
                        ? "success"
                        : ticket.status === "In Progress"
                        ? "warning"
                        : "error"
                    }
                  >
                    {ticket.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
