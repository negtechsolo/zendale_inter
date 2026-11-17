export const escapeEmail = (value: string) => value.replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char] ?? char));

export function brandedEmail(options: {
  title: string; category: string; intro: string; fields?: [string, string][]; note?: string;
}) {
  const e = escapeEmail;
  const fields = options.fields?.filter(([, value]) => value.trim()) ?? [];
  const rows = fields.map(([key, value]) => `<tr><td style="padding:12px 16px;border-top:1px solid #e1e8f0;color:#365478;font-weight:bold;width:30%;vertical-align:top">${e(key)}</td><td style="padding:12px 16px;border-top:1px solid #e1e8f0;color:#081c33;overflow-wrap:anywhere">${e(value).replace(/\r?\n/g, "<br>")}</td></tr>`).join("");
  const text = [options.title, options.category, options.intro, ...fields.map(([label,value]) => `${label}: ${value}`), options.note,
    "Zendale Limited | info@zendalelimited.com | https://www.zendalelimited.com/"].filter(Boolean).join("\n\n");
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;background:#edf2f7;color:#081c33;font:15px/1.55 Arial,sans-serif">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:24px 10px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #dce5ef">
<tr><td style="padding:18px 24px;background:#ffffff"><table role="presentation" cellspacing="0" cellpadding="0"><tr><td><img src="https://www.zendalelimited.com/zendale-logo.png" alt="" width="38" height="39" style="display:block;border:0"></td><td style="padding-left:10px;color:#081c33;font-size:19px;font-weight:bold">Zendale Limited</td></tr></table></td></tr>
<tr><td style="padding:23px 24px;background:#081c33;border-bottom:4px solid #c2984a"><div style="font-size:12px;font-weight:bold;letter-spacing:1px;color:#f3d9a7;text-transform:uppercase">${e(options.category)}</div><h1 style="font-size:25px;line-height:1.2;color:white;margin:8px 0 0">${e(options.title)}</h1></td></tr>
<tr><td style="padding:22px 24px"><p style="margin:0 0 16px">${e(options.intro)}</p>${rows ? `<table width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;background:#f7f9fc;table-layout:fixed">${rows}</table>` : ""}${options.note ? `<p style="font-size:13px;color:#365478;margin:18px 0 0">${e(options.note)}</p>` : ""}</td></tr>
<tr><td style="background:#f1f5f9;padding:16px 24px;font-size:12px;color:#365478"><strong>Zendale Limited</strong><br>One Partner. Complete Healthcare Solutions.<br><a style="color:#274f80" href="mailto:info@zendalelimited.com">info@zendalelimited.com</a> &nbsp;·&nbsp; <a style="color:#274f80" href="https://www.zendalelimited.com/">zendalelimited.com</a></td></tr>
</table></td></tr></table></body></html>`;
  return { html, text };
}
