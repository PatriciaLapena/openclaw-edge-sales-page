# Design Your Next Chapter - Funnel Link Structure

## Purpose
Define the exact link structure needed to make the **Design Your Next Chapter** funnel work smoothly once hosted.

This keeps the pages, thank-you screen, workbook access, and email CTAs aligned.

---

## Core Funnel Pages

### 1. Opt-In Page
**Purpose:** Capture name + email before access

**Suggested live URL:**
- `https://reclaimedvitality.com/design-your-next-chapter`

**Current local file:**
- `offers/design-your-next-chapter-optin.html`

---

### 2. Thank-You Page
**Purpose:** Confirm signup, guide next action, reinforce next step

**Suggested live URL:**
- `https://reclaimedvitality.com/design-your-next-chapter/thank-you`

**Current local file:**
- `offers/design-your-next-chapter-thank-you.html`

---

### 3. Workbook / Calculator Page
**Purpose:** Deliver the actual interactive workbook and lifestyle calculator

**Suggested live URL:**
- `https://reclaimedvitality.com/design-your-next-chapter/workbook`

**Current local file:**
- `offers/design-your-next-chapter-gated.html`

---

### 4. PDF Backup Version
**Purpose:** Give users a downloadable non-interactive version if they want to print or save it

**Suggested live URL:**
- `https://reclaimedvitality.com/design-your-next-chapter/download`

**Current local file:**
- `offers/Design-Your-Next-Chapter-Workbook.pdf`

---

## Core Business CTA Links

### 5. Reclaimed Vitality Main Offer Page
**Purpose:** Primary CTA destination from thank-you page and nurture emails

**Needs final destination:**
- community sales page
- waitlist page
- launch page
- or membership page

**Suggested placeholder live URL:**
- `https://reclaimedvitality.com/join`

Use this for:
- Email 5 CTA
- workbook final CTA
- thank-you page future CTA button

---

### 6. Sister Wealth Creators Future Page
**Purpose:** Later-stage destination for women who resonate strongly with the income/lifestyle planning angle

**Suggested future URL:**
- `https://reclaimedvitality.com/sister-wealth-creators`

This does not need to be active yet, but should be reserved in planning.

---

## Email Link Plan

### Welcome Email
Use:
- `[WORKBOOK LINK]` → workbook/calculator page

### Email 2
Use:
- `[WORKBOOK LINK]` → workbook/calculator page

### Email 3
Use:
- `[WORKBOOK LINK]` → workbook/calculator page

### Email 4
Use:
- `[WORKBOOK LINK]` → workbook/calculator page

### Email 5
Use:
- `[RECLAIMED VITALITY LINK]` → primary RV offer/join page

---

## Thank-You Page Link Plan

### Primary button
- **Open the Workbook**
- link to workbook/calculator page

### Secondary button
- **Download the PDF Version**
- link to PDF backup

### Optional future third button
- **Learn About Reclaimed Vitality**
- link to RV offer page

Do not add the third button until Patricia is happy with the main offer destination.

---

## Hosting Logic Recommendation

### Best structure
When hosted, route as:
- Opt-in page → captures lead in MailerLite
- on success → redirect to thank-you page
- thank-you page → links to workbook page
- workbook page → final CTA to Reclaimed Vitality

This keeps the journey clean and understandable.

---

## Immediate Placeholder Values To Use Later

When ready to publish, replace with final live links:

- `[WORKBOOK LINK]` = workbook/calculator page live URL
- `[RECLAIMED VITALITY LINK]` = main join/sales page live URL

---

## Recommended Next Technical Step

Before final MailerLite automation setup, decide:
1. where this will be hosted
2. what the final public URLs will be
3. what the final Reclaimed Vitality CTA destination should be

Once those 3 are known, the full funnel can be wired cleanly.
