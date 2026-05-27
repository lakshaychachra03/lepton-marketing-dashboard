// =============================================================================
//  LEPTON MARKETING — CALENDAR DATA
// -----------------------------------------------------------------------------
//  This is the ONLY file you (or your script) need to edit to update the
//  calendar on the live dashboard. The calendar reads from window.CALENDAR_EVENTS
//  below. Overwrite this file and push to GitHub — Vercel auto-deploys.
//
//  EACH EVENT IS ONE ROW. FIELDS:
//
//    REQUIRED
//      date      'YYYY-MM-DD'              — the day the task is due / goes live
//      title     'Short task name'         — what shows on the calendar tile
//
//    OPTIONAL (leave out if you don't need it)
//      epic      'Campaign or epic name'   — tasks with the same epic group together
//      labels    ['instagram', 'reel']     — small pills shown next to the task
//      track     1..7                      — which product/team owns this
//      status    'todo' | 'in-progress' | 'done'
//      priority  'highest' | 'high' | 'medium' | 'low'
//      owner     'Plash Saini'             — assignee name, shown in detail panel
//
//  TRACKS
//    1 = Lepton          2 = GMP            3 = Network Access
//    4 = Smart Market    5 = TraffiCure     6 = Rajeev sir     7 = Umang
// =============================================================================

window.CALENDAR_EVENTS = [

  // ---- SAMPLES — replace with your own events ----

  { date: '2026-06-06', title: 'SmartMarket — Instagram Reel #5',
    epic: 'Instagram Reels 100D', labels: ['instagram', 'reel'],
    track: 4, status: 'todo', owner: 'Plash Saini' },

  { date: '2026-06-08', title: 'SmartMarket — Instagram Reel #6 publish',
    epic: 'Instagram Reels 100D', labels: ['instagram', 'reel'],
    track: 4, status: 'todo', owner: 'Plash Saini' },

  { date: '2026-06-10', title: 'GMP Webinar — go live',
    epic: 'GMP Q2 Webinar Series', labels: ['webinar'],
    track: 2, status: 'todo', priority: 'highest', owner: 'Plash Saini' },

  { date: '2026-06-12', title: 'June newsletter — final send',
    epic: 'June Newsletter Campaign', labels: ['newsletter', 'email'],
    track: 1, status: 'in-progress', priority: 'high', owner: 'Chetna Bhatia' },

  { date: '2026-06-15', title: 'USA co-op cold email — batch 2',
    epic: 'USA Co-op Outreach', labels: ['outbound', 'email', 'usa'],
    track: 3, status: 'todo', owner: 'Swadhin Saraf' },

  { date: '2026-06-18', title: 'TraffiCure PR pitch — round 2',
    epic: 'TraffiCure PR Push', labels: ['pr', 'press'],
    track: 5, status: 'todo', owner: 'Lakshay Chachra' },

  { date: '2026-06-20', title: 'Rajeev sir LinkedIn post #9',
    labels: ['linkedin'],
    track: 6, status: 'todo', owner: 'Lakshay Chachra' }

];
