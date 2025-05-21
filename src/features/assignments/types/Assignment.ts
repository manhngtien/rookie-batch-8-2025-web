export interface Assignment {
  id: number;
  stateDate: Date;
  note: string;
  assetCode: string;
  assignedBy: string;
  assignedTo: string;
  returnDate?: Date;
}
