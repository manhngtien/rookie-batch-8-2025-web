import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/dashboard-elements";
import { DataTable } from "@/components/ui/data-table";
import { reportColumns } from "@/features/report/components/report-columns";

function ReportPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle>Report</PageTitle>
      <div className="flex justify-end gap-5">
        <Button
          id="create-asset-button"
          onClick={() => {}}
          className="bg-red-600 text-white hover:cursor-pointer hover:bg-red-700"
        >
          Export
        </Button>
      </div>
      <DataTable columns={reportColumns} data={[]} total={1} loading={false} />
    </div>
  );
}

export default ReportPage;
