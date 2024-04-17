export const ENDPOINTS = {
  taskCreate: "/admin/commands/queue/add",
  taskList: "/admin/commands/queue/list",
  delete: "/admin/commands/queue/{id}",
} as const;

export const QUERY_KEYS = {
  createTask: "createTask",
  getTasks: "getTasks",
} as const;
