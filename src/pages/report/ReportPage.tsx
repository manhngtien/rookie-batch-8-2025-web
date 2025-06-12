import { Loader2Icon } from "lucide-react";

import { CreateButton, PageTitle } from "@/components/ui/dashboard-elements";
import { DataTable } from "@/components/ui/data-table";
import { reportColumns } from "@/features/report/components/report-columns";
import { useReport } from "@/features/report/hooks/useReport";

function ReportPage() {
  const {
    handleReportDownload,
    exportLoading,
    reports,
    initialState,
    reportsLoading,
    setSort,
  } = useReport();

  return (
    <div className="flex flex-col gap-4">
      <PageTitle>Report</PageTitle>

      <div className="flex justify-end">
        <CreateButton onClick={handleReportDownload} disabled={exportLoading}>
          {/* Workaround because the component uses the children to create the id
          This prevents the component from passing "false" to the parent component
          Only passing an empty string now  */}
          {exportLoading ? <Loader2Icon className="animate-spin" /> : ""}
          Export
        </CreateButton>
      </div>

      <DataTable
        columns={reportColumns}
        data={reports}
        initialState={initialState}
        total={1}
        loading={reportsLoading}
        onSortingChange={(sort) => {
          setSort(sort);
        }}
        uniqueLastColumn={false}
      />
    </div>
  );
}

export default ReportPage;
