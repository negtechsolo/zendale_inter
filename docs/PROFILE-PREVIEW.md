# Zendale company profile: preview setup

In the existing Zendale Vercel project, open **Settings → Environment Variables**. Select **Preview**, ideally scoped to `homepage-real-office-network-preview`. Redeploy the preview after saving the variables. Keep API keys server-side; do not prefix them with `VITE_`.

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Resend sending key authorised for the verified sender domain. Required for the profile, contact and supply quote forms. |
| `CONTACT_FROM` | Verified sender, e.g. `Zendale Limited <profiles@zendalelimited.com>` after verifying the domain in Resend. |
| `PROFILE_PDF_URL` | Direct HTTPS URL to the final PDF accessible to Resend without sign-in. No share/preview page. The URL is read only on the server. Required for the profile form. |
| `PROFILE_LEADS_TO` | Optional internal company inbox. If set, receives the contact fields after the profile email is accepted. No CRM/database is required; the site does not store these details. |
| `CONTACT_TO` | Inbox for the existing general contact form. Not used by the profile form. |
| `CONTACT_AUTOREPLY` | Optional. Set to `off` to disable the existing general contact form’s automatic acknowledgement. |

The final PDF was not supplied with the visual draft, so no placeholder PDF is sent. The form reports delivery unavailable until the sender and attachment are configured. After redeploying, submit with a work inbox you control and check the attachment and, if configured, the separate internal notification. The form confirms acceptance by Resend; inbox placement depends on the recipient mail system.

Review `/`, `/profile`, `/downloads`, `/network/mainland-icu` and the redirect from `/network/sky-high-icu` on the preview before approving a production release.
