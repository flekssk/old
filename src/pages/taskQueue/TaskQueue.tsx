import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import TaskQueueTable from "@/pages/taskQueue/TaskQueueTable";

const TaskQueue = () => {
  return (
    <NavbarSidebarLayout>
      <div className="m-4">Комманды</div>
      <TaskQueueTable />
    </NavbarSidebarLayout>
  );
};

export default TaskQueue;
