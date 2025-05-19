// Type definitions (move to a separate file like types.ts for better organization)
export const UserType = {
  Staff: 1,
  Admin: 2,
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];

export const Location = {
  HCM: 1,
  HN: 2,
  DN: 3,
} as const;

export type Location = (typeof Location)[keyof typeof Location];

export interface User {
  staffCode: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  joinedDate: string;
  gender: boolean;
  type: UserType;
  location: Location;
  isDisabled: boolean;
}
