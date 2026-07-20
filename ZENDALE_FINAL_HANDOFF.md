# Zendale Website Final Handoff

## Baseline used

This package was rebuilt from the latest uploaded GitHub archive, `zendale_inter-main (1).zip`.

## Completed corrections

### Homepage hero

- Mobile now shows the headline and primary actions before the ecosystem graphic.
- Mobile no longer loads the WebGL scene. It uses a lightweight animated network graphic that stays fully contained and still shows moving connection pulses.
- Desktop retains the interactive Three.js ecosystem.
- The desktop 3D network now starts fully assembled, remains centred, and uses subtle movement rather than scattering nodes across the hero.
- The hero background remains atmospheric without creating a large empty corridor above the message.
- The ecosystem graphic has fixed responsive heights and cannot escape its assigned column.

### Branding and imagery

- The header and footer use the official Zendale WebP logo.
- The favicon now uses `/images/zendale-logo.webp`.
- Image fade-in duration was shortened to reduce the visible placeholder effect.

### Editorial cleanup

- All em dash characters were removed from the application source.
- Awkward sentences created by dash-heavy writing were rewritten throughout the main pages, service data, facility descriptions, resources and case studies.
- The public case-study drafting explanation was removed.
- The visible privacy legal-review TODO was removed.
- The Download Centre no longer displays the internal phrase "still being prepared".
- The Contact page no longer displays "direct contact channels are being finalised".
- Source TODO markers and drafting comments were cleaned up.

## Verification completed

- Production TypeScript and Vite build: passed.
- Route smoke tests: 16 of 16 passed.
- Em dash check across `src`: zero matches.
- Public drafting phrase check: zero matches.
- Source TODO marker check: zero matches.

## Remaining operational work before the final public launch

These items require real Zendale information or a backend service and were not invented.

1. Add the approved WhatsApp business number, public enquiries email, head-office address and social links in `src/config.ts`.
2. Connect the consultation, callback, partnership, careers, newsletter and guide forms to real endpoints. They currently use client-side confirmation states.
3. Add the approved PDF files to `public/downloads-files/` using the filenames already registered in the project.
4. Have qualified counsel review the Privacy and Compliance page against the laws and notices that apply to Zendale's operations.
5. Confirm every facility service description, external URL and public claim with Zendale management before the final domain launch.

## Hero implementation decision

The mobile version deliberately uses an animated SVG rather than Three.js. This preserves the premium animation while preventing the WebGL canvas from creating the large, unstable opening shown in the 409-pixel-wide screenshots. Desktop keeps the genuine interactive 3D scene.
