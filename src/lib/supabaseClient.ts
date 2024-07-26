import { createClient } from "@supabase/supabase-js";

export function createClerkSupabaseClient(
  getToken: () => Promise<string | null>
) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await getToken();
          console.log("CLERK TOKEN: ", clerkToken);
          if (!clerkToken) {
            throw new Error("Failed to retrieve Clerk token.");
          }

          const headers = new Headers(options?.headers);
          headers.set("Authorization", `Bearer ${clerkToken}`);

          return fetch(url, { ...options, headers });
        },
      },
    }
  );
}
