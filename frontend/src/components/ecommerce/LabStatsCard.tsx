import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";
import { labStats } from "../../data/dummy";

export default function LabStatsCard() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Lab Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Ticket resolution status by lab
          </p>
        </div>
        <div className="relative inline-block">
          <button
            type="button"
            className="dropdown-toggle"
            onClick={toggleDropdown}
            aria-label="Options menu"
            title="Options menu"
          >
            <MoreDotIcon className="size-6 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View Details
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Export Data
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 space-y-5">
        {labStats.map((lab) => {
          const total = lab.openTickets + lab.closedTickets;
          const closedPct = total > 0 ? Math.round((lab.closedTickets / total) * 100) : 0;

          return (
            <div key={lab.lab} className="flex items-center justify-between">
              {/* Lab Info */}
              <div>
                <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                  {lab.lab}
                </p>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {lab.closedTickets} Closed • {lab.openTickets} Open
                </span>
              </div>

              {/* Progress Bar */}
              <div className="flex w-full max-w-[180px] items-center gap-3">
                <div
                  className="relative block h-2 w-full bg-gray-200 rounded"
                >
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-500 rounded"
                    style={{ width: `${closedPct}%` }}
                  />
                </div>
                <p className="font-medium text-gray-700">{closedPct}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
