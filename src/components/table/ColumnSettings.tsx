import { useSaveSettingsMutation, useSettingsItemByName } from "@/api/user";
import type { Table, VisibilityState } from "@tanstack/react-table";
import {
  Button,
  Checkbox,
  Dropdown,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { HiTrash } from "react-icons/hi";

interface ColumnSettingsProps<TData> {
  table: Table<TData>;
  visibilityState: VisibilityState;
  storedSettingsName: string;
}

type StoredColumnSettings = {
  name: string;
  visibilityState: VisibilityState;
};

const standardColumns: VisibilityState = {
  photo: true,
  vendorCode: true,
  brand: true,
  sale: true,
  costOfSales: true,
  fines: true,
  logistics: true,
  storage: true,
  ddr: true,
  averageRedemption: true,
  tax: true,
  profit: true,
  profitability: true,
};

export function ColumnSettings<TData>({
  table,
  visibilityState,
  storedSettingsName,
}: ColumnSettingsProps<TData>) {
  const columns = table.getAllColumns();
  const [settingsName, setSettingsName] = useState<string>("");
  const [selectedSettings] = useState<string>(() => {
    return localStorage.getItem(storedSettingsName) || "";
  });
  const initialVisibilityState = useRef<VisibilityState>(visibilityState);
  const [openModal, setOpenModal] = useState(false);
  const isEqualsWithInitial = Object.keys(visibilityState).every((key) => {
    return visibilityState[key] === initialVisibilityState.current[key];
  });

  const storedSettingsQuery = useSettingsItemByName<
    Record<string, StoredColumnSettings>
  >(storedSettingsName, {
    retry: false,
  });

  const applySettings = useCallback(
    (current: VisibilityState, nextState: VisibilityState) => {
      const result = Object.keys(current).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as VisibilityState);

      const endResult = {
        ...result,
        ...nextState,
      };

      initialVisibilityState.current = endResult;
      return endResult;
    },
    [],
  );

  const saveSettingsMutation =
    useSaveSettingsMutation<Record<string, StoredColumnSettings>>();

  useEffect(() => {
    if (storedSettingsQuery.data && selectedSettings) {
      const settings = storedSettingsQuery.data.settings[selectedSettings];

      if (settings) {
        table.setColumnVisibility(() => {
          return {
            ...settings.visibilityState,
          };
        });
      }
    }
  }, [storedSettingsQuery.data]);

  const storedSettingsList = storedSettingsQuery.data
    ? Object.values(storedSettingsQuery.data.settings)
    : [];

  return (
    <>
      <Dropdown
        label="Столбцы"
        color="gray"
        processingSpinner={storedSettingsQuery.isLoading}
        dismissOnClick={false}
        placement="bottom-end"
      >
        <div>
          <Dropdown
            inline
            theme={{
              inlineWrapper:
                "w-full py-2 px-4 flex justify-between items-center",
            }}
            placement="right-start"
            label="Сохраненные"
          >
            <Dropdown.Item
              onClick={() => {
                table.setColumnVisibility((current) => {
                  return applySettings(current, standardColumns);
                });
              }}
            >
              Стандартная таблица
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                table.setColumnVisibility((current) => {
                  return Object.keys(current).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                  }, {} as VisibilityState);
                });
              }}
            >
              Все включено
            </Dropdown.Item>
            {storedSettingsList.length ? (
              <>
                <Dropdown.Divider />
                {storedSettingsList.map((item) => (
                  <Dropdown.Item
                    onClick={() =>
                      table.setColumnVisibility((current) =>
                        applySettings(current, item.visibilityState),
                      )
                    }
                    key={item.name}
                  >
                    <div className="flex w-full items-center justify-between">
                      {item.name}
                      <HiTrash
                        size={10}
                        onClick={async (e) => {
                          const settings = Object.values(
                            storedSettingsQuery.data?.settings || {},
                          ).reduce(
                            (acc, el) => {
                              if (el.name !== item.name) {
                                acc[el.name] = el;
                              }
                              return acc;
                            },
                            {} as Record<string, StoredColumnSettings>,
                          );

                          e.stopPropagation();
                          await saveSettingsMutation.mutateAsync({
                            ...(storedSettingsQuery.data || {}),
                            name: storedSettingsName,
                            settings,
                          });
                          storedSettingsQuery.refetch();
                          setOpenModal(false);
                          initialVisibilityState.current = visibilityState;
                        }}
                      />
                    </div>
                  </Dropdown.Item>
                ))}
              </>
            ) : null}
          </Dropdown>
        </div>
        <div className="max-h-40 overflow-auto">
          {columns.map((column) => (
            <Dropdown.Item key={column.id}>
              <div className="flex items-center gap-2">
                <Checkbox
                  id={column.id}
                  checked={visibilityState[column.id as string]}
                  onChange={(e) => {
                    table.setColumnVisibility((current) => {
                      return {
                        ...current,
                        [column.id as string]: e.target.checked,
                      };
                    });
                  }}
                />
                <Label htmlFor={column.id}>
                  {column.id === "select"
                    ? "Выбор"
                    : (column.columnDef.header as string)}
                </Label>
              </div>
            </Dropdown.Item>
          ))}
        </div>
        {!isEqualsWithInitial ? (
          <Dropdown.Item onClick={() => setOpenModal(true)}>
            Сохранить в шаблон
          </Dropdown.Item>
        ) : null}
      </Dropdown>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Задайте название настройки</Modal.Header>
        <Modal.Body>
          <TextInput
            placeholder="Название"
            value={settingsName}
            onChange={(e) => setSettingsName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button
            disabled={saveSettingsMutation.isPending}
            color="gray"
            onClick={() => setOpenModal(false)}
          >
            Отменить
          </Button>
          <Button
            onClick={async () => {
              await saveSettingsMutation.mutateAsync({
                ...(storedSettingsQuery.data || {}),
                name: storedSettingsName,
                settings: {
                  ...(storedSettingsQuery.data?.settings || {}),
                  [settingsName]: {
                    name: settingsName,
                    visibilityState,
                  },
                },
              });
              storedSettingsQuery.refetch();
              setOpenModal(false);
              initialVisibilityState.current = visibilityState;

              // TODO add success message
            }}
            disabled={!settingsName}
            isProcessing={saveSettingsMutation.isPending}
          >
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
