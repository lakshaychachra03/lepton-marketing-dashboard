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
  // SMART MARKET (track 4) — Email Marketing (Mon/Wed/Fri, 29 May – 29 Jun 2026)
  // Owner: Swadhin + Lakshay
  // ===========================================================================
  { date: '2026-05-29', title: 'Email campaign send — #1',  track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },
  { date: '2026-06-01', title: 'Email campaign send — #2',  track: 4, owner: 'Swadhin + Lakshay', epic: 'Smart Market — Email Marketing (MWF)', labels: ['email'], priority: 'high' },
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

];
