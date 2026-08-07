# BurgerAPI Website Design System
Version: 1.0

---

# Philosophy

BurgerAPI should feel like:

- ⚡ Extremely fast
- 🍔 Friendly
- 🧠 Smart
- 🎯 Professional
- ✨ Premium

The logo is playful.

Everything else should communicate engineering quality.

Think:

Bun × Vercel × Linear × Stripe

NOT

Cartoon website.

The mascot provides personality.

The UI provides trust.

---

# Brand Personality

Primary Traits

• Fast
• Modern
• Friendly
• Clean
• Open Source
• Developer First
• Bun Native

Never feel:

❌ childish
❌ overly colorful
❌ gaming UI
❌ crypto
❌ neon overload

---

# Visual Keywords

Premium

Minimal

Glass

Depth

Smooth

Confident

Modern

Developer-focused

Elegant

Readable

---

# Logo Usage

The mascot should appear in:

• Navbar
• Hero
• Footer
• Loading animations
• GitHub section

Never overuse it.

The mascot is a brand icon—not decoration.

---

# Design Style

Lots of whitespace.

Rounded corners.

Large typography.

Subtle gradients.

Glass effects.

Smooth shadows.

Beautiful motion.

Minimal borders.

Everything aligned to an 8px grid.

---

# Border Radius

Cards:
16px

Buttons:
12px

Inputs:
12px

Code Blocks:
18px

Hero Panels:
24px

---

# Shadows

Layered, soft, and never harsh. Cards use small by default and large on hover.

Light Mode

small:
0 2px 6px rgba(0,0,0,.04)

medium:
0 16px 40px rgba(0,0,0,.08)

large:
0 24px 60px rgba(0,0,0,.12)

Dark Mode

small:
0 2px 8px rgba(0,0,0,.40)

medium:
0 16px 40px rgba(0,0,0,.50)

large:
0 24px 60px rgba(0,0,0,.60)

---

# Typography

Primary

Inter

Code

JetBrains Mono

Weights

400
500
600
700
800

Hero Title

clamp(44px → 72px)

Section Title

44px

Card Title

22px

Body

17px

Description

16px

Small

14px

Leave generous space between a section title and its paragraph.

---

# Color Palette

Orange is an accent only — used for buttons, links, icons, badges, active
states, and selected tabs. It is never a dominant background.

Primary

#FFA62B

Secondary

#FFB84D

Accent

#FFC861

Success

#10B981

Danger

#EF4444

Info

#3B82F6

---

# Light Theme

Background

#F7F7F5

Secondary Background

#F2F2EF

Card

#FFFFFF

Soft Card

#FCFCFA

Border

rgba(0,0,0,.06)

Divider

rgba(0,0,0,.04)

Primary Text

#0A0A0B

Secondary Text

#3F3F46

Muted

#52525B

---

# Dark Theme

Background

#09090B

Secondary Background

#0F1012

Card

#17181C

Soft Card

#141519

Elevated Card

#1D1F24

Hover Card

#23262D

Border

rgba(255,255,255,.08)

Divider

rgba(255,255,255,.05)

Primary Text

#FAFAFA

Secondary Text

#D4D4D8

Muted

#A1A1AA

---

# Surface Hierarchy

Sections alternate between two warm-neutral backgrounds to create rhythm
without harsh contrast jumps:

• Base sections use Background (#F7F7F5 / #09090B)
• Secondary sections use Secondary Background (#F2F2EF / #0F1012)
• Cards sit one layer above their section (Card → Soft Card in light,
  Card → Elevated in dark) with subtle gradient and soft shadow
• Hover raises a card to the Elevated/Hover layer with a deeper shadow

Homepage rhythm (base / secondary alternation):
Hero (base) → Features (secondary) → Performance (base) → Code Examples
(secondary) → Developer Experience (secondary) →
File Routing (base) → Validation (secondary) → Lifecycle (base) → OpenAPI
(secondary) → CLI (base) → Docs CTA (base) → GitHub CTA (secondary) →
Community (base).

---

# Buttons & CTAs

Every interactive element belongs to one of three tiers. No stray
browser-default buttons, no plain white pills, no mixed personalities.

Tier 1 — Primary CTA

Used only for the most important actions (Get Started, Open Documentation,
View Repository).

Orange gradient (Accent → Primary)

Dark text

Glow shadow

Bold text, 15px

Min width 160px, ~48px height

Large radius

Hover: lift 2px, brighter, stronger glow

Never a plain orange rectangle.

Tier 2 — Secondary CTA

Most section "docs" buttons live here (Explore architecture, request
lifecycle, Validation guide, OpenAPI docs, File routing docs).

Warm tinted background

Light mode: #ECECE8, hover #E3E3DF, text #18181B

Dark mode: rgba(255,255,255,.05), hover rgba(255,255,255,.08)

Very soft border rgba(0,0,0,.08) / rgba(255,255,255,.08)

Slight backdrop blur

Medium radius

Font weight 600, 14px

Hover: darken, lift 2px, tiny shadow

Never pure white.

Tier 3 — Text CTA

Low-priority navigation becomes a premium inline link, not a pill
(Read the performance philosophy, CLI reference).

Medium weight

Orange color

Underline fades in on hover

Arrow slides right 4px

Smooth color transition

180ms ease-out, no bounce

Placement & rhythm

Buttons hang off the content above them — never float alone in whitespace.

Title → 16px → Description → 32px → Cards/Code → 24px → CTA →
80–120px → next section.

Alignment follows the section: centered sections keep a centered CTA,
left-aligned sections start the CTA at the text edge.

Icons

Secondary and primary buttons carry a 16px Lucide icon (Book, Folder,
Shield, Network, FileJson, GitBranch) plus an animated ArrowRight that
slides 0.5–1px on hover.

Accessibility

Visible hover, visible keyboard focus, WCAG AA contrast, pointer cursor,
no disappearing outlines.

---

# Animations

Every animation should feel:

Smooth

Fast

Purposeful

Use:

opacity

translateY

scale

blur

Avoid:

bounce

rubber band

spin forever

crazy movement

---

# Hero Section

Large logo

Massive heading

Small subtitle

Code example

CTA buttons

GitHub stars

Version badge

Bun badge

Open Source badge

Background should include:

very subtle grid

blurred gradient orbs

soft radial lighting

---

# Cards

Floating

Rounded

Subtle vertical gradient (Card → Soft Card / Card → Elevated)

Glass effect

Very soft low-alpha border (rgba, never thick solid)

Soft layered shadow

Hover:

lift (translateY -4px)

deeper shadow

brand-tinted border

Never plain white rectangles.

---

# Code Blocks

Dark

Rounded

Copy button

Filename

Syntax highlighting

Terminal style

---

# Icons

Use Lucide Icons.

Consistent stroke width.

---

# Homepage Sections

Hero

Features

Performance

Code Examples

Developer Experience

File Routing

Validation

Lifecycle

OpenAPI

CLI

Docs CTA

GitHub CTA

Community

Footer

---

# Performance Feeling

Website must feel instant.

No layout shift.

Fast page transitions.

Smooth loading skeletons.

Images fade in.

Everything lazy loads.

---

# Accessibility

WCAG AA minimum.

Keyboard accessible.

Visible focus states.

Reduced motion support.

Good contrast.

---

# Mobile

Mobile first.

Navigation drawer.

Touch-friendly spacing.

Responsive code blocks.

---

# Motion

Duration

150–250ms

Easing

ease-out

Never use long animations.

---

# Decorative Effects

Use sparingly:

Gradient glow

Noise texture

Glass panels

Soft radial gradients

Tiny floating particles

Never distract from content.

---

# Premium UI Principles

Depth comes from layered surfaces and soft shadows, not from borders.

Use low-alpha rgba borders (rgba(0,0,0,.06) light / rgba(255,255,255,.08)
dark). Separate cards by contrast and elevation, not thick outlines.

Orange is an accent only. Dominant areas are warm neutrals; orange appears on
buttons, links, icons, eyebrows, active nav, badges, and selected tabs.

Motion is 150–250ms ease-out. Cards lift, buttons scale slightly, icons nudge,
code blocks deepen their shadow on hover. No bounce, no spin-forever.

Decorative glow orbs and the hero grid stay subtle and behind content.

---

# Install Command Panel

The CLI install command is the focal point of the terminal section. It is a
dedicated dark panel (not a plain code block):

Terminal-style header with traffic-light dots, "Install BurgerAPI" label, and
a "bun" badge.

Large JetBrains Mono command with a brand-colored "$" prompt.

Copy button with a hover/focus tooltip and a "Copied!" confirmation animation.

Soft orange glow on hover, elevated shadow, subtle top radial highlight.

Left column flows top-down (heading → description → command → CLI Reference
button 20px below → code example on the right). Columns align to the top so
the command is the visual anchor.

# Footer

Three-level hierarchy:

Level 1 — brand: mascot, name, one-line description, version + MIT + GitHub
stars badges.

Level 2 — navigation: categorized columns (Documentation, Resources,
Community, Project) with consistent 15px links and hover arrow animation.

Level 3 — bottom bar: copyright / MIT / Built with Bun on the left, framework
version / "Made for the Bun ecosystem" on the right, separated by a divider.

Background: dark #0D0E10 with rgba(255,255,255,.05) top border and a faint
orange radial; light #F2F2EF with a soft border. Generous vertical spacing.

---

# Overall Goal

Visitors should think:

"This framework looks incredibly polished."

within 3 seconds.

After scrolling:

"I want to build my next Bun project with BurgerAPI."