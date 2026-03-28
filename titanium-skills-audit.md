# Titanium Skills Audit - March 28, 2026

## Priority Order Audited
1. MintBird
2. CourseSprout
3. Letterman

## Summary
The good news: Patricia already has the key ingredients needed for these tools — zip packages and valid API keys.

The less good news: the imported packages are inconsistent. Some are true OpenClaw-style skills, some are partial/documentation-heavy bundles, and at least one contains hardcoded vendor-specific defaults that are unsafe to use as-is.

## Current Status by Tool

### 1) MintBird / PopLinks
**API key test:** PASS  
**Read-only connectivity:** PASS (`GET /products` returned success)

**Audit findings:**
- Package contains a `SKILL.md` and API reference.
- Skill is **not portable as-is**.
- It contains **hardcoded credentials and vendor defaults** such as:
  - fixed bearer token in docs
  - fixed domain `chadnicely.com`
  - fixed Stripe integration/account IDs
- It lacks proper OpenClaw frontmatter and should not be trusted directly without cleanup.

**Setup status:**
- API key confirmed working.
- Package unpacked for review.
- Not yet safe to treat as a drop-in autonomous skill.

**Recommendation:**
Create a cleaned local MintBird skill or use direct API/browser workflows until cleaned.

### 2) CourseSprout
**API key test:** PASS  
**Read-only connectivity:** PASS (`GET /get-course` returned success)

**Audit findings:**
- Package is the strongest of the three from a documentation perspective.
- Includes broad endpoint coverage and safety notes.
- However, it is still documentation-first and not fully wired as a native callable tool in this session.
- It expects credentials in `credentials/coursesprout.txt`.

**Setup status:**
- Created `credentials/coursesprout.txt`.
- Package unpacked for review.
- Best candidate for near-term operational use.

**Recommendation:**
Promote CourseSprout as first Titanium tool to operationalize.

### 3) Letterman
**API key test:** PASS  
**Read-only connectivity:** PASS (`GET /user` returned Patricia account data)

**Audit findings:**
- Package has valid OpenClaw-style frontmatter.
- Rich endpoint documentation.
- Credential filename in the skill referenced `credentials/titanium-api-keys.txt` while workspace had `titanium_api_keys.txt`.

**Setup status:**
- Created normalized credential file `credentials/titanium-api-keys.txt` so the skill has the filename it expects.
- Package unpacked for review.
- This is another strong candidate for real use now.

**Recommendation:**
Letterman can likely be used soon for article/publication workflows, with draft-first safety.

## What Was Set Up Today
- Unpacked the top-priority Titanium packages into `skills/import/titanium-audit/`
- Verified live API connectivity for:
  - MintBird / PopLinks
  - CourseSprout
  - Letterman
- Added normalized credential files expected by imported skills:
  - `credentials/coursesprout.txt`
  - `credentials/titanium-api-keys.txt`

## Practical Conclusion
### Ready now
- CourseSprout: close
- Letterman: close
- MintBird: API works, but package needs cleanup before trusted autonomous use

### Still missing for true plug-and-play use
- Clean, normalized imported skill folders
- Removal of hardcoded third-party defaults from MintBird package
- A small local execution wrapper or cleaned skill version for each Titanium app
- Validation tests for write operations using safe draft/non-destructive flows

## Recommended Next Build Order
1. Clean and operationalize **MintBird**
2. Clean and operationalize **CourseSprout**
3. Clean and operationalize **Letterman**
4. Audit **Quizforma**
5. Audit **Global Control**

## Bottom Line
Patricia did not waste money on the Titanium skills.
The packages and keys are useful.
The main issue is **installation quality and compatibility**, not ownership or access.
