export async function submitEnquiry(payload: {
  kind: string; name: string; email: string; phone?: string; subject?: string;
  message: string; page: string; pathway?: string; details?: [string, string][];
}) {
  const response = await fetch("/api/contact", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(22000),
  });
  if (!response.ok || !(await response.json()).ok) throw new Error("Enquiry not delivered.");
}
