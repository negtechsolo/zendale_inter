# Setting up Google Analytics 4

Ten minutes. You need a Google account. Do this once and the audit item is
closed permanently.

---

## Part 1 — Get your Measurement ID

**1. Open Google Analytics**

Go to **https://analytics.google.com** and sign in with the Google account
that should own Zendale's analytics. Use a business account you will still
have access to in three years, not a personal one.

**2. Create an account (skip if you already have one)**

- Click **Admin** (the gear icon, bottom left)
- **Create → Account**
- Account name: `Zendale Limited`
- Leave the data-sharing checkboxes as they are, or untick them — your choice
- **Next**

**3. Create a property**

- Property name: `Zendale Limited Website`
- Reporting time zone: **Nigeria (GMT+1)**
- Currency: **Nigerian Naira (₦)**
- **Next**

**4. Business details**

- Industry category: **Health**
- Business size: pick whichever is accurate
- **Next**

**5. Business objectives**

Tick **Generate leads** and **Examine user behaviour**. These only change
which reports Google shows you by default; nothing about the tracking itself.

- **Create**, then accept the Terms of Service for **Nigeria**

**6. Set up the data stream**

- Platform: **Web**
- Website URL: `https://www.zendalelimited.com`
- Stream name: `Zendale Website`
- Leave **Enhanced measurement** on — it records scrolls, outbound clicks and
  file downloads for free, which is genuinely useful for your download centre
- **Create stream**

**7. Copy the Measurement ID**

The stream detail page opens. Top right you will see:

> **MEASUREMENT ID**
> `G-XXXXXXXXXX`

It always starts with `G-` followed by ten characters. **That is the only
thing you need.** Copy it.

> If Google shows you a "Google tag" installation panel with code snippets,
> close it. You do not need to paste any code — the site already has the
> plumbing, it just needs the ID.

---

## Part 2 — Put it in the site

Open `src/config.ts`. Find this near the bottom:

```ts
  analyticsId: "",
```

Change it to your ID:

```ts
  analyticsId: "G-XXXXXXXXXX",
```

That is the entire code change. One line, one file.

Then rebuild:

```bash
npm run build
```

Confirm the tag is now in the static HTML:

```bash
grep -c googletagmanager dist/index.html      # -> 2
grep -c googletagmanager dist/about/index.html # -> 2
```

Two matches per page is correct: one loads the Google tag, one configures it.

Commit and push. Vercel deploys.

---

## Part 3 — Confirm it is receiving data

1. Visit `https://www.zendalelimited.com` on your phone, on mobile data (not
   your office wifi, so you are not filtered as internal traffic).
2. In Google Analytics go to **Reports → Realtime**.
3. Within about thirty seconds you should see **1 user in the last 30 minutes**.
4. Click through two or three pages on the site. The Realtime report should
   show the page paths changing.

If Realtime stays empty after five minutes: check your ad blocker is off, and
re-check that the ID in `config.ts` matches the one in GA exactly.

---

## How it is wired, in case you ever need to change it

The Google tag is written into the `<head>` of **every pre-rendered page** at
build time by `scripts/prerender.mjs`. It is not attached later by JavaScript.
This matters for two reasons: auditors that scan your HTML will find it, and
it starts recording before React has finished loading.

Because the site is a single-page app, a click from `/network` to `/contact`
does not reload the document, so Google's tag would only ever see the first
page. `src/lib/analytics.ts` fills that gap — it reports every route change
after the first one. You do not need to touch it.

With `analyticsId` empty, **nothing** is emitted: no script tag, no request to
Google, no cookies. That is why the audit was failing, and it is also a
perfectly valid state to return to if you ever need to.

---

# Contact details and social profiles — what I set, and what you must check

## Now live on the site

| | Value |
|---|---|
| Phone | `+234 906 182 9702` (tap-to-call in the footer) |
| WhatsApp | Same number — the floating WhatsApp button is now **visible**, it was hidden while the number was blank |
| Address | 42 Oduduwa Crescent, Ikeja GRA, Lagos, Nigeria |
| General email | `info@zendalelimited.com` |
| Partnership email | `partnerships@zendalelimited.com` |

These appear in the footer, on the contact page, and inside the structured
data that search and answer engines read. This is the single biggest fix for
the "credibility 35%" score in your report — that number was low specifically
because the site had no address, no phone and no contact point.

## Three things you must do before this goes live

**1. Create the two mailboxes.**

You did not give me an email address, so I used the two most standard names on
your own domain. `info@zendalelimited.com` and
`partnerships@zendalelimited.com` are now printed on the site and published in
your structured data. **If those mailboxes do not exist, every enquiry
bounces**, which is worse than having no email at all. Your DNS already has
`v=spf1 include:spf.privateemail.com`, so you have Namecheap Private Email —
create both addresses there, or set them as aliases to whatever you actually
read. If you would rather use different names, change them in `src/config.ts`
and in the JSON-LD block in `index.html`.

**2. Check the social URLs.**

You asked for LinkedIn, Facebook, X and Instagram, but did not give me the
handles, so I used the obvious pattern:

```
https://www.linkedin.com/company/zendalelimited
https://www.facebook.com/zendalelimited
https://x.com/zendalelimited
https://www.instagram.com/zendalelimited
```

**Open all four right now.** Any that 404 must either be created or removed —
these URLs are also published as `sameAs` in your structured data, which is
one of the signals Google and AI engines use to confirm a brand is real. A
`sameAs` pointing at a dead page is a negative signal, not a neutral one.
Edit or delete entries in the `socials` array in `src/config.ts`; the footer
row and the structured data both follow it automatically.

**3. Confirm the phone number is a real WhatsApp Business line.**

The floating button now deep-links to `wa.me/2349061829702`. Message it from
another phone to be sure it lands.
