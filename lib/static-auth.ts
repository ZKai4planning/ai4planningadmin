export type StaticAccount = {
  email: string;
  password: string;
  name: string;
  role: "admin" | "employee";
  region?: "India" | "UK";
};

export const STATIC_ACCOUNTS: StaticAccount[] = [
  {
    email: "admin@ai4planning.com",
    password: "Admin@123",
    name: "Admin",
    role: "admin",
  },
  {
    email: "agentx@ai4planning.com",
    password: "Employee@123",
    name: "agentX",
    role: "employee",
    // region: "",
  },
  {
    email: "agentz@ai4planning.com",
    password: "Employee@123",
    name: "agentZ",
    role: "employee",
    // region: "UK",
  },
];

export const findAccountByEmail = (email: string) =>
  STATIC_ACCOUNTS.find(
    (account) => account.email.toLowerCase() === email.toLowerCase()
  );
