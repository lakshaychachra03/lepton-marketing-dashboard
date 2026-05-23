# Lepton Marketing — Live Dashboard

Public, real-time view of the LMR Jira project. Browser polls Jira every 30 seconds via a tiny Vercel serverless function. No database, no always-on server.

Owner: Lakshay Chachra — `lakshay.chachra@leptonsoftware.com`

## What is live

- **TOP PRIORITY TASKS** table — re-fetched every 30 sec from Jira REST API
- All other `OPEN →` cards open live Jira filter views in a new tab

## Architecture

```
Browser  →  /api/priorities  →  Jira REST API
   ↑                                  |
   └──── JSON (top priorities) ←──────┘
   |
   re-fetch every 30s
```

Token never reaches the browser — it lives in Vercel env vars.

## Files

| File | Purpose |
|---|---|
| `index.html` | The dashboard page (mostly static Jira filter links + live priority table) |
| `api/priorities.js` | Vercel serverless function — calls Jira `/rest/api/3/search`, returns JSON |
| `vercel.json` | Routing + security headers |
| `package.json` | Node engine declaration |
| `.gitignore` | Ignore env files, .vercel, node_modules |

## First-time deployment (one-time, ~10 minutes)

### Step 1: Push this repo to GitHub

```bash
cd /Users/leptonl/Projects/lepton/dashboards/lepton-marketing
git init
git add -A
git commit -m "Initial commit — live Lepton Marketing dashboard"
# Create the GitHub repo (one of these):
# Option A — using gh CLI:
gh repo create lepton-marketing-dashboard --public --source=. --remote=origin --push
# Option B — manually at https://github.com/new, then:
#   git remote add origin https://github.com/lakshaychachra03/lepton-marketing-dashboard.git
#   git branch -M main
#   git push -u origin main
```

### Step 2: Generate a Jira API token

1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Click **Create API token**
3. Label: `marketing-dashboard`
4. Copy the token immediately (you only see it once)

### Step 3: Deploy on Vercel

1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Click **Import** next to `lepton-marketing-dashboard`
4. Before clicking Deploy, expand **Environment Variables** and add:

| Name | Value |
|---|---|
| `JIRA_BASE_URL` | `leptonsoftware-team.atlassian.net` |
| `JIRA_EMAIL` | `lakshay.chachra@leptonsoftware.com` (your Atlassian login) |
| `JIRA_TOKEN` | the token from Step 2 |

5. Click **Deploy**
6. Vercel gives you a URL like `https://lepton-marketing-dashboard.vercel.app`

### Step 4: Share with the team

Copy the URL and post it in your team Slack channel.

## Updating

Any change you commit and push to GitHub auto-deploys to Vercel within ~60 seconds. No manual deploy step.

To change what counts as a "top priority", edit the `JQL` constant at the top of `api/priorities.js` and push.

## Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| `Loading from Jira…` never goes away | Env vars missing or wrong | Vercel → Project → Settings → Environment Variables, verify all 3 |
| `Refresh failed (HTTP 401)` | Wrong token or email | Regenerate token, update Vercel env var |
| `Refresh failed (HTTP 403)` | Token doesn't have access to project LMR | Use an account that has Jira access |
| Empty table, "Great job!" message | No HIGHEST/HIGH open tickets with due dates | Working as intended |
| Stale data | Browser cached | Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows) |

## Local development

```bash
npm install -g vercel
vercel dev
```

This runs the serverless function locally at `http://localhost:3000`. You'll be prompted to link the project to a Vercel account and pull env vars.

## Phase 2 + 3 (planned)

This dashboard is Phase 1 of a larger team-ops setup. Future phases (configured in Jira + Slack, not in this repo):

- Phase 2: Slack Workflow Builder for 9 AM and 6 PM DMs; Jira Automation rules for status-change notifications.
- Phase 3: Vercel cron jobs for 8 PM accountability check + EOD compiled summary to manager.
