import { Breadcrumb } from "flowbite-react";
import NavbarSidebarLayout from "@/layouts/navbar-sidebar";
import { HiHome } from "react-icons/hi";
import { OtherDeductions } from "./OtherDeductions";

/**
 * 
 * Модуль прочие удержание похож на модуль прочие расходы но тут пользователи должны забивать прочие удержания с ВБ а не свои финансовые расходы

Мы должны создать отдельную пункт меню который будет вести в раздел прочих удержания

Пользвователь должен иметь возможность добавить описание, сумму, дату удержания

Возможность удалить или отредактировать удержание


 * 
 */
const OtherDeductionsPage = () => {
  return (
    <NavbarSidebarLayout>
      <div className="mb-6 grid grid-cols-1 gap-y-6  dark:border-gray-700 dark:bg-gray-900 xl:grid-cols-2 xl:gap-4">
        <div className="col-span-full">
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item href="#">
              <div className="flex items-center gap-x-3">
                <HiHome className="text-xl" />
                <span className="dark:text-white">Прочие удержания</span>
              </div>
            </Breadcrumb.Item>
          </Breadcrumb>
          <OtherDeductions />
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default OtherDeductionsPage;
