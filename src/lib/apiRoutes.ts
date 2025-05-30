const apiPrefix = "/api";
import type { AssetParams } from "@/features/asset-management/types/AssetParams";
import { buildQueryUrl } from "@/utils/url";

const addApiPrefix = (route: string): string => `${apiPrefix}${route}`;

export const API_ROUTES = {
  auth: {
    login: addApiPrefix("/Auth/login"),
    changePassword: addApiPrefix("/Auth/change-password"),
    logout: addApiPrefix("/Auth/logout"),
    check: addApiPrefix("/Auth/check"),
    refreshToken: addApiPrefix("/Auth/refresh-token"),
  },
  users: {
    getUsers: addApiPrefix("/Users"),
    createUser: addApiPrefix("/Users"),
    updateUser: (staffCode: string) => addApiPrefix(`/Users/${staffCode}`),
    disableUser: (staffCode: string) => addApiPrefix(`/Users/${staffCode}`),
  },
  assets: {
    getAssets: addApiPrefix("/Assets"),
    getAssetsByParams: (params?: AssetParams) =>
      buildQueryUrl(addApiPrefix("/Assets/"), params),
    createAsset: addApiPrefix("/Assets"),
    getAssetByCode: (assetCode: string) => addApiPrefix(`/Assets/${assetCode}`),
    updateAsset: (assetCode: string) => addApiPrefix(`/Assets/${assetCode}`),
    deleteAsset: (assetCode: string) => addApiPrefix(`/Assets/${assetCode}`),
  },
  categories: {
    getCategories: addApiPrefix("/Categories"),
  },
  assignments: {
    getAssignments: addApiPrefix("/Assignments"),
    createAssignment: addApiPrefix("/Assignments"),
    updateAssignment: (assignmentId: string) =>
      addApiPrefix(`/Assignments/${assignmentId}`),
    deleteAssignment: (assignmentId: string) =>
      addApiPrefix(`/Assignments/${assignmentId}`),
  },
  requests: {
    getRequests: addApiPrefix("/ReturningRequest"),
  },
};
