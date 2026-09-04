---
name: Cinematic Noir
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#ffdf9e'
  on-secondary: '#3f2e00'
  secondary-container: '#fabd00'
  on-secondary-container: '#6a4e00'
  tertiary: '#cecece'
  on-tertiary: '#2f3131'
  tertiary-container: '#b2b3b3'
  on-tertiary-container: '#434546'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#ffdf9e'
  secondary-fixed-dim: '#fabd00'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Bebas Neue
    fontSize: 80px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: 0.02em
  headline-xl:
    fontFamily: Bebas Neue
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: 0.03em
  headline-lg:
    fontFamily: Bebas Neue
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Bebas Neue
    fontSize: 36px
    fontWeight: '400'
    lineHeight: '1.2'
  title-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
spacing:
  base: 4px
  unit-1: 4px
  unit-2: 8px
  unit-4: 16px
  unit-6: 24px
  unit-8: 32px
  unit-12: 48px
  unit-16: 64px
  unit-24: 96px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is engineered for "IMAGE MAKER STUDIO," a high-end photography and cinematography house. The brand personality is authoritative, sophisticated, and evocative, designed to appeal to clients seeking luxury editorial and event services. 

The visual style is **Cinematic Minimalism**. It leverages deep obsidian voids and sharp geometric structures to create a gallery-like experience where the photography remains the protagonist. By utilizing a high-contrast palette and zero-radius sharp edges, the UI mimics the precision of professional camera equipment and the sleekness of high-fashion print magazines. The emotional response is one of trust, premium quality, and timeless elegance.

## Colors

The palette is strictly nocturnal, emphasizing depth and focal hierarchy.
- **Base Layer:** The absolute black (#000000) provides an infinite canvas, ensuring colors and photos pop with maximum vibrancy.
- **Primary Accent:** The seed gold (#D4AF37) and vivid gold (#FFC107) are used sparingly but decisively for action states, icons, and critical highlights.
- **Neutrals:** Dark Grays are utilized for surface containers to create a subtle sense of layering without breaking the dark-mode immersion.
- **Contrast:** Pure White (#FFFFFF) is reserved for body text and primary labels to maintain AAA accessibility against the dark backdrop.

## Typography

The typography strategy relies on the tension between the tall, condensed forms of **Bebas Neue** and the open, geometric clarity of **Montserrat**.

- **Display & Headlines:** Bebas Neue provides a cinematic, "movie poster" feel. It should be used for all major section headers and hero statements. Tight tracking and line heights are encouraged to emphasize its architectural verticality.
- **Body Text:** Montserrat is used for all long-form content to ensure legibility and a modern, high-tech aesthetic. 
- **Labels & CTAs:** Use Montserrat in bold, uppercase weights with increased letter spacing for navigation, small buttons, and metadata labels.

## Layout & Spacing

The design system utilizes a **12-column fixed grid** for desktop and a **4-column fluid grid** for mobile. The layout philosophy is "Editorial breathing room," characterized by generous vertical whitespace (unit-24) between sections to allow the imagery to exist without clutter.

- **Margins:** Large 64px horizontal margins on desktop create a centered, focused gallery feel.
- **Rhythm:** All spacing (padding, margins, gutters) is derived from a 4px base unit to ensure mathematical harmony.
- **Stacking:** Components like cards and images should utilize consistent 24px gutters to maintain a clean, rhythmic grid.

## Elevation & Depth

In a "Cinematic Noir" aesthetic, traditional shadows are discarded in favor of **Tonal Layering** and **High-Contrast Outlines**.

- **Surface Tiers:** Backgrounds are `#000000`. Cards and containers are `#111111`. This creates a subtle but clear distinction between the canvas and interactive elements.
- **Borders:** Instead of shadows, use 1px solid borders in `#222222` for standard containers. For active or hovered states, the border should transition to the primary gold (#D4AF37).
- **Overlays:** Header elements use a 90% opaque black background with no blur, maintaining a sharp, solid architectural presence when scrolling.

## Shapes

The design system strictly adheres to **zero roundedness (sharp edges)**. This choice mirrors the precision of camera lenses, the frames of professional photo prints, and the high-end industrial design of luxury goods. Every button, input field, card, and image container must have a 90-degree corner. This geometric rigidity is a core pillar of the "Premium" visual identity.

## Components

### Buttons
- **Primary:** Solid Gold (#FFC107) background with black text. All caps, bold Montserrat. Sharp edges.
- **Secondary/Outlined:** 2px solid Gold border, transparent background, Gold text. 
- **Hover States:** Solid buttons shift to a slightly lighter gold; outlined buttons fill with a subtle 10% gold opacity.

### Cards
- **Structure:** Dark Gray (#111111) surfaces with 1px borders (#222222). 
- **Image Treatment:** Full-width imagery at the top of the card. On hover, the image should subtly scale (1.05x) within its frame to provide a "lens zoom" effect.

### Header
- **Style:** Sticky, absolute black background. 
- **CTA:** The primary contact button in the header is always the solid Gold variant for immediate visibility.

### Inputs & Form Fields
- **Design:** Black background with a bottom-only 1px border (#333333). On focus, the border becomes Gold (#FFC107) and the label (Montserrat, uppercase) floats above.

### Footer
- **Structure:** 4-column layout. High-contrast typography. Use the Gold accent for social media icons and "Back to Top" functionality. 

### Chips/Filters
- **Style:** Rectangular, sharp-edged boxes. Active filters are solid Gold; inactive are outlined in dark gray.