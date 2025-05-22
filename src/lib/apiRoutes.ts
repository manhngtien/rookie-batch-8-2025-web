const apiPrefix = "/api";

const addApiPrefix = (route: string): string => `${apiPrefix}${route}`;

export const API_ROUTES = {
  auth: {
    login: addApiPrefix("/login"),
    logout: addApiPrefix("/logout"),
    check: addApiPrefix("/check"),
    refreshToken: addApiPrefix("/refresh-token"),
  },
  users: {
    getUsers: addApiPrefix("/users"),
    createUser: addApiPrefix("/users"),
    updateUser: (userId: string) => addApiPrefix(`/users/${userId}`),
    deleteUser: (userId: string) => addApiPrefix(`/users/${userId}`),
  },
};
