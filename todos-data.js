// =============================================================================
//  LEPTON MARKETING — TEAM TO-DOS  (manual)
// -----------------------------------------------------------------------------
//  This is the ONLY file to edit to change the to-dos shown under each person
//  on the dashboard. To-dos are set HERE by hand — they are NOT pulled from Jira.
//  Overwrite this file and push to GitHub — Vercel auto-deploys.
//
//  STRUCTURE:
//    window.TEAM_TODOS = { <personId>: [ {todo}, {todo}, ... ] }
//    personId is one of:  swadhin | lakshay | chetna | plash
//
//  EACH TO-DO:
//    title    'Short task name'        REQUIRED
//    status   'todo' | 'prog' | 'done' (default 'todo')  — prog = in progress
//    due      'YYYY-MM-DD'             OPTIONAL — deadline flag (turns red if overdue)
//    jira     'LMR-83'                 OPTIONAL — links this to-do to a Jira ticket.
//                                                 Leave '' for a normal to-do (no Jira).
//    comments [ { t:'note text', by:'Name', when:'9 AM' }, ... ]   OPTIONAL
// =============================================================================

window.TEAM_TODOS = {

  swadhin: [
    { title: 'Shoot one Smart Market reel', status: 'prog', due: '2026-06-15', jira: '', comments: [] },
  ],

  lakshay: [
    { title: 'Update Jira priorities for the week', status: 'prog', due: '2026-06-15', jira: '', comments: [] },
  ],

  chetna: [
    { title: 'Draft LinkedIn post #5', status: 'todo', due: '2026-06-15', jira: '', comments: [] },
  ],

  plash: [
    { title: 'Design Smart Market reveal creative', status: 'prog', due: '2026-06-15', jira: '', comments: [] },
  ],

};
