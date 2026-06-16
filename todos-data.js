// =============================================================================
//  LEPTON MARKETING — TEAM TO-DOS  (manual, date-wise)
// -----------------------------------------------------------------------------
//  To-dos are stored PER PERSON, PER DAY, so the dashboard keeps a running
//  daily history. Set HERE by hand — NOT pulled from Jira. Overwrite + push.
//
//  STRUCTURE:
//    window.TEAM_TODOS = { <personId>: { 'YYYY-MM-DD': [ {todo}, ... ] } }
//    personId is one of:  swadhin | lakshay | chetna | plash
//
//  EACH TO-DO:
//    title    'Short task name'        REQUIRED
//    status   'todo' | 'prog' | 'done' (default 'todo')  — prog = in progress
//    due      'YYYY-MM-DD'             OPTIONAL — deadline flag (red if overdue)
//    jira     'LMR-83'                 OPTIONAL — links to a Jira ticket ('' = none)
//    comments [ { t:'note', by:'Name', when:'9 AM' }, ... ]   OPTIONAL
//
//  Notes:
//   - If a person edits a day on the dashboard, that saved version (database)
//     takes over for that person + day; this file is the fallback.
//   - To shift an unfinished to-do to the next day, copy it into that day below.
// =============================================================================

window.TEAM_TODOS = {

  swadhin: {},

  lakshay: {
    '2026-06-15': [
      { title: 'Update Jira + marketing dashboard & fix changes', status: 'todo', due: '', jira: '', comments: [] },
      { title: 'Run testing task + final verdict to Swadhin', status: 'todo', due: '', jira: 'LMR-208', comments: [] },
      { title: 'Learn GA4 + GSC; work on TraffiCure strategy (with Swadhin)', status: 'todo', due: '', jira: '', comments: [] },
      { title: 'Brevo email campaigns', status: 'todo', due: '', jira: '', comments: [] },
    ],
    '2026-06-16': [
      { title: 'Update Jira + marketing dashboard & fix changes', status: 'todo', due: '', jira: '', comments: [] },
      { title: 'Run testing task + final verdict to Swadhin', status: 'todo', due: '', jira: 'LMR-208', comments: [] },
      { title: 'Brevo email campaigns to go out', status: 'todo', due: '', jira: '', comments: [] },
    ],
  },

  chetna: {
    '2026-06-15': [
      { title: 'GMP webinar plan', status: 'todo', due: '2026-06-15', jira: 'LMR-191', comments: [] },
      { title: 'IRSE event cost + overall analysis', status: 'todo', due: '2026-06-15', jira: '', comments: [] },
      { title: 'Municipalika — TraffiCure event: initial findings & research', status: 'todo', due: '2026-06-15', jira: '', comments: [] },
      { title: "IMC'26 — initial findings & opportunities", status: 'todo', due: '2026-06-15', jira: '', comments: [] },
      { title: '[BAU] Call PR people to learn about Organic PR', status: 'todo', due: '', jira: '', comments: [] },
      { title: '[BAU] Find Sponsored PR opportunities', status: 'todo', due: '', jira: '', comments: [] },
    ],
    '2026-06-16': [
      { title: 'GMP webinar plan', status: 'todo', due: '', jira: 'LMR-191', comments: [] },
      { title: 'IRSE event cost + overall analysis', status: 'todo', due: '', jira: '', comments: [] },
      { title: 'Municipalika — TraffiCure event: initial findings & research', status: 'todo', due: '', jira: '', comments: [] },
      { title: "IMC'26 — initial findings & opportunities", status: 'todo', due: '', jira: '', comments: [] },
      { title: '[BAU] Call PR people to learn about Organic PR', status: 'todo', due: '', jira: '', comments: [] },
      { title: '[BAU] Find Sponsored PR opportunities', status: 'todo', due: '', jira: '', comments: [] },
    ],
  },

  plash: {
    '2026-06-15': [
      { title: 'NetworkAccess carousel — content creation', status: 'prog', due: '', jira: '', comments: [] },
      { title: 'TraffiCure carousel — designing', status: 'done', due: '', jira: '', comments: [] },
      { title: 'SmartMarket IG & LinkedIn page', status: 'done', due: '', jira: '', comments: [] },
    ],
    '2026-06-16': [
      { title: 'GMP API One Pager — refine & submit', status: 'todo', due: '', jira: '', comments: [] },
      { title: 'NetworkAccess carousels — designing & compiling', status: 'todo', due: '', jira: '', comments: [] },
      { title: "TraffiCure's carousel — designing & compiling", status: 'todo', due: '', jira: '', comments: [] },
      { title: "Repurpose TraffiCure's carousel on LinkedIn", status: 'todo', due: '', jira: '', comments: [] },
      { title: "Post new carousel on TraffiCure's IG page", status: 'todo', due: '', jira: '', comments: [] },
    ],
  },

};
