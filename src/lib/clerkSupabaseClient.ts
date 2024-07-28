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

          if (!clerkToken) {
            throw new Error("Failed to retrieve Clerk token.");
          }

          const headers = new Headers(options?.headers);
          headers.set("Authorization", `Bearer ${clerkToken}`);

          const response = await fetch(url, { ...options, headers });

          if (response.status === 401) {
            console.error("401 Unauthorized: Invalid Clerk token or session.");
          }

          return response;
        },
      },
    }
  );
}

export { createClient };
