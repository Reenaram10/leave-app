import React from "react";
import { fmtDate } from "../data/seed.js";
import { Stamp, TypePill, EmptyState } from "./Shared.jsx";

export default function Overview({ user, myRequests, pendingCount, approvedThisYear, goRequest }) {
  const b = user.balance;
  return (
    <div>
      <div className="page-head">
        <div>
          <div className="eyebrow">
            Ledger entry — {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
          <h1 className="page-title">Welcome back, {user.name.split(" ")[0]}</h1>
          <div className="page-desc">Here's where your time-off balance stands.</div>
        </div>
        <button className="btn-brass" onClick={goRequest}>
          + Request leave
        </button>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <div className="accent" style={{ background: "#2E5C8A" }}></div>
          <div className="stat-label">Annual leave</div>
          <div className="stat-num">{b.annual}</div>
          <div className="stat-sub">days remaining</div>
        </div>
        <div className="stat-card">
          <div className="accent" style={{ background: "var(--rust)" }}></div>
          <div className="stat-label">Sick leave</div>
          <div className="stat-num">{b.sick}</div>
          <div className="stat-sub">days remaining</div>
        </div>
        <div className="stat-card">
          <div className="accent" style={{ background: "var(--moss)" }}></div>
          <div className="stat-label">Casual leave</div>
          <div className="stat-num">{b.casual}</div>
          <div className="stat-sub">days remaining</div>
        </div>
        <div className="stat-card">
          <div className="accent" style={{ background: "var(--brass)" }}></div>
          <div className="stat-label">Awaiting review</div>
          <div className="stat-num">{pendingCount}</div>
          <div className="stat-sub">{approvedThisYear} days approved this year</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Recent activity</h3>
          <span className="count-badge">{myRequests.length} total</span>
        </div>
        <div className="panel-body">
          {myRequests.length === 0 ? (
            <EmptyState glyph="✎" title="No entries yet" sub="Your leave history will appear here once you submit a request." />
          ) : (
            <>
              <div className="ledger-row head">
                <div>Type</div>
                <div>Dates</div>
                <div>Days</div>
                <div>Applied</div>
                <div>Status</div>
                <div></div>
              </div>
              {myRequests.slice(0, 4).map((r) => (
                <div className="ledger-row" key={r.id}>
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
                  <div></div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
