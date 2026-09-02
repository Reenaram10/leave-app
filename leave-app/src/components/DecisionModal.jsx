import React, { useState } from "react";
import { LEAVE_TYPES, fmtDate } from "../data/seed.js";

export default function DecisionModal({ req, action, employee, onCancel, onConfirm }) {
  const [note, setNote] = useState("");
  const isApprove = action === "approved";

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="display">{isApprove ? "Approve request" : "Reject request"}</h3>
        <div className="sub">
          {employee.name} · {LEAVE_TYPES[req.type].label} leave · {fmtDate(req.startDate)} →{" "}
          {fmtDate(req.endDate)} ({req.days}d)
        </div>
        <label className="field-lab">Note {isApprove ? "(optional)" : "— let them know why"}</label>
        <textarea
          className="field-input"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={isApprove ? "Enjoy the time off." : "e.g. Overlaps with the release date."}
        />
        <div className="modal-actions">
          <button className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button
            className={isApprove ? "btn-solid-approve" : "btn-solid-reject"}
            onClick={() => onConfirm(note.trim() || undefined)}
          >
            {isApprove ? "Confirm approval" : "Confirm rejection"}
          </button>
        </div>
      </div>
    </div>
  );
}
