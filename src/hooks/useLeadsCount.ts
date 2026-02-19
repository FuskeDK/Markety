import { useQuery } from "@tanstack/react-query";

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL as string | undefined;

export async function fetchLeadsCount(): Promise<number> {
  if (!SCRIPT_URL) return 0;

  const res = await fetch(SCRIPT_URL);
  if (!res.ok) throw new Error("Failed to fetch leads count");

  const data = await res.json();
  return typeof data.leadsCount === "number" ? data.leadsCount : 0;
}

export const leadsCountQueryConfig = {
  queryKey: ["sheet-leads-count"] as const,
  queryFn: fetchLeadsCount,
  staleTime: 1000 * 60 * 10,
  retry: 1,
};

export function useLeadsCount() {
  return useQuery(leadsCountQueryConfig);
}
