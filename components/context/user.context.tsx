"use client";
import { Profile } from "@/entity/document";
import { createContext, useEffect } from "react";

export const UserContext = createContext<Profile | undefined>(undefined);

export const UserProvider = ({
  children,
  value,
}: typeof UserContext.Provider.arguments) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
