import React, { useMemo, useState } from "react";
import { recentTickets } from "../../data/dummy";

type UiTicket = typeof recentTickets[number];

const badge = (status: UiTicket["status"]) => {
  const tone =
    status === "Fixed"
      ? "bg-green-100 text-green-700"
      : status === "In Progress"
      ? "bg-amber-100 text-amber-700"
      : "bg-sky-100 text-sky-700";
  return <span className={`px-2 py-1 text-xs rounded-full ${tone}`}>{status}</span>;
};

const TicketsRaised: React.FC = () => {
  const [rows] = useState<UiTicket[]>(recentTickets);
  const empty = useMemo(() => rows.length === 0, [rows]);

  return (
    <div className="p-4 text-gray-800 dark:text-gray-100">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tickets Raised</h1>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-5 py-3">Ticket</th>
              <th className="px-5 py-3">Lab</th>
              <th className="px-5 py-3">Priority</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {empty && (
              <tr>
                <td className="px-5 py-6" colSpan={4}>No tickets found.</td>
              </tr>
            )}

            {rows.map((r, idx) => (
              <tr key={idx} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-5 py-4">{r.title}</td>
                <td className="px-5 py-4">{r.lab}</td>
                <td className="px-5 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    r.priority === 'High' ? 'bg-red-100 text-red-700' : r.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                  }`}>{r.priority}</span>
                </td>
                <td className="px-5 py-4">{badge(r.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketsRaised;
