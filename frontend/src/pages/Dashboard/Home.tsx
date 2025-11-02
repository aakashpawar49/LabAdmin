import BugMetrics from "../../components/ecommerce/BugMetrics";
import MonthlyBugsChart from "../../components/ecommerce/MonthlyBugsChart";
import TechnicianPerformanceChart from "../../components/ecommerce/TechnicianPerformanceChart";
import OpenClosedTickets from "../../components/ecommerce/openClosedTickets";
import RecentTickets from "../../components/ecommerce/RecentOrders";
import LabStatsCard from "../../components/ecommerce/LabStatsCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Lab Management System"
        description="Bug-fix statistics, technician performance, and recent tickets."
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Left Section */}
        <div className="col-span-12 space-y-6 xl:col-span-7">
          {/* Top-level Metrics: Bugs Reported, Fixed, Pending */}
          <BugMetrics />

          {/* Monthly Bug Fix Trend */}
          <MonthlyBugsChart />
        </div>

        {/* Right Section */}
        <div className="col-span-12 xl:col-span-5">
          {/* Open vs Closed Tickets (Target style card) */}
          <OpenClosedTickets />
        </div>

        {/* Full-width Section */}
        <div className="col-span-12">
          {/* Technician Performance over time */}
          <TechnicianPerformanceChart />
        </div>

        {/* Bottom Section */}
        <div className="col-span-12 xl:col-span-5">
          {/* Lab-wise Stats (like Demographic breakdown) */}
          <LabStatsCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          {/* Table of recent tickets/issues */}
          <RecentTickets />
        </div>
      </div>
    </>
  );
}
