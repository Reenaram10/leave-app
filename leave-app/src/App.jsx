import React, { useState } from "react";
import Login from "./components/Login.jsx";
import EmployeePortal from "./components/EmployeePortal.jsx";
import AdminPortal from "./components/AdminPortal.jsx";
import { SEED_USERS, SEED_REQUESTS } from "./data/seed.js";

export default function App() {
  const [users] = useState(SEED_USERS);
  const [requests, setRequests] = useState(SEED_REQUESTS);
  const [currentUser, setCurrentUser] = useState(null);

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} users={users} />;
  }

  if (currentUser.role === "admin") {
    return (
      <AdminPortal
        user={currentUser}
        requests={requests}
        setRequests={setRequests}
        users={users}
        onLogout={() => setCurrentUser(null)}
      />
    );
  }

  const freshUser = users.find((u) => u.id === currentUser.id);
  return (
    <EmployeePortal
      user={freshUser}
      requests={requests}
      setRequests={setRequests}
      onLogout={() => setCurrentUser(null)}
    />
  );
}
