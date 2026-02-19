import { useQuery } from "@tanstack/react-query";

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL as string | undefined;

async function fetchLeadsCount(): Promise<number> {
  if (!SCRIPT_URL) return 0;

  const res = await fetch(SCRIPT_URL);
  if (!res.ok) throw new Error("Failed to fetch leads count");

  const data = await res.json();
  return typeof data.leadsCount === "number" ? data.leadsCount : 0;
}

export function useLeadsCount() {
  return useQuery({
    queryKey: ["sheet-leads-count"],
    queryFn: fetchLeadsCount,
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
    retry: 1,
  });
}
