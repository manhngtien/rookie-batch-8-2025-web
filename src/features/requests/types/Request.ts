export default interface Request {
  id: number;
  assetCode: string;
  assetName: string;
  requestedBy: string;
  assignedDate: Date;
  acceptedBy: string;
  returnedDate: Date;
  state: "Completed" | "Waiting for returning";
}

export const State = {
  Completed: "Completed",
  WaitingForReturning: "Waiting for returning",
} as const;

export type State = (typeof State)[keyof typeof State];
