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
//      desc      'Long description text…'  — shown when the task is clicked open
//                                            (can include line breaks — use \n)
//
//  TRACKS
//    1 = Lepton          2 = GMP            3 = Network Access
//    4 = Smart Market    5 = TraffiCure     6 = Rajeev sir     7 = Umang
// =============================================================================

window.CALENDAR_EVENTS = [

  // ===========================================================================
  // SMART MARKET (track 4) — Email Marketing (Mon/Wed/Fri, 3 – 29 Jun 2026)
  // Owner: Swadhin + Lakshay  (work in progress — pre-3 Jun entries removed)
  // ===========================================================================
  { date: '2026-06-03', title: 'Email campaign send — #3',  track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },
  { date: '2026-06-05', title: 'Email campaign send — #4',  track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },
  { date: '2026-06-08', title: 'Email campaign send — #5',  track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },
  { date: '2026-06-10', title: 'Email campaign send — #6',  track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },
  { date: '2026-06-12', title: 'Email campaign send — #7',  track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },
  { date: '2026-06-15', title: 'Email campaign send — #8',  track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },
  { date: '2026-06-17', title: 'Email campaign send — #9',  track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },
  { date: '2026-06-19', title: 'Email campaign send — #10', track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },
  { date: '2026-06-22', title: 'Email campaign send — #11', track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },
  { date: '2026-06-24', title: 'Email campaign send — #12', track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },
  { date: '2026-06-26', title: 'Email campaign send — #13', track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },
  { date: '2026-06-29', title: 'Email campaign send — #14', track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },

  // ===========================================================================
  // SMART MARKET (track 4) — Daily Instagram (1 – 30 Jun 2026)
  // Owner: Plash Saini
  // ===========================================================================
  { date: '2026-06-01', title: 'Instagram post — Day 1',  track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-02', title: 'Instagram post — Day 2',  track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-03', title: 'Instagram post — Day 3',  track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-04', title: 'Instagram post — Day 4',  track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-05', title: 'Instagram post — Day 5',  track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-06', title: 'Instagram post — Day 6',  track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-07', title: 'Instagram post — Day 7',  track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-08', title: 'Instagram post — Day 8',  track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-09', title: 'Instagram post — Day 9',  track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-10', title: 'Instagram post — Day 10', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-11', title: 'Instagram post — Day 11', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-12', title: 'Instagram post — Day 12', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-13', title: 'Instagram post — Day 13', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-14', title: 'Instagram post — Day 14', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-15', title: 'Instagram post — Day 15', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-16', title: 'Instagram post — Day 16', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-17', title: 'Instagram post — Day 17', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-18', title: 'Instagram post — Day 18', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-19', title: 'Instagram post — Day 19', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-20', title: 'Instagram post — Day 20', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-21', title: 'Instagram post — Day 21', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-22', title: 'Instagram post — Day 22', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-23', title: 'Instagram post — Day 23', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-24', title: 'Instagram post — Day 24', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-25', title: 'Instagram post — Day 25', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-26', title: 'Instagram post — Day 26', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-27', title: 'Instagram post — Day 27', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-28', title: 'Instagram post — Day 28', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-29', title: 'Instagram post — Day 29', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },
  { date: '2026-06-30', title: 'Instagram post — Day 30', track: 4, owner: 'Plash Saini', epic: 'Smart Market — June Daily Instagram', labels: ['instagram'] },

  // ===========================================================================
  // SMART MARKET (track 4) — LinkedIn posts (Tue & Thu, Jun 2026)
  // Owner: Swadhin Saraf
  // ===========================================================================
  { date: '2026-06-02', title: 'LinkedIn post — #1', track: 4, owner: 'Swadhin Saraf', epic: 'Smart Market — June LinkedIn (Tue & Thu)', labels: ['linkedin'] },
  { date: '2026-06-04', title: 'LinkedIn post — #2', track: 4, owner: 'Swadhin Saraf', epic: 'Smart Market — June LinkedIn (Tue & Thu)', labels: ['linkedin'] },
  { date: '2026-06-09', title: 'LinkedIn post — #3', track: 4, owner: 'Swadhin Saraf', epic: 'Smart Market — June LinkedIn (Tue & Thu)', labels: ['linkedin'] },
  { date: '2026-06-11', title: 'LinkedIn post — #4', track: 4, owner: 'Swadhin Saraf', epic: 'Smart Market — June LinkedIn (Tue & Thu)', labels: ['linkedin'] },
  { date: '2026-06-16', title: 'LinkedIn post — #5', track: 4, owner: 'Swadhin Saraf', epic: 'Smart Market — June LinkedIn (Tue & Thu)', labels: ['linkedin'] },
  { date: '2026-06-18', title: 'LinkedIn post — #6', track: 4, owner: 'Swadhin Saraf', epic: 'Smart Market — June LinkedIn (Tue & Thu)', labels: ['linkedin'] },
  { date: '2026-06-23', title: 'LinkedIn post — #7', track: 4, owner: 'Swadhin Saraf', epic: 'Smart Market — June LinkedIn (Tue & Thu)', labels: ['linkedin'] },
  { date: '2026-06-25', title: 'LinkedIn post — #8', track: 4, owner: 'Swadhin Saraf', epic: 'Smart Market — June LinkedIn (Tue & Thu)', labels: ['linkedin'] },
  { date: '2026-06-30', title: 'LinkedIn post — #9', track: 4, owner: 'Swadhin Saraf', epic: 'Smart Market — June LinkedIn (Tue & Thu)', labels: ['linkedin'] },

  // ===========================================================================
  // TRAFFICURE (track 5) — Instagram posts (Tue/Thu/Sat, Jun 2026)
  // Owner: Plash Saini
  // ===========================================================================
  { date: '2026-06-02', title: 'Instagram post — #1',  track: 5, owner: 'Plash Saini', epic: 'TraffiCure — June Instagram (Tue/Thu/Sat)', labels: ['instagram'] },
  { date: '2026-06-04', title: 'Instagram post — #2',  track: 5, owner: 'Plash Saini', epic: 'TraffiCure — June Instagram (Tue/Thu/Sat)', labels: ['instagram'] },
  { date: '2026-06-06', title: 'Instagram post — #3',  track: 5, owner: 'Plash Saini', epic: 'TraffiCure — June Instagram (Tue/Thu/Sat)', labels: ['instagram'] },
  { date: '2026-06-09', title: 'Instagram post — #4',  track: 5, owner: 'Plash Saini', epic: 'TraffiCure — June Instagram (Tue/Thu/Sat)', labels: ['instagram'] },
  { date: '2026-06-11', title: 'Instagram post — #5',  track: 5, owner: 'Plash Saini', epic: 'TraffiCure — June Instagram (Tue/Thu/Sat)', labels: ['instagram'] },
  { date: '2026-06-13', title: 'Instagram post — #6',  track: 5, owner: 'Plash Saini', epic: 'TraffiCure — June Instagram (Tue/Thu/Sat)', labels: ['instagram'] },
  { date: '2026-06-16', title: 'Instagram post — #7',  track: 5, owner: 'Plash Saini', epic: 'TraffiCure — June Instagram (Tue/Thu/Sat)', labels: ['instagram'] },
  { date: '2026-06-18', title: 'Instagram post — #8',  track: 5, owner: 'Plash Saini', epic: 'TraffiCure — June Instagram (Tue/Thu/Sat)', labels: ['instagram'] },
  { date: '2026-06-20', title: 'Instagram post — #9',  track: 5, owner: 'Plash Saini', epic: 'TraffiCure — June Instagram (Tue/Thu/Sat)', labels: ['instagram'] },
  { date: '2026-06-23', title: 'Instagram post — #10', track: 5, owner: 'Plash Saini', epic: 'TraffiCure — June Instagram (Tue/Thu/Sat)', labels: ['instagram'] },
  { date: '2026-06-25', title: 'Instagram post — #11', track: 5, owner: 'Plash Saini', epic: 'TraffiCure — June Instagram (Tue/Thu/Sat)', labels: ['instagram'] },
  { date: '2026-06-27', title: 'Instagram post — #12', track: 5, owner: 'Plash Saini', epic: 'TraffiCure — June Instagram (Tue/Thu/Sat)', labels: ['instagram'] },
  { date: '2026-06-30', title: 'Instagram post — #13', track: 5, owner: 'Plash Saini', epic: 'TraffiCure — June Instagram (Tue/Thu/Sat)', labels: ['instagram'] },

  // ===========================================================================
  // TRAFFICURE (track 5) — LinkedIn posts (Mon/Wed/Fri, Jun 2026)
  // Owner: Swadhin Saraf
  // ===========================================================================
  { date: '2026-06-01', title: 'LinkedIn post — #1',  track: 5, owner: 'Swadhin Saraf', epic: 'TraffiCure — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-03', title: 'LinkedIn post — #2',  track: 5, owner: 'Swadhin Saraf', epic: 'TraffiCure — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-05', title: 'LinkedIn post — #3',  track: 5, owner: 'Swadhin Saraf', epic: 'TraffiCure — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-08', title: 'LinkedIn post — #4',  track: 5, owner: 'Swadhin Saraf', epic: 'TraffiCure — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-10', title: 'LinkedIn post — #5',  track: 5, owner: 'Swadhin Saraf', epic: 'TraffiCure — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-12', title: 'LinkedIn post — #6',  track: 5, owner: 'Swadhin Saraf', epic: 'TraffiCure — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-15', title: 'LinkedIn post — #7',  track: 5, owner: 'Swadhin Saraf', epic: 'TraffiCure — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-17', title: 'LinkedIn post — #8',  track: 5, owner: 'Swadhin Saraf', epic: 'TraffiCure — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-19', title: 'LinkedIn post — #9',  track: 5, owner: 'Swadhin Saraf', epic: 'TraffiCure — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-22', title: 'LinkedIn post — #10', track: 5, owner: 'Swadhin Saraf', epic: 'TraffiCure — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-24', title: 'LinkedIn post — #11', track: 5, owner: 'Swadhin Saraf', epic: 'TraffiCure — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-26', title: 'LinkedIn post — #12', track: 5, owner: 'Swadhin Saraf', epic: 'TraffiCure — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-29', title: 'LinkedIn post — #13', track: 5, owner: 'Swadhin Saraf', epic: 'TraffiCure — June LinkedIn (MWF)', labels: ['linkedin'] },

  // ===========================================================================
  // UMANG (track 7) — LinkedIn posts (Mon/Wed/Fri, 29 May – 29 Jun 2026)
  // Owner: Swadhin Saraf
  // ===========================================================================
  { date: '2026-05-29', title: 'LinkedIn post — #1',  track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-01', title: 'LinkedIn post — #2',  track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-03', title: 'LinkedIn post — #3',  track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-05', title: 'LinkedIn post — #4',  track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-08', title: 'LinkedIn post — #5',  track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-10', title: 'LinkedIn post — #6',  track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-12', title: 'LinkedIn post — #7',  track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-15', title: 'LinkedIn post — #8',  track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-17', title: 'LinkedIn post — #9',  track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-19', title: 'LinkedIn post — #10', track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-22', title: 'LinkedIn post — #11', track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-24', title: 'LinkedIn post — #12', track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-26', title: 'LinkedIn post — #13', track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },
  { date: '2026-06-29', title: 'LinkedIn post — #14', track: 7, owner: 'Swadhin Saraf', epic: 'Umang — June LinkedIn (MWF)', labels: ['linkedin'] },

  // ===========================================================================
  // RAJEEV SIR (track 6) — LinkedIn posts (Mon & Fri only, 29 May – 29 Jun 2026)
  // Owner: Swadhin Saraf
  // ===========================================================================
  { date: '2026-05-29', title: 'LinkedIn post — #1',  track: 6, owner: 'Swadhin Saraf', epic: 'Rajeev sir — June LinkedIn (Mon & Fri)', labels: ['linkedin'] },
  { date: '2026-06-01', title: 'LinkedIn post — #2',  track: 6, owner: 'Swadhin Saraf', epic: 'Rajeev sir — June LinkedIn (Mon & Fri)', labels: ['linkedin'] },
  { date: '2026-06-05', title: 'LinkedIn post — #3',  track: 6, owner: 'Swadhin Saraf', epic: 'Rajeev sir — June LinkedIn (Mon & Fri)', labels: ['linkedin'] },
  { date: '2026-06-08', title: 'LinkedIn post — #4',  track: 6, owner: 'Swadhin Saraf', epic: 'Rajeev sir — June LinkedIn (Mon & Fri)', labels: ['linkedin'] },
  { date: '2026-06-12', title: 'LinkedIn post — #5',  track: 6, owner: 'Swadhin Saraf', epic: 'Rajeev sir — June LinkedIn (Mon & Fri)', labels: ['linkedin'] },
  { date: '2026-06-15', title: 'LinkedIn post — #6',  track: 6, owner: 'Swadhin Saraf', epic: 'Rajeev sir — June LinkedIn (Mon & Fri)', labels: ['linkedin'] },
  { date: '2026-06-19', title: 'LinkedIn post — #7',  track: 6, owner: 'Swadhin Saraf', epic: 'Rajeev sir — June LinkedIn (Mon & Fri)', labels: ['linkedin'] },
  { date: '2026-06-22', title: 'LinkedIn post — #8',  track: 6, owner: 'Swadhin Saraf', epic: 'Rajeev sir — June LinkedIn (Mon & Fri)', labels: ['linkedin'] },
  { date: '2026-06-26', title: 'LinkedIn post — #9',  track: 6, owner: 'Swadhin Saraf', epic: 'Rajeev sir — June LinkedIn (Mon & Fri)', labels: ['linkedin'] },
  { date: '2026-06-29', title: 'LinkedIn post — #10', track: 6, owner: 'Swadhin Saraf', epic: 'Rajeev sir — June LinkedIn (Mon & Fri)', labels: ['linkedin'] },

  // ===========================================================================
  // GMP (track 2) - June Instagram (MWF, 3 - 29 Jun 2026)
  // Owner: Plash Saini
  // ===========================================================================
  { date: '2026-06-03', title: 'Instagram post - #1',  track: 2, owner: 'Plash Saini', epic: 'GMP - June Instagram (MWF)', labels: ['instagram'] },
  { date: '2026-06-05', title: 'Instagram post - #2',  track: 2, owner: 'Plash Saini', epic: 'GMP - June Instagram (MWF)', labels: ['instagram'] },
  { date: '2026-06-08', title: 'Instagram post - #3',  track: 2, owner: 'Plash Saini', epic: 'GMP - June Instagram (MWF)', labels: ['instagram'] },
  { date: '2026-06-10', title: 'Instagram post - #4',  track: 2, owner: 'Plash Saini', epic: 'GMP - June Instagram (MWF)', labels: ['instagram'] },
  { date: '2026-06-12', title: 'Instagram post - #5',  track: 2, owner: 'Plash Saini', epic: 'GMP - June Instagram (MWF)', labels: ['instagram'] },
  { date: '2026-06-15', title: 'Instagram post - #6',  track: 2, owner: 'Plash Saini', epic: 'GMP - June Instagram (MWF)', labels: ['instagram'] },
  { date: '2026-06-17', title: 'Instagram post - #7',  track: 2, owner: 'Plash Saini', epic: 'GMP - June Instagram (MWF)', labels: ['instagram'] },
  { date: '2026-06-19', title: 'Instagram post - #8',  track: 2, owner: 'Plash Saini', epic: 'GMP - June Instagram (MWF)', labels: ['instagram'] },
  { date: '2026-06-22', title: 'Instagram post - #9',  track: 2, owner: 'Plash Saini', epic: 'GMP - June Instagram (MWF)', labels: ['instagram'] },
  { date: '2026-06-24', title: 'Instagram post - #10', track: 2, owner: 'Plash Saini', epic: 'GMP - June Instagram (MWF)', labels: ['instagram'] },
  { date: '2026-06-26', title: 'Instagram post - #11', track: 2, owner: 'Plash Saini', epic: 'GMP - June Instagram (MWF)', labels: ['instagram'] },
  { date: '2026-06-29', title: 'Instagram post - #12', track: 2, owner: 'Plash Saini', epic: 'GMP - June Instagram (MWF)', labels: ['instagram'] },

  // ===========================================================================
  // P0 PRIORITIES (4 Jun 2026 session with Swadhin)
  // All P0, all surfaced today. Update individual dates as work progresses.
  // ===========================================================================
  { date: '2026-06-04', title: 'Brevo email campaign setup', track: 2, owner: 'Swadhin + Lakshay', epic: 'P0 priorities (4 Jun session)', labels: ['p0', 'email'], priority: 'highest', desc: 'P0 from Swadhin session 4 Jun. Set up Brevo email campaigns for GMP — segment the 31K India contacts, prepare templates, schedule sends. Joint ownership: Swadhin + Lakshay.' },
  { date: '2026-06-04', title: 'Data collation', track: 1, owner: 'Swadhin Saraf', epic: 'P0 priorities (4 Jun session)', labels: ['p0', 'data'], priority: 'highest', desc: 'P0 from Swadhin session 4 Jun. Data collation across products — scope to be defined by Swadhin.' },
  { date: '2026-06-04', title: 'Lepton website content (source of truth)', track: 1, owner: 'Swadhin Saraf', epic: 'P0 priorities (4 Jun session)', labels: ['p0', 'website'], priority: 'highest', desc: 'P0 from Swadhin session 4 Jun. Establish single source of truth for Lepton website content.' },
  { date: '2026-06-04', title: 'LinkedIn post for TraffiCure', track: 5, owner: 'Swadhin Saraf', epic: 'P0 priorities (4 Jun session)', labels: ['p0', 'linkedin'], priority: 'highest', desc: 'P0 from Swadhin session 4 Jun. Write and publish a LinkedIn post for TraffiCure.' },
  { date: '2026-06-04', title: 'Pipedrive: merge duplicates + manage overall', track: 1, owner: 'Swadhin Saraf', epic: 'P0 priorities (4 Jun session)', labels: ['p0', 'pipedrive', 'crm'], priority: 'highest', desc: 'P0 from Swadhin session 4 Jun. Merge duplicate records in Pipedrive and manage the Pipedrive CRM overall.' },
  { date: '2026-06-04', title: 'LinkedIn strategy for Lepton', track: 1, owner: 'Swadhin Saraf', epic: 'P0 priorities (4 Jun session)', labels: ['p0', 'linkedin', 'strategy'], priority: 'highest', desc: 'P0 from Swadhin session 4 Jun. Define and document LinkedIn strategy for Lepton brand.' },

];

// =============================================================================
//  PLAN DATA — third tab on the product calendar ("Plan" view)
// -----------------------------------------------------------------------------
//  Channel-by-channel status for items that may or may not have fixed dates
//  yet. Use this for stakeholder visibility into the marketing plan as a whole.
//
//  STRUCTURE:
//    window.PLAN_DATA = {
//      <track-number>: {
//        title:    'Header for this product\'s plan',
//        intro:    'One-line context shown under the header',
//        sections: [
//          {
//            channel:     '2.1.5',           // category number (your taxonomy)
//            name:        'LinkedIn',         // category name
//            cadence:     'At least 1/week', // frequency / pattern
//            period:      'Ongoing',          // when it applies
//            status:      'active',           // active | in-progress | planned | blocked | skip
//            statusLabel: 'Active',           // human label for the status pill
//            detail:      'Long description ...'
//          },
//          ...
//        ]
//      }
//    }
// =============================================================================

// =============================================================================
//  MANUAL BAUs - for recurring work that doesn't sit on the calendar
//  (e.g. ongoing PR, account management, weekly standups). Auto-derived BAUs
//  from CALENDAR_EVENTS still show alongside these.
//
//  STRUCTURE:
//    window.MANUAL_BAUS = {
//      <personId>: [
//        { title: 'PR for Trafficure', track: 5, cadence: 'Ongoing', detail: '...' }
//      ]
//    }
// =============================================================================
window.MANUAL_BAUS = {
  'chetna': [
    {
      title: 'PR for Trafficure',
      track: 5,
      cadence: 'Ongoing',
      detail: 'PR and outreach for the Trafficure product. Press pitches, media coordination, story development.'
    }
  ]
};

window.PLAN_DATA = {

  // ===========================================================================
  // GMP (track 2)
  // ===========================================================================
  2: {
    title: 'GMP - Marketing Plan',
    intro: 'Channel-by-channel status of the GMP marketing plan. Items here may or may not have specific calendar dates yet.',
    sections: [
      {
        channel: '2.1.1', name: 'Instagram',
        cadence: 'MWF', period: 'June 2026',
        status: 'active', statusLabel: 'Active',
        detail: 'Posts go out Monday, Wednesday, Friday throughout June. See Calendar tab for the specific dates.'
      },
      {
        channel: '2.1.2', name: 'Website',
        cadence: 'Continuous', period: 'Ongoing',
        status: 'in-progress', statusLabel: 'In progress',
        detail: 'New Blogs page being added. Other GMP website content under revamp. Not tracked on calendar.'
      },
      {
        channel: '2.1.3', name: 'Webinar',
        cadence: 'TBD', period: 'Q3 2026',
        status: 'planned', statusLabel: 'Planned',
        detail: 'Topic: "Cut your Google Maps bill 30%". Speaker, date, and promotion plan to be locked.'
      },
      {
        channel: '2.1.4', name: 'Accelerator partnership',
        cadence: 'TBD', period: 'Q3 2026',
        status: 'planned', statusLabel: 'Planned',
        detail: 'Outreach to Sequoia Surge, YC India, Antler, Microsoft for Startups, AngelList. Offer: Lepton-as-default mapping partner for Series A/B portfolio companies.'
      },
      {
        channel: '2.1.5', name: 'LinkedIn',
        cadence: 'At least 1/week', period: 'Ongoing',
        status: 'active', statusLabel: 'Active',
        detail: 'Day not fixed. Minimum one post per week. Goes out when content is ready.'
      },
      {
        channel: '2.1.6', name: 'Case study',
        cadence: 'TBD', period: 'Q3 2026',
        status: 'planned', statusLabel: 'Planned',
        detail: 'Priority queue: Pune TraffiCure (RMI) → Eagle Fleet (Mobility) → Domino\'s / Burger King (QSR) → first closed Solar win → REA India (PropTech) → Tata Digital.'
      },
      {
        channel: '2.1.7', name: 'Accommodations',
        cadence: '-', period: '-',
        status: 'blocked', statusLabel: 'Definition pending',
        detail: 'Category definition to be clarified with marketing leadership.',
        comments: [
          { author: 'Lakshay', date: '2026-06-03', text: 'Blocked: definition of this category is unclear. Need to confirm with marketing leadership what "Accommodations" covers in the GMP context before this can move.' }
        ]
      },
      {
        channel: '2.1.8', name: 'SI partner relations',
        cadence: 'TBD', period: 'Q3 2026',
        status: 'planned', statusLabel: 'Planned',
        detail: 'Targets: TCS, Wipro, L&T, Tech Mahindra, Infosys. Offer: Lepton as the GMP implementation arm for SI-led govt RFPs (state-level citizen apps, Dial 112, e-Governance).'
      },
      {
        channel: '2.1.9', name: 'Inward partners',
        cadence: 'TBD', period: 'Q3 2026',
        status: 'planned', statusLabel: 'Planned',
        detail: 'Partners that refer leads into Lepton: Razorpay, Cashfree, Shiprocket, Delhivery, Unicommerce, accelerator portfolios. Also activate Google Partner Advantage MDF + PPF programs.'
      },
      {
        channel: '2.1.10', name: 'Events',
        cadence: 'Per calendar', period: '2026',
        status: 'planned', statusLabel: 'Planned',
        detail: 'Anchors: Map the Way Mumbai, Map the Way 2026 (location TBD), Lepton X Google GeoSmart Event (year-end). Tradeshows: Renewable Energy India Expo (Sept), Intersolar India (Feb), GITEX Dubai (Oct for MEA seed).'
      },
      {
        channel: '2.1.11', name: 'PR',
        cadence: 'TBD', period: 'Q3 2026',
        status: 'planned', statusLabel: 'Planned',
        detail: 'Pitch Pune TraffiCure story to ET / Mint / Indian Express (urban mobility angle). Census 2027 / Mahakumbh 2028 to Business Standard (govt angle). Founder POV in YourStory / Inc42.'
      },
      {
        channel: '2.1.12', name: 'Email campaigns',
        cadence: 'TBD', period: 'Brevo setup underway',
        status: 'in-progress', statusLabel: 'WIP',
        detail: 'Plan to be defined once Brevo setup for GMP is complete. 31,446 India contacts already loaded in LI-GMP list (#94), ready for segmentation.'
      },
      {
        channel: '2.1.13', name: 'Region-based marketing',
        cadence: 'TBD', period: 'Q3 2026',
        status: 'planned', statusLabel: 'Planned',
        detail: 'India = central (Manish + Umang, regional RBLs for North+East, South, West). Middle East + Bangladesh = Pranav Sharma. Africa OUT of scope for GMP.'
      },
      {
        channel: '2.1.14', name: 'Competitor analysis',
        cadence: 'Quarterly refresh', period: 'Completed',
        status: 'done', statusLabel: 'Done',
        detail: 'Competitor analyses completed for GMP reseller, NetworkAccess, RfMaps, SmartMarket. Refresh on quarterly cadence.'
      }
    ]
  },

  // ===========================================================================
  // SMART MARKET (track 4)
  // ===========================================================================
  4: {
    title: 'Smart Market - Marketing Plan',
    intro: 'Channel-by-channel status of the Smart Market marketing plan. Items here may or may not have specific calendar dates yet.',
    sections: [
      {
        channel: '4.1.1', name: 'Instagram',
        cadence: 'Daily', period: 'June 2026',
        status: 'active', statusLabel: 'Active',
        detail: 'Daily Instagram posts throughout June. See Calendar tab for specific dates. Owner: Plash Saini.'
      },
      {
        channel: '4.1.2', name: 'LinkedIn',
        cadence: 'Tue & Thu', period: 'June 2026',
        status: 'active', statusLabel: 'Active',
        detail: 'LinkedIn posts every Tuesday and Thursday in June. Owner: Swadhin Saraf.'
      },
      {
        channel: '4.1.3', name: 'Email campaigns',
        cadence: 'MWF', period: '3 - 29 Jun 2026',
        status: 'in-progress', statusLabel: 'WIP',
        detail: 'MWF cadence from 3 Jun onwards (pre-3 Jun entries removed). Work in progress. Owner: Swadhin + Lakshay.'
      },
      {
        channel: '4.1.4', name: 'Website',
        cadence: 'Continuous', period: 'Pending launch',
        status: 'in-progress', statusLabel: 'WIP',
        detail: 'Content being finalised and getting ready for launch.'
      },
      {
        channel: '4.1.5', name: 'Events',
        cadence: 'TBD', period: 'TBD',
        status: 'planned', statusLabel: 'Planned',
        detail: 'Events to be planned.'
      },
      {
        channel: '4.1.6', name: 'Competitor analysis',
        cadence: 'Quarterly refresh', period: 'Completed',
        status: 'done', statusLabel: 'Done',
        detail: 'Competitor analysis complete.'
      },
      {
        channel: '4.1.7', name: 'PR',
        cadence: 'TBD', period: 'TBD',
        status: 'planned', statusLabel: 'Planned',
        detail: 'PR plan yet to be defined.'
      },
      {
        channel: '4.1.8', name: 'Twitter',
        cadence: 'TBD', period: 'TBD',
        status: 'planned', statusLabel: 'Planned',
        detail: 'Twitter cadence yet to be defined.'
      },
      {
        channel: '4.1.9', name: 'Custom decks',
        cadence: 'On demand', period: 'Ongoing',
        status: 'in-progress', statusLabel: 'WIP',
        detail: 'Custom decks being built as required.'
      },
      {
        channel: '4.1.10', name: 'Case studies',
        cadence: 'TBD', period: 'Pending sales input',
        status: 'blocked', statusLabel: 'Pending sales',
        detail: 'Case studies to come from sales team. Marketing awaiting customer references and content.'
      },
      {
        channel: '4.1.11', name: 'Product demo videos',
        cadence: 'Ongoing', period: 'In progress',
        status: 'in-progress', statusLabel: 'WIP',
        detail: 'Product demo videos in production.'
      },
      {
        channel: '4.1.12', name: 'Logo finalisation',
        cadence: '-', period: 'In progress',
        status: 'in-progress', statusLabel: 'WIP',
        detail: 'Logo finalisation work in progress.'
      },
      {
        channel: '4.1.13', name: 'Blogs',
        cadence: 'At least 1/week', period: 'Ongoing',
        status: 'active', statusLabel: 'Active',
        detail: 'Minimum one blog post per week.'
      },
      {
        channel: '4.1.14', name: 'Newsletters',
        cadence: 'TBD', period: 'Pending website launch',
        status: 'blocked', statusLabel: 'Pending website',
        detail: 'Newsletter strategy to be planned once the website is live.'
      },
      {
        channel: '4.1.15', name: 'Usage videos',
        cadence: 'TBD', period: 'TBD',
        status: 'planned', statusLabel: 'Planned',
        detail: 'Usage videos plan yet to be defined.'
      }
    ]
  },

  // ===========================================================================
  // TRAFFICURE (track 5)
  // ===========================================================================
  5: {
    title: 'TraffiCure - Marketing Plan',
    intro: 'Channel-by-channel status of the TraffiCure marketing plan. Items here may or may not have specific calendar dates yet.',
    sections: [
      {
        channel: '5.1.1', name: 'Instagram',
        cadence: 'Tue / Thu / Sat', period: 'June 2026',
        status: 'active', statusLabel: 'Active',
        detail: 'Instagram posts on Tuesday, Thursday, Saturday throughout June. See Calendar tab for specific dates. Owner: Plash Saini.'
      },
      {
        channel: '5.1.2', name: 'LinkedIn',
        cadence: 'MWF', period: 'June 2026',
        status: 'active', statusLabel: 'Active',
        detail: 'LinkedIn posts Mon/Wed/Fri throughout June. Owner: Swadhin Saraf.'
      },
      {
        channel: '5.1.3', name: 'Email campaigns',
        cadence: 'TBD', period: 'TBD',
        status: 'blocked', statusLabel: 'Status pending',
        detail: 'Status, cadence, and ownership to be confirmed. Does TraffiCure run its own email campaigns or piggyback on GMP / Smart Market?'
      },
      {
        channel: '5.1.4', name: 'Website',
        cadence: 'Continuous', period: 'Minor changes underway',
        status: 'in-progress', statusLabel: 'WIP',
        detail: 'TraffiCure website needs some changes (not a full revamp). Tracked under LMR-193. Owner: Swadhin Saraf.'
      },
      {
        channel: '5.1.5', name: 'Events',
        cadence: 'TBD', period: 'TBD',
        status: 'blocked', statusLabel: 'Status pending',
        detail: 'No TraffiCure-specific events tracked yet. Confirm planned events / industry expos / govt summits.'
      },
      {
        channel: '5.1.6', name: 'PR',
        cadence: 'Ongoing', period: 'Active',
        status: 'active', statusLabel: 'Active',
        detail: 'PR and outreach for TraffiCure. Lead angle: Pune Traffic Police pilot (8+ independent press articles already published). Owner: Chetna Bhatia.'
      },
      {
        channel: '5.1.7', name: 'Twitter / X',
        cadence: 'Ongoing', period: 'In progress',
        status: 'in-progress', statusLabel: 'WIP',
        detail: 'Twitter / X presence underway. Twitter bots issue resolved.'
      },
      {
        channel: '5.1.8', name: 'Custom decks',
        cadence: 'On demand', period: 'Ongoing',
        status: 'in-progress', statusLabel: 'WIP',
        detail: 'Lepton Partnership Deck (TraffiCure) exists in Drive. Custom decks updated as required.'
      },
      {
        channel: '5.1.9', name: 'Case studies',
        cadence: 'TBD', period: 'In progress',
        status: 'in-progress', statusLabel: 'WIP',
        detail: 'Pune Traffic Police TraffiCure deployment story is the lead case study. Avg speed up 20 to 26.8 km/h (+34%) in 45-day pilot. Formal case study write-up pending.'
      },
      {
        channel: '5.1.10', name: 'Product demo videos',
        cadence: 'TBD', period: 'TBD',
        status: 'tbd', statusLabel: 'TBD',
        detail: 'Product demo video production to be decided.'
      },
      {
        channel: '5.1.11', name: 'Blogs',
        cadence: 'TBD', period: 'TBD',
        status: 'tbd', statusLabel: 'TBD',
        detail: 'Blog cadence and topics for TraffiCure to be decided.'
      },
      {
        channel: '5.1.12', name: 'Newsletters',
        cadence: 'TBD', period: 'TBD',
        status: 'tbd', statusLabel: 'TBD',
        detail: 'Newsletter strategy to be decided.'
      },
      {
        channel: '5.1.13', name: 'SEO',
        cadence: 'Ongoing', period: 'Strategy in progress',
        status: 'in-progress', statusLabel: 'WIP',
        detail: 'TraffiCure SEO strategy in progress (LMR-194). SEO-optimised content topics to be given to Umang (LMR-182). Owner: Swadhin Saraf.'
      },
      {
        channel: '5.1.14', name: 'Wikipedia',
        cadence: 'One-time', period: 'Drafting',
        status: 'planned', statusLabel: 'Planned',
        detail: 'Wikipedia page for TraffiCure (LMR-196). Notability evidence ready: 8+ independent press articles covering the Pune Traffic Police pilot. Drafting next via Articles for Creation (AfC). Owner: Lakshay Chachra.'
      },
      {
        channel: '5.1.15', name: 'International outreach',
        cadence: 'TBD', period: 'TBD',
        status: 'planned', statusLabel: 'Planned',
        detail: 'TraffiCure International Reachout Strategy (LMR-197) — geos and approach to be defined. Owner: Swadhin Saraf.'
      }
    ]
  }

};
