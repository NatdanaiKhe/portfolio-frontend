"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { TechStackType } from "@/types";

const TechStackContext = createContext<TechStackType[]>([]);

export function TechStackProvider({
  stacks,
  children,
}: {
  stacks: TechStackType[];
  children: ReactNode;
}) {
  return (
    <TechStackContext.Provider value={stacks}>
      {children}
    </TechStackContext.Provider>
  );
}

export function useTechStacks(): TechStackType[] {
  return useContext(TechStackContext);
}
