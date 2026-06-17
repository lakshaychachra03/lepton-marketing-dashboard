# Lepton Marketing — Slack Workflow Builder reference

Copy-paste templates for the 9 AM and 6 PM daily DM workflows.

---

## Workflow 1: Morning todos (9 AM IST, Mon–Fri)

### Setup in Workflow Builder

1. Slack → workspace name (top-left) → **Tools & settings** → **Workflow Builder**
2. Click **+ Create** (top-right) → **Build Workflow** → name it: `Morning todos (9 AM)`
3. Trigger → **Scheduled date and time**
   - Start date: tomorrow
   - Time: **9:00 AM**
   - Time zone: **(GMT+5:30) India**
   - Repeat: **Every weekday** (Mon–Fri)
4. Click **Next** / **Save trigger**

### Add 4 message steps (one per person)

For each of the 4 people below, click **+ Add step** → **Send a message** → configure:
- **Send this message to**: A specific person → pick their name
- **Message**: paste the corresponding template below
- **Custom name**: leave default

---

#### Step 1 — DM to Swadhin

**To:** Swadhin Swadhin
**Message:**
```
Good morning Swadhin :sunny:

Your top priorities for today:
👉 <https://leptonsoftware-team.atlassian.net/issues/?jql=project%20%3D%20LMR%20AND%20assignee%20%3D%20%22712020%3A262e57bb-d008-4e8f-973a-734d3b19e12e%22%20AND%20statusCategory%20%21%3D%20Done%20AND%20priority%20in%20%28Highest%2C%20High%29%20ORDER%20BY%20priority%20DESC%2C%20duedate%20ASC|Open my top priorities in Jira>

📋 All open tickets: <https://leptonsoftware-team.atlassian.net/issues/?jql=project%20%3D%20LMR%20AND%20assignee%20%3D%20%22712020%3A262e57bb-d008-4e8f-973a-734d3b19e12e%22%20AND%20statusCategory%20%21%3D%20Done%20ORDER%20BY%20priority%20DESC%2C%20duedate%20ASC|Open in Jira>

📊 Team dashboard: <https://lepton-marketing-dashboard.vercel.app|Live view>

Tip: update tickets directly from Slack with `/jira comment LMR-XX <your update>` or `/jira transition LMR-XX`.
```

---

#### Step 2 — DM to Lakshay (you)

**To:** Lakshayy
**Message:**
```
Good morning Lakshay :sunny:

Your top priorities for today:
👉 <https://leptonsoftware-team.atlassian.net/issues/?jql=project%20%3D%20LMR%20AND%20assignee%20%3D%20%22712020%3Ac30d55c4-5bfe-4564-847a-df50d29665a3%22%20AND%20statusCategory%20%21%3D%20Done%20AND%20priority%20in%20%28Highest%2C%20High%29%20ORDER%20BY%20priority%20DESC%2C%20duedate%20ASC|Open my top priorities in Jira>

📋 All open tickets: <https://leptonsoftware-team.atlassian.net/issues/?jql=project%20%3D%20LMR%20AND%20assignee%20%3D%20%22712020%3Ac30d55c4-5bfe-4564-847a-df50d29665a3%22%20AND%20statusCategory%20%21%3D%20Done%20ORDER%20BY%20priority%20DESC%2C%20duedate%20ASC|Open in Jira>

📊 Team dashboard: <https://lepton-marketing-dashboard.vercel.app|Live view>

Tip: update tickets directly from Slack with `/jira comment LMR-XX <your update>` or `/jira transition LMR-XX`.
```

---

#### Step 3 — DM to Chetna

**To:** Chetna Bhatia
**Message:**
```
Good morning Chetna :sunny:

Your top priorities for today:
👉 <https://leptonsoftware-team.atlassian.net/issues/?jql=project%20%3D%20LMR%20AND%20assignee%20%3D%20%22712020%3A1a3f2ee1-53d8-44de-91f6-b088ef327f3e%22%20AND%20statusCategory%20%21%3D%20Done%20AND%20priority%20in%20%28Highest%2C%20High%29%20ORDER%20BY%20priority%20DESC%2C%20duedate%20ASC|Open my top priorities in Jira>

📋 All open tickets: <https://leptonsoftware-team.atlassian.net/issues/?jql=project%20%3D%20LMR%20AND%20assignee%20%3D%20%22712020%3A1a3f2ee1-53d8-44de-91f6-b088ef327f3e%22%20AND%20statusCategory%20%21%3D%20Done%20ORDER%20BY%20priority%20DESC%2C%20duedate%20ASC|Open in Jira>

📊 Team dashboard: <https://lepton-marketing-dashboard.vercel.app|Live view>

Tip: update tickets directly from Slack with `/jira comment LMR-XX <your update>` or `/jira transition LMR-XX`.
```

---

#### Step 4 — DM to Plash

**To:** Plash Saini
**Message:**
```
Good morning Plash :sunny:

Your top priorities for today:
👉 <https://leptonsoftware-team.atlassian.net/issues/?jql=project%20%3D%20LMR%20AND%20assignee%20%3D%20%22712020%3A7d2a8edd-cd85-447a-8953-ec9fa7333218%22%20AND%20statusCategory%20%21%3D%20Done%20AND%20priority%20in%20%28Highest%2C%20High%29%20ORDER%20BY%20priority%20DESC%2C%20duedate%20ASC|Open my top priorities in Jira>

📋 All open tickets: <https://leptonsoftware-team.atlassian.net/issues/?jql=project%20%3D%20LMR%20AND%20assignee%20%3D%20%22712020%3A7d2a8edd-cd85-447a-8953-ec9fa7333218%22%20AND%20statusCategory%20%21%3D%20Done%20ORDER%20BY%20priority%20DESC%2C%20duedate%20ASC|Open in Jira>

📊 Team dashboard: <https://lepton-marketing-dashboard.vercel.app|Live view>

Tip: update tickets directly from Slack with `/jira comment LMR-XX <your update>` or `/jira transition LMR-XX`.
```

---

### Save and publish

1. After all 4 steps are added, click **Save**
2. Click **Publish**
3. Optional: click **Test** to run it manually right now (sends DMs immediately)

---

## Workflow 2: EOD reminder (6 PM IST, Mon–Fri)

Same structure as Workflow 1, but at 6 PM with a different message.

### Setup

1. Workflow Builder → **+ Create** → **Build Workflow** → name: `EOD update reminder (6 PM)`
2. Trigger → **Scheduled date and time**
   - Time: **6:00 PM**
   - Time zone: **(GMT+5:30) India**
   - Repeat: **Every weekday**
3. Add 4 message steps as above with the EOD reminder message:

#### EOD message template (replace `<NAME>` and `<ACCOUNT_ID>` per person)

```
Hi <NAME> :wave:

Time to update your tickets before EOD. Please mark Done or add a status comment on each open item.

📋 Your open tickets: <https://leptonsoftware-team.atlassian.net/issues/?jql=project%20%3D%20LMR%20AND%20assignee%20%3D%20%22<ACCOUNT_ID>%22%20AND%20statusCategory%20%21%3D%20Done%20ORDER%20BY%20priority%20DESC%2C%20duedate%20ASC|Open in Jira>

Quick ways to update from Slack:
• `/jira transition LMR-XX` → change status
• `/jira comment LMR-XX <text>` → add comment

📊 Team dashboard: <https://lepton-marketing-dashboard.vercel.app|Live view>
```

### Account IDs reference

| Person | Account ID |
|---|---|
| Swadhin Saraf | `712020:262e57bb-d008-4e8f-973a-734d3b19e12e` |
| Lakshay Chachra | `712020:c30d55c4-5bfe-4564-847a-df50d29665a3` |
| Chetna Bhatia | `712020:1a3f2ee1-53d8-44de-91f6-b088ef327f3e` |
| Plash Saini | `712020:7d2a8edd-cd85-447a-8953-ec9fa7333218` |

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Can't find Workflow Builder | Click your workspace name → Tools & settings → Workflow Builder. If missing, your Slack plan may not support it. Lepton is on Pro = supported. |
| "Send a message" doesn't let me pick a person | The recipient must be a member of your Slack workspace. Confirm the person is in Lepton Software workspace. |
| URL doesn't render as a link | Make sure you used the format `<URL|text>` exactly, with the pipe `|`. |
| 9 AM DM didn't fire | Workflow Builder runs in the workspace's time zone. Confirm you set Asia/Kolkata (GMT+5:30) on the trigger. |
| Want to test before 9 AM tomorrow | Click the workflow → **Test workflow** button to send all DMs right now. |
