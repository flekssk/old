export const ENDPOINTS = {
  taskCreate: "/admin/commands/queue/add",
  taskList: "/admin/commands/queue/list",
} as const;

export const QUERY_KEYS = {
  createTask: "createTask",
  getTasks: "getTasks",
} as const;
