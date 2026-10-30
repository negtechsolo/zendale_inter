# Homepage preview — 30 October 2026

Preview branch: `homepage-real-office-network-preview`. Based on main commit `cace580f8c7204584a1ee8598007aa5ac17f9e50`. Do not merge or promote without the user's review and approval.

## Images

The supplied office photograph replaces the AI photograph in the Who We Are section. The main headline, corporate introduction and existing business wording are retained. The opening hero is now a three-slide introduction: original Zendale ecosystem graphic, clearly identified Finnih team and BUA corporate health programme. The office photograph appears only in Who We Are. Existing approved wording is reused. Each visual uses the same 16:10 frame. Finnih fits without cropping; the BUA portrait is framed around the presenter and audience using a vertical focal point. Arrows, slide indicators, swipe support and reduced-motion handling are retained. Shared layout slots measure all slide content, preserving heading, paragraph and button positions across changes. The homepage header is solid and the hero has an explicit header-height offset.

Supplied processed photographs from `final_processed_web_images(1).zip`:

| Supplied file | Website file | Use |
| --- | --- | --- |
| `webp/office_photo.webp` | `real/office-zendale-oct2026.webp` | Who We Are; 1600 × 1200 |
| `webp/group_photo_1.webp` | `real/team-endoscopy-oct2026.webp` | Endoscopy cover; 1600 × 1000 |
| `webp/group_photo_2.webp` | `real/team-skyhigh-oct2026.webp` | SkyHigh cover; 1600 × 1000 |
| `webp/endoscopy_suite_cleaned.webp` | `real/endoscopy-suite-oct2026.webp` | Endoscopy gallery; 1600 × 1200 |

`finnih_medical_centre_staff_1600x1000(1).webp` supplies `real/team-finnih-oct2026.webp`, replacing the Finnih cover with its team photograph. Homepage network cards now use full-width 16:10 frames so the supplied group photographs fit without further cropping. Cover updates also appear on the network listing and facility profiles. Logos remain inset at the bottom-left.

Files were recompressed as WebP, retaining their dimensions. Smaller responsive variants are generated during build. No additional generative edits were made to the supplied photographs.

## New sections

- The duplicate subsidiary logo strip has been removed. The healthcare network is shown once in compact cards: two horizontal cards per desktop row, with photographs on the left and details on the right, following the supplied screenshot. Smaller screens use a single column. Supplied cover photographs and bottom-left logos are retained.
- Separate edge-to-edge white moving rows show 17 organisations served and eight HMO relationships. The two rows move in opposite directions. Visible pause controls and subsidiary attribution subtitles have been removed as requested. Hovering or keyboard focus pauses the rows. Reduced motion shows a static grid.
- The duplicate Lagos State Blood Transfusion Committee block has been removed from the relationships section. Its existing news story and other institutional content remain.
- The relationships heading occupies one full line on desktop, with the introduction underneath on its own full line. Type scales within the available width; phones wrap naturally.
- The Who We Are image and relationships section precede the existing Impact in Action section. Existing news and leadership wording are retained.

## Logo provenance and relationship wording

All 26 external logos come from the supplied `HMO_and_Supporting_Organisations_Logos(1).zip`. Transparent edges are trimmed, the marks resized proportionally and exported to WebP under `public/images/relationships`. Original colours and aspect ratios are retained.

Relationship mapping follows the sections reviewed with the user on 30 October:

- Life Centre Medicals: https://www.lifecentermedicals.com/ — organisational logos and institutional partnership.
- SkyHigh Medical Centre: https://www.skyhighmedicalcentre.com/hmo — HMO relationships.

These are not presented as direct parent-company contracts or universal HMO coverage across every subsidiary. The user requested the concise heading “HMO relationships” without the facility attribution subtitle. No new HMO arrangements, client results or contractual claims have been added.

The Life Centre facility website link is updated from `lifecentremedicals.com` to the current site the user referenced, `https://www.lifecentermedicals.com/`.
