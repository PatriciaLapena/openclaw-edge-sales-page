---
name: globalcontrol
description: Complete Global Control Center command suite - contact management, email broadcasts, workflows, and re-engagement campaigns. Use for CRM operations, email marketing, and contact tagging.
triggers: ["/contact details", "/email formula", "/broadcast", "/reengagement", "/add contact", "global control", "gc api"]
---

# Global Control Center Skill

Complete command suite for managing Global Control Center CRM operations.

## Prerequisites

- Global Control API key (stored in credentials or config)
- Base URL: `https://api.globalcontrol.io/api/ai`
- Authentication: `X-API-KEY` header

## Commands

### `/contact details`

Search and display full contact information from Global Control.

**Usage:**
```
User: /contact details
Agent: What's the person's name or email?
User: james@example.com
```

**What it does:**
1. Searches all contacts using `?search=` parameter (efficient - no pagination needed)
2. URL encodes search term (spaces become %20)
3. Gets full contact details by ID
4. Displays ALL available information

**API Endpoints:**
- Search: `GET /contacts?search=TERM`
- Details: `GET /contacts/{contactId}`

**Display Format:**
```
**Contact Details: {email}**

**Basic Info:**
- Name: {firstName} {lastName}
- Email: {email}
- Phone: {phone}
- Contact ID: {id}

**Status:**
- Email Valid: {emailValid}
- Contact Dead: {contactDead} (if true)
- Last Email Sent: {lastEmailSent}
- Last Active: {lastActive}
- Created: {createdAt}

**Location:**
- Country: {country}
- City: {city}
- Timezone: {timezone}
- IP: {ipAddress}

**Custom Fields:**
{all custom field values}

**Engagement:**
- Tags: {tagCount}
- Workflows: {workflowCount}
```

**Example:**
```javascript
// Search by name (spaces encoded)
const searchTerm = encodeURIComponent("James Coe");
const results = await fetch(`/contacts?search=${searchTerm}`);

// Get full details
const contact = await fetch(`/contacts/${results[0].id}`);
```

---

### `/email formula`

Generate engaging email copy with subject lines, preview text, and formatted body.

**Usage:**
```
User: /email formula
Agent: What's the main topic/hook?
User: New productivity tool launch
Agent: What's the CTA link?
User: https://product.com/buy
```

**What it does:**
1. Asks for topic/hook (if not provided, infers from context)
2. Asks for CTA link
3. Generates email formula:
   - 3 subject line variations
   - 1 preview text
   - 1 email body (200-400 words)

**Email Structure (MANDATORY):**
```
Opening hook - 3 sentences max

Click here to [action] → [LINK] ← MANDATORY AFTER FIRST 3 SENTENCES

Body copy - builds curiosity, excitement, desire

Click here to [action] → [LINK]

P.S. [urgency/bonus/curiosity] Click here to [action] → [LINK] ← MANDATORY P.S. WITH LINK
```

**Critical Link Rules:**
- ✅ ALWAYS link after first 3 sentences
- ✅ ALWAYS P.S. with link at end
- ✅ ALL links MUST use "Click here to [action]" format
  - "Click here to see how it works"
  - "Click here to grab your spot"
  - "Click here to check it out"
- ❌ NOT "See it here" or "Check this out"

**Tone & Style:**
- EXCITING - high energy, bold, compelling
- Make them FEEL something
- Curiosity-driven
- Personal, not corporate
- Urgent but not desperate
- Short paragraphs (1-3 sentences)
- 5th-grade readability
- Direct-response style

**Subject Line Styles:**
- Curiosity ("This is wild...")
- Discovery ("I almost didn't believe it")
- Urgency ("You need to see this NOW")
- Breakthrough ("This changes everything")

**Output Format:**
```
**Subject Lines:**
1. [curiosity-driven]
2. [urgency-driven]
3. [breakthrough-driven]

**Preview Text:**
[engaging preview that extends the subject line]

**Email Body:**
[formatted with proper spacing, links, P.S.]
```

---

### `/broadcast`

Send broadcast email to Global Control contacts.

**Usage:**
```
User: /broadcast
Agent: What's the main topic/hook?
User: Product launch announcement
Agent: What's the CTA link?
User: https://product.com/launch
Agent: Send to a specific tag or all actives?
User: tag "Product Launch List"
```

**Workflow:**
1. Ask for main topic/hook
2. Ask for CTA link
3. Generate email using `/email formula` skill
4. Ask: "Send to a specific tag or all actives?"
5. If tag: get tag ID
6. Send broadcast via GC API

**API Endpoint:**
```
POST /broadcast-emails/send-email
```

**Payload Structure:**
```json
{
  "recipients": [
    {
      "tagId": "TAG_ID_HERE",
      "source": "TAG",
      "excludeTags": [],
      "addExtraOptions": true,
      "postTagging": false,
      "onOpen": null,
      "onClick": null,
      "sendingSchedule": "IMMEDIATELY",
      "mailProvider": "smtp",
      "mailSenderAccount": null,
      "dailyLimit": null
    }
  ],
  "subject": "Subject line here",
  "previewText": "Preview text here",
  "emailBody": "<p>Email body HTML here</p>",
  "replyTo": null,
  "fromName": null,
  "fromEmail": null,
  "emailTrackingDomain": null,
  "linkTrackingDomain": null,
  "trackOpens": true,
  "trackClicks": true,
  "unsubscribeText": null,
  "unsubscribeLink": null
}
```

**For all actives (no tag filter):**
```json
{
  "recipients": [
    {
      "source": "ALL_CONTACTS",
      "tagId": null,
      "excludeTags": [],
      "addExtraOptions": true,
      "postTagging": false,
      "onOpen": null,
      "onClick": null,
      "sendingSchedule": "IMMEDIATELY",
      "mailProvider": "smtp"
    }
  ],
  "subject": "...",
  "previewText": "...",
  "emailBody": "..."
}
```

**Response Format:**
```
✅ BROADCAST SENT!

Recipients: [tag name or "All Active Contacts"]
Subject: [subject line used]
Estimated Reach: [contact count]
Tracking: Opens ✓ | Clicks ✓
```

---

### `/reengagement`

Progressive tagging campaign over multiple days with pacing control.

**Usage:**
```
User: /reengagement
Agent: How many total contacts are we re-engaging?
User: 10,000
Agent: What sending pace? (Mild, Normal, or Aggressive)
User: Mild
Agent: [Shows schedule table]
Agent: Please upload your contact file (CSV or XLS/XLSX)
```

**See the full reengagement skill documentation for complete workflow.**

**Key Features:**
- Import from CSV/XLS
- Progressive hourly pacing (8-hour daily window)
- Auto-tag contacts in GC to trigger workflows
- Pause/resume/cancel controls
- Max 400/hour safety cap
- Cron-based execution
- KANBAN.md integration

---

### `/add contact`

Add a single contact to Global Control.

**Usage:**
```
User: /add contact
Agent: What's the contact's email?
User: john@example.com
Agent: First name?
User: John
Agent: Last name?
User: Doe
Agent: Phone? (optional - say 'skip' if none)
User: 555-1234
Agent: Any tags to apply? (optional - say 'none' if none)
User: Newsletter Subscriber
```

**API Endpoint:**
```
POST /contacts
```

**Payload:**
```json
{
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "555-1234",
  "customFields": {}
}
```

**After creating contact:**
```
POST /tags/fire-tag/{tagId}
```

**Response:**
```
✅ Contact Added!

Name: John Doe
Email: john@example.com
Contact ID: {id}
Tags Applied: Newsletter Subscriber ✓
```

---

## API Reference

### Authentication

All requests require the API key in headers:

```javascript
const headers = {
  'X-API-KEY': 'YOUR_API_KEY_HERE',
  'Content-Type': 'application/json'
};
```

### Common Endpoints

| Action | Method | Endpoint |
|--------|--------|----------|
| Get user info | GET | `/me` |
| List contacts | GET | `/contacts` |
| Search contacts | GET | `/contacts?search=TERM` |
| Get contact | GET | `/contacts/{id}` |
| Create contact | POST | `/contacts` |
| Update contact | PUT | `/contacts/{id}` |
| Delete contact | DELETE | `/contacts/{id}` |
| List tags | GET | `/tags` |
| Create tag | POST | `/tags` |
| Fire tag | POST | `/tags/fire-tag/{tagId}` |
| List tag groups | GET | `/tag-groups` |
| List custom fields | GET | `/custom-fields` |
| Send broadcast | POST | `/broadcast-emails/send-email` |
| Get active contacts count | POST | `/broadcast-emails/active-contacts-count` |

### Rate Limits

- **General API:** No published limits (use reasonable throttling)
- **Contact tagging:** Max 400/hour recommended
- **Broadcasts:** No per-send limits (but respect email sending best practices)

### Error Handling

| Status | Meaning | Action |
|--------|---------|--------|
| 200 | Success | Process response |
| 400 | Bad request | Check payload format |
| 401 | Unauthorized | Check API key |
| 403 | Forbidden | Check permissions |
| 404 | Not found | Resource doesn't exist |
| 429 | Rate limit | Wait 60s, retry |
| 500 | Server error | Retry 3x, then notify user |

---

## Configuration

**Store API key in one of:**

1. **Gateway config:**
```json
{
  "skills": {
    "entries": {
      "globalcontrol": {
        "apiKey": "YOUR_KEY_HERE"
      }
    }
  }
}
```

2. **Credentials file:** `credentials/globalcontrol-api-key.txt`

3. **Environment variable:** `GC_API_KEY`

---

## Examples

### Search Contact by Name
```javascript
const searchTerm = encodeURIComponent("James Coe");
const response = await fetch(
  `https://api.globalcontrol.io/api/ai/contacts?search=${searchTerm}`,
  { headers: { 'X-API-KEY': apiKey } }
);
const contacts = await response.json();
```

### Send Broadcast to Tag
```javascript
const payload = {
  recipients: [{
    tagId: "tag_12345",
    source: "TAG",
    sendingSchedule: "IMMEDIATELY"
  }],
  subject: "Your Subject Line",
  previewText: "Preview text here",
  emailBody: "<p>Email body</p>",
  trackOpens: true,
  trackClicks: true
};

await fetch(
  'https://api.globalcontrol.io/api/ai/broadcast-emails/send-email',
  {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }
);
```

### Fire Tag on Contact
```javascript
await fetch(
  `https://api.globalcontrol.io/api/ai/tags/fire-tag/${tagId}`,
  {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contactId: contactId
    })
  }
);
```

---

## Safety Rules

1. **NEVER expose API keys** in responses or logs
2. **ALWAYS validate email format** before creating contacts
3. **ALWAYS confirm before sending broadcasts** (show preview, get explicit YES)
4. **NEVER exceed 400 contacts/hour** for tagging operations
5. **ALWAYS check tag exists** before firing it
6. **ALWAYS provide user with broadcast summary** before sending

---

## Troubleshooting

### Contact Not Found
- Try searching by email instead of name
- Check for typos
- Verify contact exists in GC dashboard

### Broadcast Not Sending
- Verify tag ID is correct
- Check that tag has contacts
- Confirm email body has valid HTML
- Check SMTP settings in GC

### Tag Not Firing
- Verify tag exists (`GET /tags`)
- Check contact ID is valid
- Ensure workflow is linked to tag in GC dashboard

---

*Last updated: 2026-03-25*
*API Documentation: https://api.globalcontrol.io/ai-api-docs*
