export type UserLogoutProps = {
  userName: string;
};
export type LogoutPopupProps = {
  onCancel: () => void;
  onLogout: () => void
}