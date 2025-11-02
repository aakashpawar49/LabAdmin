import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BarChartOne from "../../components/charts/bar/BarChartOne";
import PageMeta from "../../components/common/PageMeta";

export default function BarChart() {
  return (
    <div>
      <PageMeta
        title="Lab Management Dashboard | Monthly Bugs Fixed"
        description="This page displays monthly bug-fix statistics in a bar chart format."
      />
      <PageBreadcrumb pageTitle="Bug Fix Charts" />
      <div className="space-y-6">
        <ComponentCard title="Monthly Bugs Fixed">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
