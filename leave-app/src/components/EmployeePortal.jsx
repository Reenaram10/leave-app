import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Overview from "./Overview.jsx";
import RequestForm from "./RequestForm.jsx";
import HistoryPanel from "./HistoryPanel.jsx";

export default function EmployeePortal({ user, requests, setRequests, onLogout }) {
  const [active, setActive] = useState("overview");

  const myRequests = requests
    .filter((r) => r.employeeId === user.id)
    .sort((a, b) => b.appliedOn.localeCompare(a.appliedOn));
  const pendingCount = myRequests.filter((r) => r.status === "pending").length;
  const approvedThisYear = myRequests
    .filter((r) => r.status === "approved")
    .reduce((s, r) => s + r.days, 0);

  const items = [
    { key: "overview", label: "Overview", icon: "◆" },
    { key: "request", label: "Request leave", icon: "✎" },
    { key: "history", label: "My requests", icon: "☰" },
  ];

  return (
    <div className="app-shell">
      <Sidebar user={user} active={active} setActive={setActive} onLogout={onLogout} items={items} />
      <div className="main">
        {active === "overview" && (
          <Overview
            user={user}
            myRequests={myRequests}
            pendingCount={pendingCount}
            approvedThisYear={approvedThisYear}
            goRequest={() => setActive("request")}
          />
        )}
        {active === "request" && (
          <RequestForm
            user={user}
            requests={requests}
            setRequests={setRequests}
            onDone={() => setActive("history")}
          />
        )}
        {active === "history" && <HistoryPanel myRequests={myRequests} />}
      </div>
    </div>
  );
}
