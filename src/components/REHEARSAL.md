# Stageshow verification

Starting point: stageshow 1.1.1 examples/form-error. Copied kit without modification.
Changed: Traditional Chinese labels, explicitly fictional demonstration, removed password field to focus on email validation, compact stage 358 × 330, compact window 302px with 28px gutters.

Verified: Astro production build; Chromium desktop 1440 and mobile 390 routes; no document overflow or runtime errors; reduced-motion completed state; screenshots visually inspected for homepage and mobile case.

Incomplete: film gate. Production CSS bundling causes kit phone selectors to be classified as example overrides even though no phone geometry was edited. Recording also has sampling gaps and reports typing-width changes and a validation-check entrance. These findings remain unresolved; animation is not fully approved. Original example was read and copied, but a separate gold recording/comparison was not completed. Keyboard navigation has focus styles but a complete manual keyboard walkthrough was not performed.

Reproduce with scripts/check-site.mjs against preview at port 4322. Record with scripts/stageshow/film.mjs. Screenshots are in ignored artifacts/.
