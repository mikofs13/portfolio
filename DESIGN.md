# Studio design system

## Implementation
Next.js App Router, React and TypeScript at the workspace root, with custom CSS, a self-hosted variable font, next/image and small client components for navigation and contact feedback. The original static project was discarded at the user's request.

## Visual direction
The approved Studio concept is the visual contract: split hero with oversized left-aligned headline and metallic sculptural ribbon right; understated navigation and text CTAs; large selected-work previews; fine horizontal rules for experience.

## Theme and scene
A prospective collaborator reviewing an engineering portfolio on a laptop in a quiet evening workspace. Warm charcoal supports an atmospheric metal render; ivory text and citron wayfinding remain readable.

## Typography
Manrope variable font, a firm and precise grotesk chosen after reviewing its Google Fonts catalog page. Tight display tracking, body line-height 1.7, uppercase micro-labels only. System sans fallback. Hero fluid 60 to 112px, body 16px minimum.

## Palette and layout
Restrained color strategy. Warm charcoal oklch(0.2 0.006 115), ivory oklch(0.96 0.012 100), muted stone oklch(0.72 0.012 100), citron oklch(0.91 0.15 113). Max content width 1320px, generous responsive gutters, thin neutral rules, minimal rounded geometry. Large asymmetric project presentations, no repetitive icon-card grid.

## Interactions
Lenis desktop smooth scrolling, mobile menu with accessible state, inline expandable project stories and screenshot galleries, a Resend-backed inquiry form, and copy-email feedback. Scroll-triggered opacity/transform reveals, gentle hero parallax and a reading-progress line respect reduced motion and clean up their listeners. Touch scrolling is native. No content hidden pending JavaScript.

## Mock fidelity inventory
Metal ribbon: generated raster asset. Typography, nav, CTAs, section rules: semantic HTML/CSS. Projects: Ethio-Budget and Enicharet, imported from the previous portfolio with their actual screenshots and links. Phone and browser compositions frame the screenshots. Experience: ruled rows with known dates. Mobile stacks the layout and adapts the screenshot compositions.
