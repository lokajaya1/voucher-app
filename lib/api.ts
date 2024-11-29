// /lib/api.ts
export const fetchVoucherSummary = async (): Promise<
  Record<string, number>
> => {
  const response = await fetch("/api/voucher_claim"); // Atur sesuai dengan endpoint Anda
  const data = await response.json();
  return data; // Menyesuaikan data yang diterima dari API
};
