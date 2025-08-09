import { createContext, useContext } from "react";

export type AdminContext = void;

export const AdminContext = createContext<AdminContext>(undefined!);

export const useAdmin = (): AdminContext => {
  return useContext(AdminContext);
};
