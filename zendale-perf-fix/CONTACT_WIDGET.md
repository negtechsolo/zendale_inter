# Contact widget

Replaces the round green WhatsApp button with a widget that matches the site.

## What a visitor sees

A square launcher, bottom right, marked with the Zendale Z-stroke and
"Talk to us". It opens a panel offering two routes:

- **Chat on WhatsApp** — opens WhatsApp with a message already written for
  the page they were on ("I'd like to discuss a partnership" on /partnerships,
  and so on).
- **Write a message** — name, email, phone, subject and message, with the
  subject list routing the enquiry (Partnership, Corporate health, Consulting,
  Medical technology, Careers, General).

Plus a tap-to-call line, and two short notices that belong on a healthcare
site: the channel is not monitored around the clock and is not for
emergencies, and clinical details should not be sent through it.

## Where written messages go

The form posts to `/api/contact`, a Vercel Serverless Function.

**It works right now with no setup:** until you configure mail delivery, the
endpoint reports that it is unconfigured and the widget opens the visitor's
own mail client with every field already filled in and addressed to
`info@zendalelimited.com`. Nothing is lost.

### To have messages arrive in the inbox directly

1. Create a free account at **resend.com** and verify `zendalelimited.com`
   (it asks you to add DNS records — the same place your SPF record lives).
2. Create an API key.
3. In Vercel → your project → **Settings → Environment Variables**, add:

   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | the key from step 2 |
   | `CONTACT_TO` | `info@zendalelimited.com` |
   | `CONTACT_FROM` | `website@zendalelimited.com` (must be on the verified domain) |

4. Redeploy.

### What gets sent

Each submission produces **two** emails:

1. **Notification to you** at `CONTACT_TO`, with reply-to set to the sender,
   so replying from your inbox goes straight to them.
2. **Confirmation to the sender**, quoting what they wrote, with your phone
   number and the emergency notice. It makes no promise about response times.

The confirmation is sent only after the notification has succeeded, and it can
never fail the request — a missing receipt is a small problem, a lost enquiry
is not.

To turn the confirmation off, add an environment variable
`CONTACT_AUTOREPLY` set to `off`.

If you would rather not use Resend, the function is about sixty lines and any
mail provider with an HTTP API can be swapped in.

## Why not tawk.to

tawk.to loads several hundred kilobytes of third-party JavaScript, which works
against the audits this whole patch set out to fix, and it puts another
company's branding on the site. This widget adds roughly 6 kB and no external
request.

## Note

`src/components/WhatsAppFab.tsx` is now unused. It is left in place rather
than deleted so you can revert by swapping the import back in
`src/components/Layout.tsx`.
