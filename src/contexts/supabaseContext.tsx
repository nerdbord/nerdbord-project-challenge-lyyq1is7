// src/contexts/SupabaseClientContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "@clerk/nextjs";
import { createClerkSupabaseClient } from "@/lib/supabaseClient";

interface SupabaseClientContextProps {
  client: any;
  error: string | null;
}

const SupabaseClientContext = createContext<
  SupabaseClientContextProps | undefined
>(undefined);

export const SupabaseClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { session } = useSession();
  const [client, setClient] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeClient() {
      if (session) {
        try {
          const token = await session.getToken({ template: "supabase" });
          const supabaseClient = createClerkSupabaseClient(() =>
            Promise.resolve(token)
          );
          setClient(supabaseClient);
        } catch (err) {
          setError("Failed to initialize Supabase client");
        }
      }
    }

    initializeClient();
  }, [session]);

  return (
    <SupabaseClientContext.Provider value={{ client, error }}>
      {children}
    </SupabaseClientContext.Provider>
  );
};

export const useSupabaseClient = () => {
  const context = useContext(SupabaseClientContext);
  if (context === undefined) {
    throw new Error(
      "useSupabaseClient must be used within a SupabaseClientProvider"
    );
  }
  return context;
};
