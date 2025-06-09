import { useCallback, useEffect, useState } from "react";

import { reportService } from "../services/reportService";
import type { Report } from "../types/Report";

export function useReport() {
  const [exportLoading, setExportLoading] = useState(false);
  const [reportsLoading, setReportsLoading] = useState(false);

  const [reports, setReports] = useState<Report[]>([]);

  const [sort, setSort] = useState<{ id: string; desc: boolean } | null>({
    id: "categoryName",
    desc: false,
  });

  const orderBy = sort
    ? `${sort.id}${sort.desc ? "desc" : "asc"}`.toLowerCase()
    : "categorynameasc";

  const initialState = {
    sorting: sort ? [sort] : [{ id: "categoryName", desc: false }],
  };

  async function handleReportDownload() {
    try {
      setExportLoading(true);

      const response = await reportService.exportReport(); // Already awaited

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Extract filename from Content-Disposition
      let filename = "report.xlsx"; // fallback

      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const filenameRegex =
          /filename\*=UTF-8''([^;\n]*)|filename[^;=\n]*="?([^;\n"]*)"?/i;
        const matches = filenameRegex.exec(contentDisposition);

        if (matches) {
          if (matches[1]) {
            filename = decodeURIComponent(matches[1]);
          } else if (matches[2]) {
            filename = matches[2];
          }
        }
      }

      // Download using a temporary <a>
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
    } finally {
      setExportLoading(false);
    }
  }

  const fetchReports = useCallback(async () => {
    try {
      setReportsLoading(true);

      const response = await reportService.getReports({ orderBy });

      setReports(response.data);
    } catch (err) {
      console.error("Error fetching reports", err);
    } finally {
      setReportsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    exportLoading,
    setExportLoading,
    reportsLoading,
    setReportsLoading,
    reports,
    setReports,
    sort,
    setSort,
    orderBy,
    initialState,
    handleReportDownload,
    fetchReports,
  };
}
