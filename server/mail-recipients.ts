// Environment values are server-only; a malformed value must not reach Resend.
export function mailRecipients(...values: (string | undefined)[]) {
  return [...new Set(values.flatMap(value => (value ?? "").split(","))
    .map(email => email.trim().toLowerCase())
    .filter(email => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)))];
}
