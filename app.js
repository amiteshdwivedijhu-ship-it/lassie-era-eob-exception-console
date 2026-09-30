/* Lassie-style ERA/EOB exception queue. Synthetic demo data only. */

"use strict";

const fmt = (n) => "$" + n.toFixed(2);
const today = "Sep 30, 2026";

const CASES = [
  {
    id: "c1",
    status: "review",
    practice: "Shoreline Dental Care",
    pms: "Dentrix",
    goLive: "12 days",
    title: "EFT amount does not match EOB total",
    type: "Underpayment",
    payer: "Delta Dental",
    eobDate: "Sep 24, 2026",
    eraRef: "ERA-20260924-88412",
    eftRef: "06337715",
    eftDate: "Sep 26, 2026",
    eftAmount: 412.35,
    claim: "CLM-0348821",
    patient: "Maya Okafor",
    memberId: "DDP-000-552-771",
    dos: "Sep 9, 2026",
    eobTotal: 448.20,
    variance: -35.85,
    lines: [
      { idx: "L1", code: "D0120", desc: "Periodic oral evaluation", billed: 65.0, allowed: 54.0, paid: 54.0, remark: "" },
      { idx: "L2", code: "D1110", desc: "Prophylaxis, adult", billed: 120.0, allowed: 92.0, paid: 92.0, remark: "" },
      { idx: "L3", code: "D0220", desc: "Intraoral periapical, first film", billed: 34.0, allowed: 27.5, paid: 27.5, remark: "" },
      { idx: "L4", code: "D0272", desc: "Bitewings, two films", billed: 60.0, allowed: 41.5, paid: 41.5, remark: "" },
      { idx: "L5", code: "D2391", desc: "Resin-based composite, one surface, posterior", billed: 180.0, allowed: 144.0, paid: 144.0, remark: "" },
      { idx: "L6", code: "D4910", desc: "Periodontal maintenance", billed: 95.0, allowed: 89.2, paid: 89.2, remark: "" }
    ],
    proposal: 'Post EFT <b>' + fmt(412.35) + '</b> to CLM-0348821, citing lines L1-L6. All 6 lines match the claim. The EFT is <b>' + fmt(35.85) + ' short</b> of the EOB total, so the agent paused before posting.',
    chips: ["6 of 6 lines match claim", "EFT -$35.85 vs EOB total", "2nd mismatch in 14 days", "Go-live +12 days"],
    paused: 'Lassie\u2019s tie-out rule: an EFT never posts until it matches its EOB. This EFT is <b>' + fmt(35.85) + ' short</b> of the EOB total. Shoreline is 12 days past go-live and this is the 2nd short EFT in 14 days, so the agent flags it as a possible enrollment or bank-feed issue, not a payer quirk.',
    book: { practice: "Shoreline Dental Care", base: 18329.95 },
    gates: [
      {
        id: "post",
        label: "Post as proposed",
        tone: "blue",
        note: "Post " + fmt(412.35) + " as received. Log the " + fmt(35.85) + " variance as informational.",
        outcome: {
          pill: "posted",
          pillLabel: "Posted",
          posted: 412.35,
          headline: 'Posted EFT <b>' + fmt(412.35) + '</b> to CLM-0348821 as received. Variance ' + fmt(35.85) + ' logged as informational.',
          next: "None. Variance closed as informational."
        }
      },
      {
        id: "adjust",
        label: "Adjust and post",
        tone: "green",
        recommended: true,
        note: "Post " + fmt(412.35) + " and open a " + fmt(35.85) + " follow-up task with Delta Dental (day 20).",
        outcome: {
          pill: "posted",
          pillLabel: "Posted",
          posted: 412.35,
          headline: 'Posted EFT <b>' + fmt(412.35) + '</b> to CLM-0348821. Follow-up task opened: Delta Dental shortfall <b>' + fmt(35.85) + '</b>, due day 20 of this posting cycle.',
          next: "Delta Dental shortfall " + fmt(35.85) + " - follow-up due day 20"
        }
      },
      {
        id: "hold",
        label: "Hold for practice",
        tone: "slate",
        note: "Keep posting blocked. Ask: has a second Delta Dental EFT landed in the bank feed?",
        outcome: {
          pill: "held",
          pillLabel: "Held",
          posted: 0,
          headline: 'Posting stays <b>blocked</b> for CLM-0348821. Nothing moved to the books.',
          questions: [
            "Has a second Delta Dental EFT landed in the bank feed since Sep 26?",
            "Check the EFT Notifications folder before the Sep 30 close.",
            "If no second EFT appears by day 15, escalate to payer follow-up."
          ],
          next: "Office manager check: second Delta Dental EFT by Sep 30"
        }
      },
      {
        id: "escalate",
        label: "Escalate to payer follow-up",
        tone: "indigo",
        note: "Do not post. Agent schedules a payer check on the " + fmt(35.85) + " today.",
        outcome: {
          pill: "escalated",
          pillLabel: "Escalated",
          posted: 0,
          headline: 'Nothing posted. Agent opened a <b>payer follow-up</b> on the ' + fmt(35.85) + ' shortfall: check Delta Dental EFT history and claim 0348821 reconciliation.',
          next: "Payer follow-up on " + fmt(35.85) + " shortfall (today)"
        }
      }
    ]
  },
  {
    id: "c2",
    status: "review",
    practice: "Shoreline Dental Care",
    pms: "Dentrix",
    goLive: "12 days",
    title: "Write-off amount is ambiguous",
    type: "Ambiguous write-off",
    payer: "Delta Dental",
    eobDate: "Sep 22, 2026",
    eraRef: "ERA-20260922-77104",
    eftRef: "06194428",
    eftDate: "Sep 23, 2026",
    eftAmount: 245.0,
    claim: "CLM-0341266",
    patient: "Theo Alvarez",
    memberId: "DDP-000-556-204",
    dos: "Sep 3, 2026",
    eobTotal: 245.0,
    variance: 0,
    lines: [
      { idx: "L1", code: "D0120", desc: "Periodic oral evaluation", billed: 65.0, allowed: 54.0, paid: 54.0, remark: "" },
      { idx: "L2", code: "D1110", desc: "Prophylaxis, adult", billed: 120.0, allowed: 92.0, paid: 92.0, remark: "" },
      { idx: "L3", code: "D2391", desc: "Resin-based composite, one surface, posterior", billed: 180.0, allowed: 99.0, paid: 99.0,
        remark: 'CO-45 - Charge exceeds fee schedule. Adjustment ' + fmt(81.0) + '.', flag: true }
    ],
    proposal: 'Post <b>' + fmt(245.0) + '</b> to CLM-0341266 and write off ' + fmt(81.0) + ' per CO-45. The agent paused because the write-off disagrees with Shoreline\u2019s Dentrix fee schedule, which lists D2391 at ' + fmt(144.0) + ' allowed.',
    chips: ["CO-45 adjustment " + fmt(81.0), "Fee schedule shows " + fmt(144.0), "Difference " + fmt(45.0)],
    paused: 'Ambiguous write-off. The EOB allows D2391 at ' + fmt(99.0) + ' and takes ' + fmt(81.0) + ' as a contractual adjustment. Shoreline\u2019s own fee schedule lists ' + fmt(144.0) + '. If the fee schedule is right, ' + fmt(45.0) + ' is under-allowed. If the EOB is right, the fee schedule is stale. <b>The agent cannot decide which contract wins.</b>',
    book: { practice: "Shoreline Dental Care", base: 18329.95 },
    gates: [
      {
        id: "post",
        label: "Post as proposed",
        tone: "blue",
        note: "Post " + fmt(245.0) + " and write off " + fmt(81.0) + " per CO-45 as stated.",
        outcome: {
          pill: "posted",
          pillLabel: "Posted",
          posted: 245.0,
          headline: 'Posted <b>' + fmt(245.0) + '</b> to CLM-0341266 with the ' + fmt(81.0) + ' CO-45 write-off as proposed.',
          next: "Fee schedule review: D2391 allowance"
        }
      },
      {
        id: "adjust",
        label: "Adjust and post",
        tone: "green",
        note: "Post " + fmt(245.0) + ", write off " + fmt(36.0) + ", and open a " + fmt(45.0) + " follow-up with Delta Dental on the allowance.",
        outcome: {
          pill: "posted",
          pillLabel: "Posted",
          posted: 245.0,
          headline: 'Posted <b>' + fmt(245.0) + '</b> to CLM-0341266. Write-off set to ' + fmt(36.0) + '; follow-up opened for Delta Dental to confirm the D2391 allowance of ' + fmt(45.0) + '.',
          next: "Delta Dental allowance check " + fmt(45.0)
        }
      },
      {
        id: "hold",
        label: "Hold for practice",
        tone: "slate",
        recommended: true,
        note: "Keep posting blocked until the office manager answers three questions.",
        outcome: {
          pill: "held",
          pillLabel: "Held",
          posted: 0,
          headline: 'Posting stays <b>blocked</b> for CLM-0341266. The office manager must answer before the write-off moves.',
          questions: [
            "What does your Delta Dental contract list for D2391? Dentrix shows " + fmt(144.0) + " allowed.",
            "Was there a plan change on Sep 1 for Theo Alvarez?",
            "Reply by Sep 26 to keep the September close on time."
          ],
          next: "Office manager answers 3 questions by Sep 26"
        }
      },
      {
        id: "escalate",
        label: "Escalate to payer follow-up",
        tone: "indigo",
        note: "Do not post. Agent asks Delta Dental to confirm the D2391 allowance.",
        outcome: {
          pill: "escalated",
          pillLabel: "Escalated",
          posted: 0,
          headline: 'Nothing posted. Agent opened a <b>payer follow-up</b>: confirm D2391 allowance and the ' + fmt(45.0) + ' difference for CLM-0341266.',
          next: "Payer follow-up: D2391 allowance"
        }
      }
    ]
  },
  {
    id: "c3",
    status: "review",
    practice: "Harborview Dental",
    pms: "Eaglesoft",
    goLive: "31 days",
    title: "Denied line with an open appeal window",
    type: "Denial - needs appeal",
    payer: "Cigna Dental",
    eobDate: "Sep 27, 2026",
    eraRef: "ERA-20260927-33018",
    eftRef: "11820345",
    eftDate: "Sep 28, 2026",
    eftAmount: 110.0,
    claim: "CLM-0415582",
    patient: "Priya Nair",
    memberId: "CGN-008-441-920",
    dos: "Sep 1, 2026",
    eobTotal: 110.0,
    variance: 0,
    lines: [
      { idx: "L1", code: "D0150", desc: "Comprehensive oral evaluation", billed: 75.0, allowed: 60.0, paid: 60.0, remark: "" },
      { idx: "L2", code: "D0274", desc: "Bitewings, four films", billed: 70.0, allowed: 50.0, paid: 50.0, remark: "" },
      { idx: "L3", code: "D2950", desc: "Core buildup, including pins", billed: 150.0, allowed: 0.0, paid: 0.0,
        remark: 'CO-30 - Dental necessity not documented. ' + fmt(150.0) + ' not paid.', flag: true }
    ],
    proposal: 'Post <b>' + fmt(110.0) + '</b> to CLM-0415582 (lines L1-L2) and hold D2950. The CO-30 denial needs X-ray documentation; the periapical image is already in the chart, so the agent proposes an appeal, not a write-off.',
    chips: ["D2950 " + fmt(150.0) + " denied", "CO-30 - documentation", "Appeal window closes Oct 24"],
    paused: 'Denied line with a live appeal window. Cigna denied D2950 for missing documentation. The chart has the periapical image; the question is who files the appeal and when. <b>Today is Sep 30; the appeal window closes Oct 24.</b>',
    book: { practice: "Harborview Dental", base: 17201.5 },
    gates: [
      {
        id: "post",
        label: "Post as proposed",
        tone: "blue",
        note: "Post " + fmt(110.0) + "; leave D2950 " + fmt(150.0) + " pending in the claim.",
        outcome: {
          pill: "posted",
          pillLabel: "Posted",
          posted: 110.0,
          headline: 'Posted <b>' + fmt(110.0) + '</b> to CLM-0415582. D2950 stays pending at ' + fmt(150.0) + ' with no appeal scheduled.',
          next: "Review D2950 before the appeal window closes"
        }
      },
      {
        id: "adjust",
        label: "Adjust and post",
        tone: "green",
        note: "Post " + fmt(110.0) + " and attach the periapical image to the D2950 record for office review.",
        outcome: {
          pill: "posted",
          pillLabel: "Posted",
          posted: 110.0,
          headline: 'Posted <b>' + fmt(110.0) + '</b> to CLM-0415582. Periapical image attached to the D2950 record, ready for office review.',
          next: "Office reviews D2950 appeal packet"
        }
      },
      {
        id: "hold",
        label: "Hold for practice",
        tone: "slate",
        note: "Do not post D2950. Office manager decides appeal vs write-off.",
        outcome: {
          pill: "held",
          pillLabel: "Held",
          posted: 110.0,
          headline: 'Posted <b>' + fmt(110.0) + '</b> for lines L1-L2. D2950 held: the office manager decides appeal or write-off before Oct 24.',
          questions: [
            "Do you hope to collect on D2950, or write it off?",
            "The chart X-ray is ready to attach if you appeal.",
            "Decision due before Oct 24, or the appeal window closes."
          ],
          next: "Office decision on D2950 by Oct 24"
        }
      },
      {
        id: "escalate",
        label: "Escalate to payer follow-up",
        tone: "indigo",
        recommended: true,
        note: "Post " + fmt(110.0) + " now and queue the D2950 appeal with the chart X-ray.",
        outcome: {
          pill: "escalated",
          pillLabel: "Escalated",
          posted: 110.0,
          headline: 'Posted <b>' + fmt(110.0) + '</b> and queued the <b>D2950 appeal</b> with the periapical image attached. Status stub: Cigna CLM-0415582 - denied CO-30 - appeal due Oct 24.',
          next: "Cigna appeal D2950 due Oct 24"
        }
      }
    ]
  }
];

const state = {
  current: null,
  openExceptions: CASES.length
};

const $ = (sel) => document.querySelector(sel);

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

function pill(status, label) {
  const map = { review: "pill-review", posted: "pill-posted", held: "pill-held", escalated: "pill-escalated" };
  return el("span", "pill " + map[status], label);
}

function renderQueue() {
  const list = $("#queue-list");
  list.textContent = "";
  CASES.forEach((c) => {
    const li = el("li");
    const btn = el("button", "queue-item");
    btn.type = "button";
    const top = el("div", "q-top");
    top.appendChild(el("span", "q-practice", c.practice));
    top.appendChild(pill(c.status, c.status === "review" ? "Needs review" : (c.status === "posted" ? "Posted" : (c.status === "held" ? "Held" : "Escalated"))));
    btn.appendChild(top);
    btn.appendChild(el("div", "q-title", c.title));
    const meta = el("div", "q-meta");
    const metaMono = el("span", "mono", c.payer + "  " + fmt(c.eftAmount) + "  " + c.eftDate);
    meta.appendChild(metaMono);
    if (c.status !== "review") {
      meta.appendChild(el("span", "resolved-tag", "Resolved " + (c.status === "posted" ? "as Posted" : c.status === "held" ? "as Held" : "as Escalated")));
    }
    btn.appendChild(meta);
    btn.addEventListener("click", () => openCase(c.id));
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function chRow(label, value, cls) {
  const wrap = el("div", "ch-row");
  const v = el("p", "ch-value" + (cls ? " " + cls : ""));
  v.innerHTML = value;
  if (label) {
    wrap.appendChild(el("span", "ch-label", label));
  }
  wrap.appendChild(v);
  return wrap;
}

function renderLines(c) {
  const grid = el("div", "eob-grid");
  c.lines.forEach((l) => {
    const row = el("div", "eob-line");
    const head = el("div", "el-head");
    head.appendChild(el("span", "el-idx", l.idx));
    head.appendChild(el("span", "el-code", l.code));
    head.appendChild(el("span", "el-desc", l.desc));
    row.appendChild(head);
    const amts = el("div", "el-amounts");
    [["Billed", l.billed], ["Allowed", l.allowed], ["Paid", l.paid]].forEach((pair) => {
      const wrap = el("div");
      wrap.appendChild(el("span", "", pair[0]));
      const val = el("span", "mono", fmt(pair[1]));
      wrap.appendChild(val);
      amts.appendChild(wrap);
    });
    row.appendChild(amts);
    if (l.remark) {
      row.appendChild(el("p", "remark " + (l.flag ? "remark-flag" : "remark"), l.remark));
    }
    grid.appendChild(row);
  });
  const sum = el("div", "summary-row");
  [["EOB total paid", c.eobTotal], ["EFT received", c.eftAmount]].forEach((pair) => {
    const wrap = el("div");
    wrap.appendChild(el("span", "", pair[0]));
    wrap.appendChild(el("span", "mono", fmt(pair[1])));
    sum.appendChild(wrap);
  });
  const vwrap = el("div");
  vwrap.appendChild(el("span", "", "Variance"));
  const v = el("span", "mono" + (c.variance ? " variance" : ""), c.variance ? fmt(c.variance) : "$0.00");
  vwrap.appendChild(v);
  sum.appendChild(vwrap);
  grid.appendChild(sum);
  const prop = el("div", "proposal");
  prop.appendChild(el("strong", "", "Agent proposes: "));
  const propText = el("span", "");
  propText.innerHTML = c.proposal;
  prop.appendChild(propText);
  const chips = el("div", "chips");
  c.chips.forEach((t) => chips.appendChild(el("span", "chip", t)));
  prop.appendChild(chips);
  grid.appendChild(prop);
  return grid;
}

function renderHeader(c) {
  const h = el("div", "case-header");
  h.appendChild(chRow(null, "<strong>" + c.practice + "</strong>  -  " + c.pms + "  -  go-live " + c.goLive));
  h.appendChild(chRow("Payer / ERA", '<span class="mono">' + c.payer + "</span>  " + c.eobDate + "  ERA " + c.eraRef));
  h.appendChild(chRow("EFT", '<span class="mono">' + fmt(c.eftAmount) + "</span>  ref " + c.eftRef + "  received " + c.eftDate));
  h.appendChild(chRow("Claim stub", '<span class="mono">' + c.claim + "</span>  patient " + c.patient + "  member " + c.memberId + "  DOS " + c.dos));
  return h;
}

function renderGate(c) {
  const paused = el("div", "paused-note");
  paused.appendChild(el("strong", "", "Why Lassie paused: "));
  const pText = el("span", "");
  pText.innerHTML = c.paused;
  paused.appendChild(pText);
  $("#paused-note").textContent = "";
  $("#paused-note").appendChild(paused);

  const list = el("ol", "gate-list");
  c.gates.forEach((g) => {
    const li = el("li");
    const btn = el("button", "gate" + (g.tone === "green" ? " gate-green" : ""));
    btn.type = "button";
    btn.appendChild(el("span", "", g.label));
    if (g.recommended) btn.appendChild(el("span", "suggested-tag", "Suggested"));
    btn.appendChild(el("span", "gate-note", g.note));
    btn.addEventListener("click", () => resolve(c.id, g.id));
    li.appendChild(btn);
    list.appendChild(li);
  });
  $("#gate").textContent = "";
  $("#gate").appendChild(list);
}

function renderImpact() {
  const box = el("div", "impact");
  const head = el("p", "", "No decision yet. Posting is blocked until you pick a gate.");
  box.appendChild(head);
  const cells = el("div", "impact-cells");
  cells.appendChild(impactCell("Posted by this decision", "nothing yet", null));
  cells.appendChild(impactCell("Exceptions open", state.openExceptions + " of " + CASES.length, null));
  cells.appendChild(impactCell("Next claim action", "Waiting on the human gate", null));
  box.appendChild(cells);
  $("#impact").textContent = "";
  $("#impact").appendChild(box);
}

function impactCell(label, value, mono) {
  const cell = el("div", "impact-cell");
  cell.appendChild(el("p", "ic-label", label));
  const v = el("p", "ic-value");
  if (mono) v.appendChild(el("span", "mono", value));
  else v.textContent = value;
  cell.appendChild(v);
  return cell;
}

function renderOutcome(c, g) {
  const o = g.outcome;
  const box = el("div", "outcome");
  const line = el("p", "");
  line.innerHTML = o.headline;
  box.appendChild(line);
  if (o.questions) {
    const qs = el("ul", "held-questions");
    o.questions.forEach((q) => qs.appendChild(el("li", "", q)));
    box.appendChild(qs);
  }
  const next = el("p", "impact-rule");
  next.appendChild(el("span", "", "Next claim action: "));
  next.appendChild(el("span", "mono", o.next));
  box.appendChild(next);
  $("#gate").textContent = "";
  $("#gate").appendChild(box);
  $("#gate").appendChild(el("p", "resolved-note", "Decision recorded. Use Reset demo at the bottom to run another gate."));
}

function renderImpactAfter(c, g) {
  const o = g.outcome;
  const box = el("div", "impact");
  const line = el("p", "", "The books moved with your decision:");
  box.appendChild(line);
  const cells = el("div", "impact-cells");
  const postedValue = o.posted > 0 ? "+" + fmt(o.posted) : "$0.00";
  const postedSub = o.posted > 0 ? c.book.practice + " " + monthLabel() + " posted: " + fmt(c.book.base + o.posted) : "Nothing posted";
  cells.appendChild(impactCell("Posted by this decision", postedValue + "  " + postedSub, postedValue.indexOf("$") === 0));
  cells.appendChild(impactCell("Exceptions open", state.openExceptions + " of " + CASES.length, null));
  cells.appendChild(impactCell("Next claim action", o.next, null));
  box.appendChild(cells);
  $("#impact").textContent = "";
  $("#impact").appendChild(box);
}

function monthLabel() {
  return "September";
}

function openCase(id) {
  const c = CASES.find((x) => x.id === id);
  state.current = c;
  $("#packet-area").classList.remove("hidden");
  $("#case-header").textContent = "";
  $("#case-header").appendChild(renderHeader(c));
  $("#eob-lines").textContent = "";
  $("#eob-lines").appendChild(renderLines(c));
  if (c.status === "review") {
    renderGate(c);
    renderImpact();
  } else {
    $("#paused-note").textContent = "";
    const res = el("div", "paused-note");
    res.appendChild(el("strong", "", "Already resolved: "));
    res.appendChild(el("span", "", "This exception was " + { posted: "Posted", held: "Held", escalated: "Escalated" }[c.status] + " earlier. Reset the demo to run another gate."));
    $("#paused-note").appendChild(res);
    const g = c.gates.find((x) => x.chosen);
    if (g) renderOutcome(c, g);
    renderImpactAfter(c, g);
  }
  $("#case-title").focus();
  announce("Opened " + c.title + " for " + c.practice);
  window.scrollTo({ top: $("#case-title").getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
}

function resolve(caseId, gateId) {
  const c = CASES.find((x) => x.id === caseId);
  const g = c.gates.find((x) => x.id === gateId);
  const o = g.outcome;
  c.status = o.pill;
  g.chosen = true;
  state.openExceptions = Math.max(0, CASES.filter((x) => x.status === "review").length);
  renderQueue();
  renderOutcome(c, g);
  renderImpactAfter(c, g);
  announce(c.practice + ": " + g.label + ". " + o.headline);
  window.scrollTo({ top: $("#gate").getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
}

function announce(msg) {
  $("#live").textContent = msg;
}

function reset() {
  CASES.forEach((c) => {
    c.status = "review";
    c.gates.forEach((g) => delete g.chosen);
  });
  state.current = null;
  state.openExceptions = CASES.length;
  $("#packet-area").classList.add("hidden");
  renderQueue();
  renderImpact();
  announce("Demo reset. All exceptions back to Needs review.");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

$("#reset").addEventListener("click", reset);

renderQueue();
renderImpact();
announce("Lassie synthetic exception queue loaded.");