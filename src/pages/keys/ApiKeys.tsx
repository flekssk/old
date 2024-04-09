import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button, Card, TextInput } from "flowbite-react";
import { HiHome, HiOutlineTrash } from "react-icons/hi";

const ApiKeys: FC = () => {
  return (
    <NavbarSidebarLayout>
      <div className="mb-6 grid grid-cols-1 gap-y-6 px-4 pt-6 dark:border-gray-700 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
        <div className="col-span-full">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="#">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Аккаунт</span>
              </div>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/e-commerce/products">
              API ключи
            </Breadcrumb.Item>
          </Breadcrumb>
          <CardDetailsCard />
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

const CardDetailsCard: FC = function () {
  return (
    <Card>
      <h3 className="mb-4 text-xl font-bold dark:text-white"> API ключи</h3>
      <form>
        <div className="mb-6 max-w-2xl">
          <div className="mb-6 flex items-center justify-between">
            <TextInput
              className="w-full"
              id="full-name"
              name="full-name"
              placeholder="API ключ"
              required
            />
            <HiOutlineTrash color="red" className="ml-2 cursor-pointer" />
          </div>
          <div className="flex items-center justify-between">
            <TextInput
              className="w-full"
              id="full-name"
              name="full-name"
              placeholder="API ключ"
              required
            />
            <HiOutlineTrash color="red" className="ml-2 cursor-pointer" />
          </div>
        </div>
        <div className="flex max-w-2xl justify-between">
          <Button color="blue">Добавить</Button>
          <Button color="primary">Сохранить</Button>
        </div>
      </form>
    </Card>
  );
};

export default ApiKeys;
