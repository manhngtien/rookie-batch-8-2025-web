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
    getUsers: addApiPrefix("/Users"),
    createUser: addApiPrefix("/Users"),
    updateUser: (userId: string) => addApiPrefix(`/Users/${userId}`),
    deleteUser: (userId: string) => addApiPrefix(`/Users/${userId}`),
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
