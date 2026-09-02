import React, { useState } from "react";
import { LEAVE_TYPES, daysBetween } from "../data/seed.js";

export default function RequestForm({ user, requests, setRequests, onDone }) {
  const [type, setType] = useState("annual");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [msg, setMsg] = useState(null);

  const days = startDate && endDate && endDate >= startDate ? daysBetween(startDate, endDate) : 0;
  const balanceLeft = user.balance[type];

  function submit(e) {
    e.preventDefault();
    if (!startDate || !endDate) {
      setMsg({ ok: false, text: "Pick a start and end date." });
      return;
    }
    if (endDate < startDate) {
      setMsg({ ok: false, text: "End date can't be before the start date." });
      return;
    }
    if (!reason.trim()) {
      setMsg({ ok: false, text: "Add a short reason for the record." });
      return;
    }
    if (days > balanceLeft) {
      setMsg({ ok: false, text: `Only ${balanceLeft} ${LEAVE_TYPES[type].label.toLowerCase()} day(s) left this cycle.` });
      return;
    }

    const newReq = {
      id: "r-" + Math.random().toString(36).slice(2, 9),
      employeeId: user.id,
      type,
      startDate,
      endDate,
      days,
      reason: reason.trim(),
      status: "pending",
      appliedOn: new Date().toISOString().slice(0, 10),
    };
    setRequests([newReq, ...requests]);
    setMsg({ ok: true, text: "Request filed. Your admin has been notified." });
    setStartDate("");
    setEndDate("");
    setReason("");
    setTimeout(onDone, 900);
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <div className="eyebrow">New entry</div>
          <h1 className="page-title">Request leave</h1>
          <div className="page-desc">File a new request — it lands directly in your admin's approval queue.</div>
        </div>
      </div>

      <div className="balance-strip">
        {Object.keys(LEAVE_TYPES).map((k) => (
          <div
            className="balance-chip"
            key={k}
            style={{ borderColor: type === k ? LEAVE_TYPES[k].color : "var(--line-soft)" }}
          >
            <div className="n" style={{ color: LEAVE_TYPES[k].color }}>
              {user.balance[k]}
            </div>
            <div className="l">{LEAVE_TYPES[k].label} left</div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-body pad">
          <form onSubmit={submit}>
            <div className="form-grid">
              <div className="full">
                <label className="field-lab">Leave type</label>
                <select className="field-input" value={type} onChange={(e) => setType(e.target.value)}>
                  {Object.keys(LEAVE_TYPES).map((k) => (
                    <option key={k} value={k}>
                      {LEAVE_TYPES[k].label} leave
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-lab">Start date</label>
                <input
                  className="field-input"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="field-lab">End date</label>
                <input
                  className="field-input"
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="full">
                <label className="field-lab">Reason</label>
                <textarea
                  className="field-input"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="A line or two for your admin's context."
                />
              </div>
            </div>

            {days > 0 && (
              <div style={{ marginTop: 16, fontSize: 13, color: "var(--ink-soft)" }}>
                That's{" "}
                <b className="mono" style={{ color: "var(--ink)" }}>
                  {days} day{days > 1 ? "s" : ""}
                </b>{" "}
                of {LEAVE_TYPES[type].label.toLowerCase()} leave, leaving{" "}
                <b className="mono" style={{ color: "var(--ink)" }}>
                  {Math.max(balanceLeft - days, 0)}
                </b>{" "}
                in the bank.
              </div>
            )}

            {msg && <div className={"form-msg " + (msg.ok ? "ok" : "err")}>{msg.text}</div>}

            <div style={{ marginTop: 20 }}>
              <button className="btn-brass" type="submit">
                Submit request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
