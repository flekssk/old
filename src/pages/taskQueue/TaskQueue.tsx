import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import TaskQueueTable from "@/pages/taskQueue/TaskQueueTable";
import { Breadcrumb, Card } from "flowbite-react";
import { HiHome } from "react-icons/hi";

const TaskQueue = () => {
  return (
    <NavbarSidebarLayout>
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/">
          <div className="flex items-center gap-x-3">
            <HiHome className="text-xl" />
          </div>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <span className="dark:text-white">Очередь команд</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <h3 className="mb-4 text-2xl font-bold dark:text-white">
          Очередь команд
        </h3>
        <TaskQueueTable />
      </Card>
    </NavbarSidebarLayout>
  );
};

export default TaskQueue;
