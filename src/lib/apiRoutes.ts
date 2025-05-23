const apiPrefix = "/api";

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
    getUsers: addApiPrefix("/User"),
    createUser: addApiPrefix("/User"),
    updateUser: (userId: string) => addApiPrefix(`/User/${userId}`),
    deleteUser: (userId: string) => addApiPrefix(`/User/${userId}`),
  },
  assets: {
    getAssets: addApiPrefix("/Assets"),
    createAsset: addApiPrefix("/Assets"),
    updateAsset: (assetId: string) => addApiPrefix(`/Assets/${assetId}`),
    deleteAsset: (assetId: string) => addApiPrefix(`/Assets/${assetId}`),
  },
  requests: {
    getRequests: addApiPrefix("/ReturningRequest"),
  },
};
