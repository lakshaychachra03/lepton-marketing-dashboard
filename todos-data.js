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

  swadhin: {
    '2026-06-15': [
      { title: 'Lepton LinkedIn post', status: 'done', due: '', jira: '', comments: [] },
      { title: 'Google Workspace accounts to be removed', status: 'done', due: '', jira: '', comments: [] },
      { title: 'Lepton LinkedIn post', status: 'done', due: '', jira: '', comments: [] },
      { title: 'Website feedback', status: 'prog', due: '', jira: '', comments: [] },
      { title: 'Umang LinkedIn', status: 'shifted', due: '', jira: '', comments: [{ t: 'Shifted to 16 Jun', by: 'Lakshay', when: '' }] },
      { title: 'TraffiCure LinkedIn', status: 'shifted', due: '', jira: '', comments: [{ t: 'Shifted to 16 Jun', by: 'Lakshay', when: '' }] },
    ],
    '2026-06-16': [
      { title: 'Umang LinkedIn', status: 'done', due: '', jira: '', comments: [{ t: 'Shifted from 15 Jun', by: 'Lakshay', when: '' }] },
      { title: 'TraffiCure LinkedIn', status: 'done', due: '', jira: '', comments: [{ t: 'Shifted from 15 Jun', by: 'Lakshay', when: '' }] },
    ],
    '2026-06-17': [
      { title: "TraffiCure post — Delhi's proposed 4 km elevated corridor (newspaper report)", status: 'todo', due: '', jira: 'LMR-215', comments: [{ t: 'P0 priority. Owner: Swadhin · Co-owner: Chetna', by: 'Lakshay', when: '' }] },
      { title: 'Lepton LinkedIn post', status: 'todo', due: '', jira: '', comments: [] },
      { title: 'Rajeev sir LinkedIn post', status: 'todo', due: '', jira: '', comments: [] },
      { title: "Clean up Neo360 code + check ex-employees' email backups for hints (coordinate with Padam)", status: 'todo', due: '', jira: '', comments: [] },
      { title: 'Coordinate with Manish for GMP content', status: 'todo', due: '', jira: '', comments: [] },
      { title: 'Coordinate with Nikhil for SmartMarket content', status: 'todo', due: '', jira: '', comments: [] },
    ],
    '2026-07-16': [
      { title: 'Run the webinar end to end', status: 'done', due: '2026-07-16', jira: 'LMR-247', comments: [] },
      { title: 'Call with Satya at 5 PM and set the agenda', status: 'done', due: '2026-07-16', jira: 'LMR-248', comments: [] },
      { title: 'Study the deals and map out the full sales pipeline', status: 'todo', due: '2026-07-16', jira: 'LMR-249', comments: [] },
      { title: 'Email Pradeep regarding IMC', status: 'done', due: '2026-07-16', jira: 'LMR-250', comments: [] },
      { title: 'Get the CGD event update from Chetna', status: 'todo', due: '2026-07-16', jira: 'LMR-251', comments: [] },
      { title: 'Get the Indonesia event update', status: 'todo', due: '2026-07-16', jira: 'LMR-252', comments: [] },
      { title: 'Get a post from Chetna on how the event went', status: 'todo', due: '2026-07-16', jira: 'LMR-253', comments: [] },
      { title: 'Send two post-event emails (thank-you + follow-up to non-attendees)', status: 'done', due: '2026-07-16', jira: 'LMR-254', comments: [] },
      { title: 'Get corporate deck update from Plash and review with Rajeev sir', status: 'todo', due: '2026-07-16', jira: 'LMR-255', comments: [] },
    ],
    '2026-07-17': [
      { title: 'Create the MBP 3.0 report', status: 'done', due: '2026-07-17', jira: 'LMR-268', comments: [] },
      { title: 'LinkedIn post - Umang', status: 'done', due: '2026-07-17', jira: 'LMR-269', comments: [] },
      { title: 'LinkedIn post - TraffiCure', status: 'todo', due: '2026-07-17', jira: 'LMR-270', comments: [] },
      { title: 'LinkedIn post - Rajeev sir', status: 'todo', due: '2026-07-17', jira: 'LMR-271', comments: [] },
      { title: 'Charter plan', status: 'todo', due: '2026-07-17', jira: 'LMR-272', comments: [] },
      { title: 'Apollo - add 1K credits', status: 'done', due: '2026-07-17', jira: 'LMR-273', comments: [] },
      { title: 'TraffiCure new blog', status: 'done', due: '2026-07-17', jira: 'LMR-274', comments: [] },
      { title: 'Pipedrive deal study', status: 'shifted', due: '2026-07-17', jira: 'LMR-249', comments: [{ t: 'Shifted to 22 Jul', by: 'Lakshay', when: '' }] },
      { title: 'NetworkAccess webinar', status: 'shifted', due: '2026-07-17', jira: 'LMR-275', comments: [{ t: 'Shifted to 22 Jul', by: 'Lakshay', when: '' }] },
      { title: 'Email inbox scraping of sales', status: 'done', due: '2026-07-17', jira: 'LMR-276', comments: [{ t: 'Cancelled / de-scoped', by: 'Lakshay', when: '' }] },
    ],
    '2026-07-22': [
      { title: 'Pipedrive deal study', status: 'prog', due: '2026-07-22', jira: 'LMR-249', comments: [{ t: 'Shifted from 17 Jul', by: 'Lakshay', when: '' }] },
      { title: 'NetworkAccess webinar (Chetna to ask Swadhin)', status: 'prog', due: '2026-07-22', jira: 'LMR-275', comments: [{ t: 'Shifted from 17 Jul', by: 'Lakshay', when: '' }] },
    ],
  },

  lakshay: {
    '2026-06-15': [
      { title: 'Update Jira + marketing dashboard & fix changes', status: 'done', due: '', jira: '', comments: [] },
      { title: 'Run testing task + final verdict to Swadhin', status: 'done', due: '', jira: 'LMR-208', comments: [] },
      { title: 'Email plan for NetworkAccess', status: 'done', due: '', jira: '', comments: [] },
      { title: 'Brevo email campaigns', status: 'shifted', due: '', jira: '', comments: [{ t: 'Shifted to 16 Jun', by: 'Lakshay', when: '' }] },
    ],
    '2026-06-16': [
      { title: 'Brevo email campaigns to go out', status: 'todo', due: '', jira: '', comments: [{ t: 'Shifted from 15 Jun', by: 'Lakshay', when: '' }] },
      { title: 'Testing — clean list & give final verdict to Swadhin', status: 'todo', due: '', jira: 'LMR-208', comments: [] },
    ],
    '2026-06-22': [
      { title: 'Sit with Deepinder for NA feedback', status: 'todo', due: '2026-06-22', jira: '', comments: [] },
      { title: 'Give SmartMarket email plan to Swadhin', status: 'todo', due: '2026-06-22', jira: '', comments: [] },
      { title: 'Give GMP email plan to Swadhin', status: 'todo', due: '2026-06-22', jira: '', comments: [] },
      { title: 'Send out Middle East campaigns for NA', status: 'todo', due: '2026-06-22', jira: '', comments: [] },
    ],
    '2026-06-29': [
      { title: 'ME NA campaign', status: 'todo', due: '2026-06-29', jira: '', comments: [] },
      { title: 'Africa NA campaign', status: 'todo', due: '2026-06-29', jira: '', comments: [] },
      { title: 'Google Cloud partner data for ME and Bangladesh', status: 'todo', due: '2026-06-29', jira: '', comments: [] },
      { title: 'Images refinement — first draft for Website', status: 'todo', due: '2026-06-29', jira: '', comments: [] },
    ],
    '2026-07-16': [
      { title: 'Meet Sita maam regarding Uttarakhand campaigns', status: 'todo', due: '2026-07-16', jira: 'LMR-244', comments: [] },
      { title: 'Enrich railway data for Amit sir', status: 'todo', due: '2026-07-16', jira: 'LMR-245', comments: [] },
      { title: 'Complete the marketing team proof memo (since Swadhin took over)', status: 'prog', due: '2026-07-16', jira: 'LMR-10', comments: [] },
      { title: 'Run an email campaign for NetworkAccess', status: 'todo', due: '2026-07-16', jira: 'LMR-246', comments: [] },
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
    '2026-06-17': [
      { title: "TraffiCure post — Delhi's proposed 4 km elevated corridor (newspaper report)", status: 'todo', due: '', jira: 'LMR-215', comments: [{ t: 'P0 priority. Co-owner: Chetna · Owner: Swadhin', by: 'Lakshay', when: '' }] },
    ],
    '2026-07-02': [
      { title: 'Crunchbase — Lepton (recurring updation)', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Crunchbase — Rajeev sir (recurring updation)', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — Lepton', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — TraffiCure', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — NetworkAccess', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — SmartMarket', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Identify', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'AmbitionBox — recurring', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Glassdoor — recurring', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
    ],
    '2026-07-03': [
      { title: 'Crunchbase — Lepton (recurring updation)', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Crunchbase — Rajeev sir (recurring updation)', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — Lepton', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — TraffiCure', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — NetworkAccess', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — SmartMarket', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Identify', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'AmbitionBox — recurring', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Glassdoor — recurring', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
    ],
    '2026-07-04': [
      { title: 'Crunchbase — Lepton (recurring updation)', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Crunchbase — Rajeev sir (recurring updation)', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — Lepton', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — TraffiCure', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — NetworkAccess', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — SmartMarket', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Identify', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'AmbitionBox — recurring', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Glassdoor — recurring', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
    ],
    '2026-07-05': [
      { title: 'Crunchbase — Lepton (recurring updation)', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Crunchbase — Rajeev sir (recurring updation)', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — Lepton', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — TraffiCure', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — NetworkAccess', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — SmartMarket', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Identify', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'AmbitionBox — recurring', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Glassdoor — recurring', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
    ],
    '2026-07-06': [
      { title: 'Crunchbase — Lepton (recurring updation)', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Crunchbase — Rajeev sir (recurring updation)', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — Lepton', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — TraffiCure', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — NetworkAccess', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — SmartMarket', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Identify', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'AmbitionBox — recurring', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Glassdoor — recurring', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
    ],
    '2026-07-07': [
      { title: 'Crunchbase — Lepton (recurring updation)', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Crunchbase — Rajeev sir (recurring updation)', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — Lepton', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — TraffiCure', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — NetworkAccess', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'G2 & Capterra — SmartMarket', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Identify', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'AmbitionBox — recurring', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
      { title: 'Glassdoor — recurring', status: 'todo', due: '2026-07-07', jira: '', comments: [] },
    ],
    '2026-07-16': [
      { title: 'Post the MBP 3.0 carousel on LinkedIn', status: 'todo', due: '2026-07-16', jira: 'LMR-259', comments: [] },
      { title: 'Update Crunchbase profiles (Umang, Amit Garg, Manish Gupta, Satyajeet, Sita, Aditya, Rohit Sharma, Nisha Bhugra)', status: 'todo', due: '2026-07-16', jira: 'LMR-260', comments: [] },
      { title: 'Coordinate payments for City Gas and IMC', status: 'todo', due: '2026-07-16', jira: 'LMR-261', comments: [] },
      { title: 'Prepare for the City Gas event', status: 'todo', due: '2026-07-16', jira: 'LMR-262', comments: [] },
      { title: 'Follow up on the Indonesia event', status: 'todo', due: '2026-07-16', jira: 'LMR-263', comments: [] },
      { title: 'Follow up on TEPC payment', status: 'todo', due: '2026-07-16', jira: 'LMR-264', comments: [] },
      { title: "Address validation and shipping coordination for TraffiCure (with Sita ma'am)", status: 'todo', due: '2026-07-16', jira: 'LMR-265', comments: [] },
      { title: 'Follow up on Convergence Expo', status: 'todo', due: '2026-07-16', jira: 'LMR-266', comments: [] },
    ],
    '2026-07-21': [
      { title: 'TraffiCure - Transport & Traffic Tech: new event findings', status: 'todo', due: '2026-07-21', jira: 'LMR-280', comments: [] },
      { title: 'Coordinate IMC foreign delegates and City Gas event', status: 'todo', due: '2026-07-21', jira: 'LMR-281', comments: [] },
      { title: 'LinkedIn use-case carousel: content + design (with Plash) and post caption', status: 'todo', due: '2026-07-21', jira: 'LMR-282', comments: [] },
      { title: 'Booth content for City Gas event (all walls)', status: 'todo', due: '2026-07-21', jira: 'LMR-283', comments: [] },
      { title: "NA webinar: coordinate with Sita ma'am for VSIS case study (Partner + Dialog) and speaker", status: 'todo', due: '2026-07-21', jira: 'LMR-284', comments: [] },
      { title: 'Initial email and WhatsApp blast', status: 'todo', due: '2026-07-21', jira: 'LMR-285', comments: [] },
      { title: 'Region-based email communication', status: 'todo', due: '2026-07-21', jira: 'LMR-286', comments: [] },
      { title: 'Glassdoor, AmbitionBox & Google Reviews: connect with Shashvat', status: 'todo', due: '2026-07-21', jira: 'LMR-287', comments: [] },
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
    '2026-06-17': [
      { title: "Post new carousel on TraffiCure's IG page", status: 'todo', due: '', jira: '', comments: [{ t: 'Shifted from 16 Jun', by: 'Lakshay', when: '' }] },
      { title: 'Event cards compilation', status: 'todo', due: '', jira: '', comments: [] },
      { title: 'TraffiCure confession carousel — design', status: 'todo', due: '', jira: '', comments: [] },
      { title: 'Talking head video — workflow identification', status: 'todo', due: '', jira: '', comments: [] },
    ],
    '2026-06-22': [
      { title: "Post TraffiCure's carousel on Instagram", status: 'todo', due: '2026-06-22', jira: 'LMR-226', comments: [] },
      { title: 'Research about Instagram B2B page growing strategy', status: 'todo', due: '2026-06-22', jira: 'LMR-224', comments: [] },
      { title: 'NetworkAccess explainer videos creation', status: 'todo', due: '2026-06-22', jira: 'LMR-225', comments: [] },
    ],
    '2026-07-16': [
      { title: 'Build the narrative for the SmartMarket webpage', status: 'todo', due: '2026-07-16', jira: 'LMR-256', comments: [] },
      { title: 'Produce the TraffiCure feature video', status: 'todo', due: '2026-07-16', jira: 'LMR-257', comments: [] },
      { title: "Produce Deepinder's video (if he shares the material today)", status: 'todo', due: '2026-07-16', jira: 'LMR-258', comments: [] },
    ],
    '2026-07-17': [
      { title: 'SmartMarket webpage finalization', status: 'todo', due: '2026-07-17', jira: 'LMR-256', comments: [] },
      { title: 'TraffiCure feature videos production', status: 'todo', due: '2026-07-17', jira: 'LMR-257', comments: [] },
      { title: "Make TraffiCure cover letter for Sita ma'am", status: 'todo', due: '2026-07-17', jira: 'LMR-267', comments: [] },
      { title: 'Connect with Deependra for DepthSure video', status: 'todo', due: '2026-07-17', jira: 'LMR-258', comments: [] },
    ],
    '2026-07-22': [
      { title: 'Add captions in TraffiCure videos', status: 'todo', due: '2026-07-22', jira: 'LMR-288', comments: [] },
      { title: 'Start TraffiCure assets requested by Umang', status: 'todo', due: '2026-07-22', jira: 'LMR-289', comments: [] },
      { title: 'Start refinement in Lepton corporate deck', status: 'todo', due: '2026-07-22', jira: 'LMR-290', comments: [] },
      { title: 'Present a story and content for the SmartMarket product page', status: 'todo', due: '2026-07-22', jira: 'LMR-291', comments: [] },
    ],
  },

};
