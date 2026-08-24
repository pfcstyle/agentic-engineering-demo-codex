const incidents = [
  { id: "INC-4821", title: "Payment API latency", severity: "Critical", status: "Investigating", owner: "Maya Chen", service: "Checkout", updated: "2 min ago" },
  { id: "INC-4818", title: "Mobile sign-in failures", severity: "High", status: "Mitigating", owner: "Ravi Shah", service: "Identity", updated: "12 min ago" },
  { id: "INC-4811", title: "Analytics event backlog", severity: "Medium", status: "Monitoring", owner: "Unassigned", service: "Data Platform", updated: "32 min ago" },
  { id: "INC-4797", title: "Legacy webhook retries", severity: "Low", status: "Closed", owner: "Nora Park", service: "Integrations", updated: "Yesterday" }
];

let role = "Lead";
let query = "";
let severity = "All";
let mode = "Queue";
let selected = null;

const app = document.querySelector("#app");

function visibleIncidents() {
  return incidents.filter((incident) =>
    (severity === "All" || incident.severity === severity) &&
    `${incident.id} ${incident.title} ${incident.service}`.toLowerCase().includes(query.toLowerCase())
  );
}

function render() {
  if (mode === "Loading") {
    app.innerHTML = `<section class="state"><div class="spinner"></div><h1>Loading incident queue</h1><p>Synchronizing on-call activity and service health.</p></section>`;
    return;
  }
  if (mode === "Error") {
    app.innerHTML = `<section class="state"><span class="error-mark">!</span><h1>Queue unavailable</h1><p>We could not load incident data. Your filters have not been lost.</p><button id="retry">Retry</button></section>`;
    document.querySelector("#retry").onclick = () => { mode = "Queue"; render(); };
    return;
  }

  const rows = visibleIncidents();
  app.innerHTML = `
    <header>
      <div><p class="eyebrow">OPERATIONS / LIVE TRIAGE</p><h1>Incident Triage</h1></div>
      <div class="header-actions"><label>Role <select id="role"><option>Lead</option><option>Analyst</option></select></label><button id="state">Simulate state</button></div>
    </header>
    <section class="metrics"><div><span>Open incidents</span><strong>3</strong></div><div><span>Critical</span><strong class="critical-text">1</strong></div><div><span>Median acknowledgement</span><strong>04m</strong></div></section>
    <section class="toolbar"><input id="search" aria-label="Search incidents" placeholder="Search incident, service, or ID" value="${query}" /><select id="severity" aria-label="Filter severity"><option>All</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></section>
    <section class="queue"><table><thead><tr><th>Incident</th><th>Severity</th><th>Status</th><th>Owner</th><th>Updated</th></tr></thead><tbody>${rows.length ? rows.map((incident) => `<tr data-id="${incident.id}"><td><strong>${incident.id}</strong><span>${incident.title} · ${incident.service}</span></td><td><b class="badge severity-${incident.severity.toLowerCase()}">${incident.severity}</b></td><td><b class="badge status">${incident.status}</b></td><td>${incident.owner}</td><td>${incident.updated}</td></tr>`).join("") : `<tr><td colspan="5" class="empty">No incidents match these filters.</td></tr>`}</tbody></table></section>
    ${selected ? drawer(selected) : ""}
  `;
  document.querySelector("#role").value = role;
  document.querySelector("#severity").value = severity;
  document.querySelector("#role").onchange = (event) => { role = event.target.value; render(); };
  document.querySelector("#search").oninput = (event) => { query = event.target.value; render(); };
  document.querySelector("#severity").onchange = (event) => { severity = event.target.value; render(); };
  document.querySelector("#state").onclick = () => { mode = mode === "Queue" ? "Loading" : mode === "Loading" ? "Error" : "Queue"; render(); };
  document.querySelectorAll("tr[data-id]").forEach((row) => row.onclick = () => { selected = incidents.find((item) => item.id === row.dataset.id); render(); });
  document.querySelector("#close")?.addEventListener("click", () => { selected = null; render(); });
  document.querySelector("#owner")?.addEventListener("change", (event) => { selected.owner = event.target.value; render(); });
}

function drawer(incident) {
  const canAssign = role === "Lead" && incident.status !== "Closed";
  return `<aside class="drawer"><button id="close" aria-label="Close details">×</button><p class="eyebrow">${incident.id}</p><h2>${incident.title}</h2><div class="drawer-badges"><b class="badge severity-${incident.severity.toLowerCase()}">${incident.severity}</b><b class="badge status">${incident.status}</b></div><dl><dt>Service</dt><dd>${incident.service}</dd><dt>Last updated</dt><dd>${incident.updated}</dd></dl><label>Incident owner<select id="owner" ${canAssign ? "" : "disabled"}><option ${incident.owner === "Maya Chen" ? "selected" : ""}>Maya Chen</option><option ${incident.owner === "Ravi Shah" ? "selected" : ""}>Ravi Shah</option><option ${incident.owner === "Nora Park" ? "selected" : ""}>Nora Park</option><option ${incident.owner === "Unassigned" ? "selected" : ""}>Unassigned</option></select></label><p class="drawer-note">${canAssign ? "Leads can assign owners while the incident remains open." : incident.status === "Closed" ? "Closed incidents are read-only." : "Analysts can inspect incidents but cannot assign owners."}</p></aside>`;
}

render();
