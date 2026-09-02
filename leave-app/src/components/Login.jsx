import React, { useState } from "react";

export default function Login({ onLogin, users }) {
  const [role, setRole] = useState("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const match = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (!match) {
      setError("No punch card on file for those credentials.");
      return;
    }
    if (match.role !== role) {
      setError(`That account clocks in as ${match.role}. Switch tabs above.`);
      return;
    }
    setError("");
    onLogin(match);
  }

  function fillDemo() {
    if (role === "admin") {
      setEmail("admin@company.com");
      setPassword("admin123");
    } else {
      setEmail("arjun@company.com");
      setPassword("employee123");
    }
  }

  return (
    <div className="login-wrap">
      <div className="punch-card">
        <div className="card-eyebrow">
          <span className="dot"></span>LEDGER · TIME &amp; ABSENCE
        </div>
        <h1 className="card-title display">
          Clock in to
          <br />
          Ledger
        </h1>
        <p className="card-sub">
          Request time off, track balances, and keep the whole team's calendar honest — in one
          register.
        </p>

        <div className="role-toggle">
          <button
            type="button"
            className={role === "employee" ? "active" : ""}
            onClick={() => {
              setRole("employee");
              setError("");
            }}
          >
            Employee
          </button>
          <button
            type="button"
            className={role === "admin" ? "active" : ""}
            onClick={() => {
              setRole("admin");
              setError("");
            }}
          >
            Admin
          </button>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={submit}>
          <div className="field">
            <label>Work email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button className="btn-primary" type="submit">
            Punch in as {role === "admin" ? "admin" : "employee"} →
          </button>
        </form>

        <div className="demo-box">
          <div className="demo-row">
            <span>Admin demo</span>
            <b>admin@company.com / admin123</b>
          </div>
          <div className="demo-row" style={{ marginTop: 4 }}>
            <span>Employee demo</span>
            <b>arjun@company.com / employee123</b>
          </div>
          <div style={{ marginTop: 10, textAlign: "right" }}>
            <button
              type="button"
              onClick={fillDemo}
              style={{
                background: "none",
                border: "none",
                color: "var(--brass-dark)",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                padding: 0,
              }}
            >
              Autofill for {role} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
