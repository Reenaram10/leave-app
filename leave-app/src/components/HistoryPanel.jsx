import React, { useState } from "react";
import { fmtDate } from "../data/seed.js";
import { Stamp, TypePill, EmptyState } from "./Shared.jsx";

export default function HistoryPanel({ myRequests }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? myRequests : myRequests.filter((r) => r.status === filter);

  return (
    <div>
      <div className="page-head">
        <div>
          <div className="eyebrow">Full register</div>
          <h1 className="page-title">My requests</h1>
          <div className="page-desc">Every entry you've filed, stamped by your admin.</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 14px",
              borderRadius: 20,
              fontSize: 12.5,
              fontWeight: 600,
              textTransform: "capitalize",
              border: filter === f ? "1.5px solid var(--ink)" : "1.5px solid var(--line)",
              background: filter === f ? "var(--ink)" : "var(--paper-2)",
              color: filter === f ? "#fff" : "var(--ink-soft)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="panel">
        <div className="panel-body">
          {filtered.length === 0 ? (
            <EmptyState glyph="☰" title="Nothing here" sub="No requests match this filter yet." />
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
              {filtered.map((r) => (
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
                    {r.decisionNote && (
                      <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 5, maxWidth: 220 }}>
                        {r.decisionNote}
                      </div>
                    )}
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
