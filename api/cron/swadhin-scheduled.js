// Ad-hoc scheduled reminders for Swadhin via his existing Slack webhook.
// One-time: Thursday 2026-05-28 Vitika follow-up.
// Recurring: Friday afternoon heads-up + Saturday/Sunday morning reel reminders.

const SWADHIN_WEBHOOK = 'https://hooks.slack.com/triggers/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';

const VITIKA_DATE = '2026-05-28';

const MESSAGES = {
  vitika: "Hi Swadhin,\n\nReminder to follow up with Vitika today.\n\nThanks.",
  fridayReels: "Hi Swadhin,\n\nHeads up for the weekend. Please plan to shoot at least 5-6 reels for SmartMarket over Saturday and Sunday.\n\nThanks.",
  saturdayReels: "Hi Swadhin,\n\nGood morning. Reminder to start the SmartMarket reels today, aiming for 2-3 by EOD. Full target for the weekend is 5-6.\n\nThanks.",
  sundayReels: "Hi Swadhin,\n\nGood morning. Reminder to wrap up the SmartMarket reels today. Target was 5-6 across the weekend.\n\nThanks."
};

export default async function handler(req, res) {
  const cronAuth = process.env.CRON_SECRET;
  const auth = req.headers.authorization || '';
  if (cronAuth && auth !== `Bearer ${cronAuth}`) {
    if (req.query.test !== '1' && !req.query.force) {
      return res.status(401).json({ error: 'Unauthorized — append ?test=1 to manually test, or ?force=vitika|fridayReels|saturdayReels|sundayReels' });
    }
  }

  const now = new Date();
  const istDate = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  const istDay = now.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Kolkata' });

  // Force-fire support (for testing): ?force=vitika or ?force=fridayReels etc.
  const forced = req.query.force;

  let message = null;
  let reason = null;

  if (forced && MESSAGES[forced]) {
    message = MESSAGES[forced];
    reason = `forced: ${forced}`;
  } else if (istDate === VITIKA_DATE) {
    message = MESSAGES.vitika;
    reason = `Vitika follow-up (one-time, ${VITIKA_DATE})`;
  } else if (istDay === 'Friday') {
    message = MESSAGES.fridayReels;
    reason = 'Friday reel heads-up';
  } else if (istDay === 'Saturday') {
    message = MESSAGES.saturdayReels;
    reason = 'Saturday reel reminder';
  } else if (istDay === 'Sunday') {
    message = MESSAGES.sundayReels;
    reason = 'Sunday reel reminder';
  }

  if (!message) {
    return res.status(200).json({ skipped: true, day: istDay, date: istDate, reason: 'no scheduled message for today' });
  }

  try {
    const r = await fetch(SWADHIN_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message })
    });
    return res.status(200).json({ sent: r.ok, slackStatus: r.status, reason, date: istDate, day: istDay });
  } catch (e) {
    return res.status(500).json({ error: String(e), reason });
  }
}
