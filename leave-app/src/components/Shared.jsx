import React from "react";
import { LEAVE_TYPES } from "../data/seed.js";

export function Stamp({ status }) {
  const label = status === "pending" ? "Pending" : status === "approved" ? "Approved" : "Rejected";
  return <span className={"stamp " + status}>{label}</span>;
}

export function TypePill({ type }) {
  const t = LEAVE_TYPES[type];
  return (
    <span className="leave-type-pill" style={{ color: t.color, background: t.bg }}>
      {t.label}
    </span>
  );
}

export function EmptyState({ glyph, title, sub }) {
  return (
    <div className="empty-state">
      <div className="glyph">{glyph}</div>
      <div className="title display">{title}</div>
      <div>{sub}</div>
    </div>
  );
}
