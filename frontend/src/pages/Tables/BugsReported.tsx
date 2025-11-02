import React, { useMemo, useState } from "react";
import { sampleBugsReported } from "../../data/dummy";

type UiBug = typeof sampleBugsReported[number];

const severityBadge = (severity: UiBug["severity"]) => {
  const tone =
    severity === "High"
      ? "bg-red-100 text-red-700"
      : severity === "Medium"
      ? "bg-amber-100 text-amber-700"
      : "bg-slate-100 text-slate-700";
  return <span className={`px-2 py-1 text-xs rounded-full ${tone}`}>{severity}</span>;
};

const statusBadge = (status: UiBug["status"]) => {
  const tone =
    status === "Resolved"
      ? "bg-green-100 text-green-700"
      : status === "In Progress"
      ? "bg-sky-100 text-sky-700"
      : "bg-rose-100 text-rose-700";
  return <span className={`px-2 py-1 text-xs rounded-full ${tone}`}>{status}</span>;
};

const BugsReported: React.FC = () => {
  const [rows] = useState<UiBug[]>(sampleBugsReported);
  const empty = useMemo(() => rows.length === 0, [rows]);

  return (
    <div className="p-4 text-gray-800 dark:text-gray-100">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bugs Reported</h1>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Lab</th>
              <th className="px-5 py-3">Severity</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Reported</th>
            </tr>
          </thead>
          <tbody>
            {empty && (
              <tr>
                <td className="px-5 py-6" colSpan={5}>No bugs found.</td>
              </tr>
            )}

            {rows.map((r, idx) => (
              <tr key={idx} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-5 py-4">{r.title}</td>
                <td className="px-5 py-4">{r.lab}</td>
                <td className="px-5 py-4">{severityBadge(r.severity)}</td>
                <td className="px-5 py-4">{statusBadge(r.status)}</td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{r.reportedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BugsReported;


