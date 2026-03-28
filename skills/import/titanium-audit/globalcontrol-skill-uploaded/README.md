# Global Control Center Skill

Complete command suite for Global Control Center CRM operations.

## Installation

1. Copy this folder to your OpenClaw workspace: `skills/globalcontrol/`
2. Add your API key to gateway config:

```json
{
  "skills": {
    "entries": {
      "globalcontrol": {
        "apiKey": "YOUR_GC_API_KEY_HERE"
      }
    }
  }
}
```

Or save it to: `credentials/globalcontrol-api-key.txt`

3. Restart OpenClaw: `openclaw gateway restart`

## Commands

- `/contact details` - Search and display contact information
- `/email formula` - Generate email copy (subject + preview + body)
- `/broadcast` - Send broadcast email to tags or all actives
- `/reengagement` - Progressive tagging campaign (requires reengagement skill)
- `/add contact` - Add single contact to GC

## API Key Location

Get your API key from:
1. Log into Global Control dashboard
2. Settings > API Access
3. Generate/copy token

## Documentation

- Full API docs: https://api.globalcontrol.io/ai-api-docs
- SKILL.md - Complete command reference
- TOOLS.md - Chad's workflow notes (in workspace root)

## Support

Questions? Check:
- `openclaw-support-kb/` folder in workspace
- Global Control API docs
- Entourage Mastermind community

---

*Built for Chad Nicely's Titanium Software Suite*
*Part of OpenClaw automation ecosystem*
