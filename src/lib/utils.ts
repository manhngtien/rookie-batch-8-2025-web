import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function kebabCase(string: string) {
  return string
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-zA-Z0-9-]/g, "") // Remove special characters
    .toLowerCase();
}
export function formatStateLabel(state: string) {
  return state
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
// ====== How to use the below functions ======
//
// 1. Declare the key-value map:
//
// export const assignmentStateMap = {
//   Accepted: "Accepted",
//   Declined: "Declined",
//   Waiting_For_Acceptance: "Waiting for acceptance",
// };
//
// ... or, for maximum type-safety:
//
// export type AssignmentState = "Accepted" | "Declined" | "Waiting_For_Acceptance";
//
// export interface Assignment {
//   ...otherFields,
//   state: AssignmentState,
// }
//
// export const assignmentStateMap: Record<AssignmentState, string> = {
//   Accepted: "Accepted",
//   Declined: "Declined",
//   Waiting_For_Acceptance: "Waiting for Acceptance",
// };
//
// 2. Usage:
//
// formatLabel("Waiting_For_Acceptance", assignmentStateMap) -> "Waiting for acceptance"
// revertLabel("Waiting for acceptance", assignmentStateMap) -> "Waiting_For_Acceptance"

export function formatLabel(
  value: string,
  map: Record<string, string>,
): string {
  return map[value] || value;
}

export function revertLabel(
  label: string,
  map: Record<string, string>,
): string {
  const entry = Object.entries(map).find(([, v]) => v === label);
  return entry ? entry[0] : label;
}

// ============================================

export function toLocalISOString(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds())
  );
}

export function calculateNumberPosition(
  pageIndex: number,
  pageSize: number,
  rowIndex: number,
) {
  return pageIndex * pageSize + rowIndex + 1;
}
