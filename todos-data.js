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
//
//  EXAMPLE (for reference — copy this shape when adding real to-dos):
//    swadhin: [
//      { title: 'Shoot one Smart Market reel', status: 'prog', due: '2026-06-15', jira: '', comments: [] },
//    ],
// =============================================================================

window.TEAM_TODOS = {

  swadhin: [],

  lakshay: [
    { title: 'Update Jira + marketing dashboard & fix changes', status: 'todo', due: '', jira: '', comments: [] },
    { title: 'Run testing task + final verdict to Swadhin', status: 'todo', due: '', jira: 'LMR-208', comments: [] },
    { title: 'Learn GA4 + GSC; work on TraffiCure strategy (with Swadhin)', status: 'todo', due: '', jira: '', comments: [] },
    { title: 'Brevo email campaigns', status: 'todo', due: '', jira: '', comments: [] },
  ],

  chetna: [
    { title: 'GMP webinar plan', status: 'todo', due: '2026-06-15', jira: 'LMR-191', comments: [] },
    { title: 'IRSE event cost + overall analysis', status: 'todo', due: '2026-06-15', jira: '', comments: [] },
    { title: 'Municipalika — TraffiCure event: initial findings & research', status: 'todo', due: '2026-06-15', jira: '', comments: [] },
    { title: "IMC'26 — initial findings & opportunities", status: 'todo', due: '2026-06-15', jira: '', comments: [] },
    { title: '[BAU] Call PR people to learn about Organic PR', status: 'todo', due: '', jira: '', comments: [] },
    { title: '[BAU] Find Sponsored PR opportunities', status: 'todo', due: '', jira: '', comments: [] },
  ],

  plash: [
    { title: 'NetworkAccess carousel — content creation', status: 'todo', due: '', jira: '', comments: [] },
    { title: 'TraffiCure carousel — designing', status: 'todo', due: '', jira: '', comments: [] },
    { title: 'SmartMarket IG & LinkedIn page', status: 'todo', due: '', jira: '', comments: [] },
  ],

};
