import { useQuery } from "@tanstack/react-query";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

async function fetchFiveStarCount(): Promise<number> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/trustpilot-stats`, {
    headers: {
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch Trustpilot stats");

  const data = await res.json();
  return typeof data.fiveStarCount === "number" ? data.fiveStarCount : 0;
}

export function useTrustpilotFiveStarCount() {
  return useQuery({
    queryKey: ["trustpilot-five-star-count"],
    queryFn: fetchFiveStarCount,
    staleTime: 1000 * 60 * 60, // cache for 1 hour
    retry: 1,
  });
}
