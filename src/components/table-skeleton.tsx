import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="h-4 w-full rounded-none" />
      <Skeleton className="h-4 w-full rounded-none" />
    </div>
  );
}
