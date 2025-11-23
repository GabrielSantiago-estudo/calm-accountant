export const endpoints = {
  auth: {
    login: "/auth/admin-login",
  },
  psychologists: {
    list: "/psychologists",
    create: "/psychologists",
  },
  clients: (psychologistId: number) => `/psychologists/${psychologistId}/clients`,
  sessions: "/sessions",
  transactions: "/transactions",
};
