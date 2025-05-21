export default interface Request {
  id: number;
  assetCode: string;
  assetName: string;
  requestedBy: string;
  assignedDate: string;
  acceptedBy: string | null;
  returnedDate: string | null;
  state: "Completed" | "Waiting for returning";
}

export const State = {
  Completed: "Completed",
  WaitingForReturning: "Waiting for returning",
} as const;

export type State = (typeof State)[keyof typeof State];

export const initialRequests: Request[] = [
  {
    id: 1,
    assetCode: "LA100003",
    assetName: "Laptop HP Probook 440 G1",
    requestedBy: "hungty1",
    assignedDate: "12/10/2018",
    acceptedBy: "binhnv",
    returnedDate: "07/03/2020",
    state: "Completed",
  },
  {
    id: 2,
    assetCode: "MO100004",
    assetName: "Monitor Dell UltraSharp",
    requestedBy: "antv",
    assignedDate: "15/03/2020",
    acceptedBy: null,
    returnedDate: null,
    state: "Waiting for returning",
  },
  {
    id: 3,
    assetCode: "MO100005",
    assetName: "Monitor Dell UltraSharp",
    requestedBy: "yentth",
    assignedDate: "15/03/2020",
    acceptedBy: null,
    returnedDate: null,
    state: "Waiting for returning",
  },
];
