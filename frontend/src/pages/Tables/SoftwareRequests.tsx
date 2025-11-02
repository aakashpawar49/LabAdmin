import React, { useMemo, useState } from "react";
import { sampleSoftwareRequests } from "../../data/dummy";

type UiRequest = typeof sampleSoftwareRequests[number];

const statusBadge = (status: UiRequest["status"]) => {
  const tone =
    status === "installed"
      ? "bg-green-100 text-green-700"
      : status === "rejected"
      ? "bg-red-100 text-red-700"
      : "bg-amber-100 text-amber-700";
  return <span className={`px-2 py-1 text-xs rounded-full ${tone}`}>{status}</span>;
};

const SoftwareRequests: React.FC = () => {
  const [rows, setRows] = useState<UiRequest[]>(sampleSoftwareRequests);
  const empty = useMemo(() => rows.length === 0, [rows]);

  return (
    <div className="p-4 text-gray-800 dark:text-gray-100">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Software Requests</h1>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-5 py-3">Request</th>
              <th className="px-5 py-3">Requester</th>
              <th className="px-5 py-3">Device</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {empty && (
              <tr>
                <td className="px-5 py-6" colSpan={4}>No requests found.</td>
              </tr>
            )}

            {rows.map((r) => (
              <tr key={`${r.softwareName}-${r.version}-${r.device}`} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-5 py-4">
                  <div className="font-medium">{r.softwareName}</div>
                  <div className="text-slate-600 dark:text-slate-400">v{r.version}</div>
                </td>
                <td className="px-5 py-4">{r.requester}</td>
                <td className="px-5 py-4">{r.device}</td>
                <td className="px-5 py-4">{statusBadge(r.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoftwareRequests;
