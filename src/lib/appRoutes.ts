export const APP_ROUTES = {
  auth: {
    login: "/login",
    logout: "/logout",
  },
  users: {
    path: "/users",
    create: "create-user",
    edit: "edit-user",
  },
  assets: {
    path: "/assets",
    create: "create-asset",
    edit: "edit-asset/:assetCode",
    getEditPath: (assetCode: string) => `/assets/edit-asset/${assetCode}`,
  },
  returns: {
    path: "/returns",
  },
  assignment: {
    path: "/assignment",
    create: "create-assignment",
  },
  reports: {
    path: "/reports",
  },
};
