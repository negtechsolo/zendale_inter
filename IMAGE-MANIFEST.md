# IMAGE-MANIFEST.md — Zendale Website

Every photograph on the site is already built as a real, wired image component.
To make a photo appear, drop the file into **`/src/assets/images/`** using the
**exact filename** below, then rebuild (`npm run build`). No code changes are
needed. Until a file is supplied, its slot shows a branded awaiting-photo state
(never a broken image, never a console 404).

**Art direction for every photo:** authentic, cinematic healthcare imagery — no
posed stock clichés (no doctors smiling at clipboards). Natural light or
practical clinical light; real environments; candid working moments. Images are
displayed behind the brand's diagonal masks and read best with cooler,
ink-navy-friendly grading. Facility photos should be sourced from the real
facilities — the network's live websites are a good starting point for the
owner or photographer.

Minimum resolution assumes ~2× display density at the largest rendered size.

## Home (`/`)

| Filename | Placement | Recommended subject | Orientation | Min resolution |
|---|---|---|---|---|
| `home-hero-texture.jpg` | Texture layer behind/around the 3D ecosystem scene (renders at 16% opacity under a navy gradient) | Dark, atmospheric hospital architecture — a corridor, atrium or facade at dusk; strong geometry, low detail | Landscape | 2400×1600 |
| `home-who-we-are.jpg` | "Who We Are" editorial two-column, diagonal-masked | Clinical coordination in progress — a multidisciplinary team reviewing a case, mid-conversation | Landscape 4:3 | 1800×1350 |

## Who We Are (`/about`)

| Filename | Placement | Recommended subject | Orientation | Min resolution |
|---|---|---|---|---|
| `about-hero.jpg` | Page hero, diagonal-masked, right column | Wide establishing shot inside a network facility — scale and calm | Landscape 4:3 | 1800×1350 |
| `about-story.jpg` | "The Story" section, tall reverse-diagonal mask | A working day: clinician and support staff moving through a real ward or reception | Portrait 3:4 | 1350×1800 |

## Healthcare Network (`/network`) — one large photo per facility card

| Filename | Placement | Recommended subject | Orientation | Min resolution |
|---|---|---|---|---|
| `network-skyhigh.jpg` | Sky High Medical Centre card | Exterior or main clinical floor of Sky High Medical Centre (source from skyhighmedicalcentre.com or shoot on site) | Landscape 16:10 | 2000×1250 |
| `network-skyhigh-icu.jpg` | Sky High ICU / Dialysis Centre card | ICU monitoring or a dialysis station in use (no identifiable patients) | Landscape 16:10 | 2000×1250 |
| `network-finnih.jpg` | Finnih Medical Centre card | Consultation or specialist clinic at Finnih Medical Centre | Landscape 16:10 | 2000×1250 |
| `network-lifecentre.jpg` | Lifecentre Medical Services card | Nurse or clinician preparing an assessment; front-of-house care | Landscape 16:10 | 2000×1250 |
| `network-kindredpath.jpg` | Kindred Path Fertility Centre card | Embryology lab detail or a counselling room — sensitive, warm, private | Landscape 16:10 | 2000×1250 |
| `network-endoscopy.jpg` | Zendale Endoscopy Centre card | Endoscopy suite with equipment stack — technical, clean | Landscape 16:10 | 2000×1250 |
| `network-medsupport.jpg` | Lifecentre Med Support card | Medical supply/logistics at work — stocked stores, handling, delivery | Landscape 16:10 | 2000×1250 |
| `network-vhelar.jpg` | VHELAR Consulting card | Consultants reviewing plans/data with facility leadership | Landscape 16:10 | 2000×1250 |

## Capability pages — one hero image each

| Filename | Placement | Recommended subject | Orientation | Min resolution |
|---|---|---|---|---|
| `corporate-hero.jpg` | `/corporate-health` hero | Executive health consultation — discreet, professional setting | Landscape 4:3 | 1800×1350 |
| `corporate-wellness.jpg` | `/corporate-health` "What HR receives" section | On-site corporate wellness or screening session at a client office | Portrait 4:5 | 1440×1800 |
| `consulting-hero.jpg` | `/consulting` hero | VHELAR consultants with hospital leadership over an operations plan | Landscape 4:3 | 1800×1350 |
| `consulting-fieldwork.jpg` | `/consulting` "operating base" section | Fieldwork inside a client hospital — observation, notes, real corridors | Landscape 4:3 | 1800×1350 |
| `medtech-hero.jpg` | `/medical-technology` hero | Biomedical engineer servicing clinical equipment, hands and instruments | Landscape 4:3 | 1800×1350 |
| `medtech-biomedical-engineer.jpg` | `/medical-technology` biomedical section | Engineering team performing planned maintenance in a critical-care setting | Landscape 4:3 | 1800×1350 |
| `partnerships-hero.jpg` | `/partnerships` hero | Partnership discussion — two organisations at one table | Landscape 4:3 | 1800×1350 |
| `partnerships-network.jpg` | `/partnerships` "one agreement" section | A coordinated handover or referral moment between facilities | Landscape 16:10 | 2000×1250 |

## How We Work (`/how-we-work`)

| Filename | Placement | Recommended subject | Orientation | Min resolution |
|---|---|---|---|---|
| `how-we-work-hero.jpg` | Page hero | A coordinator planning a patient pathway with the clinical team | Landscape 4:3 | 1800×1350 |
| `how-we-work-support.jpg` | "Stage five" section on ink | A maintenance or follow-up visit — the relationship continuing | Landscape 16:10 | 2000×1250 |

## Success Stories (`/case-studies`) — imagery in every case study

| Filename | Placement | Recommended subject | Orientation | Min resolution |
|---|---|---|---|---|
| `case-hospital-transformation.jpg` | Hospital Transformation case | Hospital corridor or ward during an operational review | Landscape 4:3 | 1600×1200 |
| `case-corporate-health.jpg` | Corporate Health Programme case | Occupational health assessment in progress | Landscape 4:3 | 1600×1200 |
| `case-equipment-installation.jpg` | Equipment Installation case | Engineer commissioning newly installed clinical equipment | Landscape 4:3 | 1600×1200 |
| `case-partnership.jpg` | Healthcare Partnership case | Clinicians reviewing a shared referral pathway together | Landscape 4:3 | 1600×1200 |
| `case-community-outreach.jpg` | Community Outreach case | Community screening day — queue, table, blood-pressure cuff, real people | Landscape 4:3 | 1600×1200 |

## Careers (`/careers`)

| Filename | Placement | Recommended subject | Orientation | Min resolution |
|---|---|---|---|---|
| `careers-hero.jpg` | Page hero | Team members across disciplines during a working day | Landscape 4:3 | 1800×1350 |
| `careers-team.jpg` | Talent-network section | Clinical and engineering colleagues collaborating, candid | Landscape 16:10 | 2000×1250 |

**Total: 29 photographs.**

---

## Documents (Professional Download Centre)

The Download Centre serves PDFs from **`/public/downloads-files/`**. Drop the
real documents in with these exact filenames and the download buttons work
with no code change. Until a file exists, the button shows a clear
"being prepared" note instead of a broken download.

| Filename | Document |
|---|---|
| `zendale-endoscopy-guide.pdf` | Endoscopy Referral Guide |
| `zendale-icu-guide.pdf` | ICU & Critical Care Guide |
| `zendale-fertility-guide.pdf` | Fertility Services Guide |
| `zendale-equipment-guide.pdf` | Medical Equipment & Lifecycle Guide |
| `zendale-corporate-health-guide.pdf` | Corporate Health Programme Guide |
| `zendale-company-profile.pdf` | Zendale Company Profile |
