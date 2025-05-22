const apiPrefix = "/api";

const addApiPrefix = (route: string): string => `${apiPrefix}${route}`;

export const API_ROUTES = {
  auth: {
    login: addApiPrefix("/Auth/login"),
    changePassword: addApiPrefix("/change-password"),
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
};
