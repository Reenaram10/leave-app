import React from "react";
import { initialsOf } from "../data/seed.js";

export default function Sidebar({ user, active, setActive, onLogout, items }) {
  return (
    <div className="sidebar">
      <div className="brand">
        <div className="brand-mark">L</div>
        <div className="brand-text">
          <div className="name">Ledger</div>
          <div className="role">{user.role === "admin" ? "Admin console" : "Employee portal"}</div>
        </div>
      </div>

      {items.map((it) => (
        <button
          key={it.key}
          className={"nav-item" + (active === it.key ? " active" : "")}
          onClick={() => setActive(it.key)}
        >
          <span className="ic">{it.icon}</span>
          {it.label}
        </button>
      ))}

      <div className="nav-spacer"></div>

      <div className="user-chip">
        <div className="av">{user.initials || initialsOf(user.name)}</div>
        <div>
          <div className="uname">{user.name}</div>
          <div className="uemail">{user.department}</div>
        </div>
      </div>
      <button className="logout-btn" onClick={onLogout}>
        Sign out
      </button>
    </div>
  );
}
