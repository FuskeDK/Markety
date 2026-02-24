import { useQuery } from "@tanstack/react-query";

const SHEET_ID = "1RpEDx9HGQxdZaIvppAMJudbeefqLPN2ZvX-fwlW7ud4";

async function fetchCompanyNames(): Promise<string[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch company names");

  const text = await res.text();
  const jsonStr = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/)?.[1];
  if (!jsonStr) return [];

  const data = JSON.parse(jsonStr);
  const rows: any[] = data?.table?.rows ?? [];

  return rows
    .map((row) => row?.c?.[0]?.v)           // first column (A)
    .filter((v) => v !== null && v !== undefined && String(v).trim() !== "")
    .map((v) => String(v).trim());
}

export function useCompanyNames() {
  return useQuery({
    queryKey: ["sheet-company-names"],
    queryFn: fetchCompanyNames,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}
