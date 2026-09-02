import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import DecisionModal from "./DecisionModal.jsx";
import { fmtDate } from "../data/seed.js";
import { Stamp, TypePill, EmptyState } from "./Shared.jsx";

export default function AdminPortal({ user, requests, setRequests, users, onLogout }) {
  const [active, setActive] = useState("queue");
  const [modal, setModal] = useState(null); // { req, action }

  const pending = requests.filter((r) => r.status === "pending").sort((a, b) => a.appliedOn.localeCompare(b.appliedOn));
  const allSorted = [...requests].sort((a, b) => b.appliedOn.localeCompare(a.appliedOn));
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const rejectedCount = requests.filter((r) => r.status === "rejected").length;
  const employees = users.filter((u) => u.role === "employee");

  function userOf(id) {
    return users.find((u) => u.id === id);
  }

  function decide(req, action, note) {
    setRequests(
      requests.map((r) =>
        r.id === req.id
          ? {
              ...r,
              status: action,
              decisionNote: note || (action === "approved" ? "Approved — enjoy the time off." : "Rejected."),
            }
          : r
      )
    );
    setModal(null);
  }

  const items = [
    { key: "queue", label: "Approval queue", icon: "◆" },
    { key: "all", label: "All requests", icon: "☰" },
    { key: "team", label: "Team directory", icon: "▤" },
  ];

  return (
    <div className="app-shell">
      <Sidebar user={user} active={active} setActive={setActive} onLogout={onLogout} items={items} />
      <div className="main">
        {active === "queue" && (
          <div>
            <div className="page-head">
              <div>
                <div className="eyebrow">Admin console</div>
                <h1 className="page-title">Approval queue</h1>
                <div className="page-desc">Requests waiting on your stamp.</div>
              </div>
            </div>

            <div className="stat-row">
              <div className="stat-card">
                <div className="accent" style={{ background: "var(--brass)" }}></div>
                <div className="stat-label">Pending</div>
                <div className="stat-num">{pending.length}</div>
                <div className="stat-sub">need a decision</div>
              </div>
              <div className="stat-card">
                <div className="accent" style={{ background: "var(--moss)" }}></div>
                <div className="stat-label">Approved</div>
                <div className="stat-num">{approvedCount}</div>
                <div className="stat-sub">all time</div>
              </div>
              <div className="stat-card">
                <div className="accent" style={{ background: "var(--rust)" }}></div>
                <div className="stat-label">Rejected</div>
                <div className="stat-num">{rejectedCount}</div>
                <div className="stat-sub">all time</div>
              </div>
              <div className="stat-card">
                <div className="accent" style={{ background: "#2E5C8A" }}></div>
                <div className="stat-label">Team size</div>
                <div className="stat-num">{employees.length}</div>
                <div className="stat-sub">active employees</div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Waiting for review</h3>
                <span className="count-badge">{pending.length} pending</span>
              </div>
              <div className="panel-body">
                {pending.length === 0 ? (
                  <EmptyState glyph="✓" title="Queue is clear" sub="No leave requests are waiting on you right now." />
                ) : (
                  <>
                    <div className="ledger-row head">
                      <div>Employee</div>
                      <div>Type</div>
                      <div>Dates</div>
                      <div>Days</div>
                      <div>Reason</div>
                      <div>Decision</div>
                    </div>
                    {pending.map((r) => {
                      const emp = userOf(r.employeeId);
                      return (
                        <div className="ledger-row" key={r.id}>
                          <div className="emp-cell">
                            <div className="emp-av">{emp.initials}</div>
                            <div>
                              <div className="emp-name">{emp.name}</div>
                              <div className="emp-dept">{emp.department}</div>
                            </div>
                          </div>
                          <div>
                            <TypePill type={r.type} />
                          </div>
                          <div className="dates-cell">
                            {fmtDate(r.startDate)} → {fmtDate(r.endDate)}
                          </div>
                          <div className="days-cell">{r.days}d</div>
                          <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{r.reason}</div>
                          <div className="row-actions">
                            <button
                              className="icon-btn approve"
                              title="Approve"
                              onClick={() => setModal({ req: r, action: "approved" })}
                            >
                              ✓
                            </button>
                            <button
                              className="icon-btn reject"
                              title="Reject"
                              onClick={() => setModal({ req: r, action: "rejected" })}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {active === "all" && (
          <div>
            <div className="page-head">
              <div>
                <div className="eyebrow">Full register</div>
                <h1 className="page-title">All requests</h1>
                <div className="page-desc">Every entry filed across the team, most recent first.</div>
              </div>
            </div>
            <div className="panel">
              <div className="panel-body">
                <div className="ledger-row head">
                  <div>Employee</div>
                  <div>Type</div>
                  <div>Dates</div>
                  <div>Days</div>
                  <div>Applied</div>
                  <div>Status</div>
                </div>
                {allSorted.map((r) => {
                  const emp = userOf(r.employeeId);
                  return (
                    <div className="ledger-row" key={r.id}>
                      <div className="emp-cell">
                        <div className="emp-av">{emp.initials}</div>
                        <div>
                          <div className="emp-name">{emp.name}</div>
                          <div className="emp-dept">{emp.department}</div>
                        </div>
                      </div>
                      <div>
                        <TypePill type={r.type} />
                      </div>
                      <div className="dates-cell">
                        {fmtDate(r.startDate)} → {fmtDate(r.endDate)}
                      </div>
                      <div className="days-cell">{r.days}d</div>
                      <div className="dates-cell">{fmtDate(r.appliedOn)}</div>
                      <div>
                        <Stamp status={r.status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {active === "team" && (
          <div>
            <div className="page-head">
              <div>
                <div className="eyebrow">Roster</div>
                <h1 className="page-title">Team directory</h1>
                <div className="page-desc">Current balances across the team.</div>
              </div>
            </div>
            <div className="panel">
              <div className="dir-grid">
                {employees.map((emp) => (
                  <div className="dir-card" key={emp.id}>
                    <div className="top">
                      <div className="emp-av" style={{ background: "var(--brass-dark)" }}>
                        {emp.initials}
                      </div>
                      <div>
                        <div className="dname">{emp.name}</div>
                        <div className="ddept">{emp.department}</div>
                      </div>
                    </div>
                    <div className="dir-bal">
                      <div className="b">
                        <div className="bn">{emp.balance.annual}</div>
                        <div className="bl">Annual</div>
                      </div>
                      <div className="b">
                        <div className="bn">{emp.balance.sick}</div>
                        <div className="bl">Sick</div>
                      </div>
                      <div className="b">
                        <div className="bn">{emp.balance.casual}</div>
                        <div className="bl">Casual</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {modal && (
        <DecisionModal
          req={modal.req}
          action={modal.action}
          employee={userOf(modal.req.employeeId)}
          onCancel={() => setModal(null)}
          onConfirm={(note) => decide(modal.req, modal.action, note)}
        />
      )}
    </div>
  );
}
