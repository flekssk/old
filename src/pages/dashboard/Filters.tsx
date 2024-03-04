import { Dropdown } from "flowbite-react";
import type { FC } from "react";

export const Filters: FC = () => {
  return (
    <div className="flex flex-wrap justify-between">
      <div>
        <h2 className="text-l mb-2">Период отчета</h2>
        <div className="flex items-center gap-2">
          <Dropdown color="gray" label="Последняя неделя">
            <Dropdown.Item>
              <strong>Sep 16, 2021 - Sep 22, 2021</strong>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Yesterday</Dropdown.Item>
            <Dropdown.Item>Today</Dropdown.Item>
            <Dropdown.Item>Last 7 days</Dropdown.Item>
            <Dropdown.Item>Last 30 days</Dropdown.Item>
            <Dropdown.Item>Last 90 days</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Custom...</Dropdown.Item>
          </Dropdown>
          <Dropdown color="gray" label="10.02.2024 - 17.02.2024">
            <Dropdown.Item>
              <strong>Sep 16, 2021 - Sep 22, 2021</strong>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Yesterday</Dropdown.Item>
            <Dropdown.Item>Today</Dropdown.Item>
            <Dropdown.Item>Last 7 days</Dropdown.Item>
            <Dropdown.Item>Last 30 days</Dropdown.Item>
            <Dropdown.Item>Last 90 days</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Custom...</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div>
        <h2 className="text-l mb-2">Фильтры</h2>
        <div className="flex flex-wrap items-center gap-2 ">
          <div className="mb-2 w-full md:mb-0 md:w-auto">
            <Dropdown className="w-full!" color="gray" label="Все бренды">
              <Dropdown.Item>
                <strong>Sep 16, 2021 - Sep 22, 2021</strong>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Yesterday</Dropdown.Item>
              <Dropdown.Item>Today</Dropdown.Item>
              <Dropdown.Item>Last 7 days</Dropdown.Item>
              <Dropdown.Item>Last 30 days</Dropdown.Item>
              <Dropdown.Item>Last 90 days</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Custom...</Dropdown.Item>
            </Dropdown>
          </div>
          <Dropdown color="gray" label="Все категории">
            <Dropdown.Item>
              <strong>Sep 16, 2021 - Sep 22, 2021</strong>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Yesterday</Dropdown.Item>
            <Dropdown.Item>Today</Dropdown.Item>
            <Dropdown.Item>Last 7 days</Dropdown.Item>
            <Dropdown.Item>Last 30 days</Dropdown.Item>
            <Dropdown.Item>Last 90 days</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Custom...</Dropdown.Item>
          </Dropdown>
          <Dropdown color="gray" label="Все артикулы">
            <Dropdown.Item>
              <strong>Sep 16, 2021 - Sep 22, 2021</strong>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Yesterday</Dropdown.Item>
            <Dropdown.Item>Today</Dropdown.Item>
            <Dropdown.Item>Last 7 days</Dropdown.Item>
            <Dropdown.Item>Last 30 days</Dropdown.Item>
            <Dropdown.Item>Last 90 days</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Custom...</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
