import { sessionName } from "~/utils/constants";

export const _logout = () => {
  setTimeout(() => {
    window.sessionStorage.removeItem(sessionName);
    window.location.reload();
    window.location.href = "/";
  }, 100);
};
