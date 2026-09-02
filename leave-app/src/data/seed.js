export const SEED_USERS = [
  {
    id: "u-admin",
    name: "Priya Menon",
    email: "admin@company.com",
    password: "admin123",
    role: "admin",
    department: "People Ops",
    initials: "PM",
  },
  {
    id: "u-1",
    name: "Arjun Iyer",
    email: "arjun@company.com",
    password: "employee123",
    role: "employee",
    department: "Engineering",
    initials: "AI",
    balance: { annual: 18, sick: 8, casual: 6 },
  },
  {
    id: "u-2",
    name: "Fatima Noor",
    email: "fatima@company.com",
    password: "employee123",
    role: "employee",
    department: "Design",
    initials: "FN",
    balance: { annual: 14, sick: 10, casual: 5 },
  },
  {
    id: "u-3",
    name: "Kevin D'Souza",
    email: "kevin@company.com",
    password: "employee123",
    role: "employee",
    department: "Engineering",
    initials: "KD",
    balance: { annual: 20, sick: 6, casual: 7 },
  },
];

export const LEAVE_TYPES = {
  annual: { label: "Annual", color: "#2E5C8A", bg: "#DCE6F0" },
  sick: { label: "Sick", color: "#B4503B", bg: "#F5E3DE" },
  casual: { label: "Casual", color: "#4C7A5C", bg: "#DFEAE2" },
};

export const SEED_REQUESTS = [
  {
    id: "r-1",
    employeeId: "u-1",
    type: "annual",
    startDate: "2026-09-02",
    endDate: "2026-09-05",
    days: 4,
    reason: "Family wedding out of town.",
    status: "pending",
    appliedOn: "2026-08-20",
  },
  {
    id: "r-2",
    employeeId: "u-2",
    type: "sick",
    startDate: "2026-08-18",
    endDate: "2026-08-19",
    days: 2,
    reason: "Recovering from a fever.",
    status: "approved",
    appliedOn: "2026-08-16",
    decisionNote: "Get well soon.",
  },
  {
    id: "r-3",
    employeeId: "u-3",
    type: "casual",
    startDate: "2026-08-14",
    endDate: "2026-08-14",
    days: 1,
    reason: "Personal errand.",
    status: "rejected",
    appliedOn: "2026-08-10",
    decisionNote: "Overlaps with sprint demo — please pick another day.",
  },
  {
    id: "r-4",
    employeeId: "u-1",
    type: "casual",
    startDate: "2026-08-28",
    endDate: "2026-08-28",
    days: 1,
    reason: "Moving apartments.",
    status: "pending",
    appliedOn: "2026-08-22",
  },
  {
    id: "r-5",
    employeeId: "u-2",
    type: "annual",
    startDate: "2026-10-06",
    endDate: "2026-10-10",
    days: 5,
    reason: "Diwali travel to hometown.",
    status: "pending",
    appliedOn: "2026-08-23",
  },
];

export function fmtDate(d) {
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function daysBetween(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  return Math.round((e - s) / 86400000) + 1;
}

export function initialsOf(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
