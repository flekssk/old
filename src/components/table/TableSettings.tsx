import type {
  ColumnDef,
  ColumnPinningState,
  VisibilityState,
} from "@tanstack/react-table";
import { Button, Checkbox, ListGroup, TextInput } from "flowbite-react";
import { useState } from "react";
import type { DropResult } from "react-beautiful-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MdPushPin, MdDragHandle } from "react-icons/md";
import Drawer from "../Drawer";
import { SaveOrderSettingsModal } from "./SaveOrderSettingsModal";
import { cn } from "@/utils/utils";

type Props<TData, TValue> = {
  orderColumnsSettingsName: string;
  isOpen: boolean;
  columns: ColumnDef<TData, TValue>[];
  columnOrder: string[];
  columnPinning: ColumnPinningState;
  columnVisibility: VisibilityState;
  onClose: () => void;
  onColumnOrderChange: (newOrder: string[]) => void;
  onColumnPinningChange: (newPinning: {
    left?: string[];
    right?: string[];
  }) => void;
  onColumnVisibilityChange: (newVisibility: Record<string, boolean>) => void;
};

export function TableSettings<TData, TValue>({
  orderColumnsSettingsName,
  isOpen,
  columns,
  columnOrder,
  columnPinning,
  columnVisibility,
  onClose,
  onColumnOrderChange,
  onColumnPinningChange,
  onColumnVisibilityChange,
}: Props<TData, TValue>) {
  const [searchText, setSearchText] = useState("");
  const [isModalSaveOpen, setIsModalSaveOpen] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newOrder = Array.from(columnOrder);
    const [removed] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, removed as string);

    localStorage.setItem(
      `${orderColumnsSettingsName}-ordering`,
      JSON.stringify(newOrder),
    );
    onColumnOrderChange(newOrder);
  };

  const handlePinningChange = (colId: string) => {
    const newPinning = { ...columnPinning };
    const isPinned = newPinning?.left?.includes(colId);

    if (isPinned) {
      newPinning.left = newPinning?.left?.filter((id) => id !== colId);
    } else {
      newPinning.left = [...(newPinning?.left || ""), colId];
    }

    const newOrder = [...columnOrder];
    if (!isPinned) {
      const index = newOrder.indexOf(colId);
      newOrder.splice(index, 1);
      const lastPinnedIndex = newOrder.findIndex(
        (id) => !newPinning?.left?.includes(id),
      );
      newOrder.splice(lastPinnedIndex, 0, colId);
    }

    localStorage.setItem(
      `${orderColumnsSettingsName}-pinning`,
      JSON.stringify(newPinning),
    );
    localStorage.setItem(
      `${orderColumnsSettingsName}-ordering`,
      JSON.stringify(newOrder),
    );

    onColumnPinningChange(newPinning);
    onColumnOrderChange(newOrder);
  };

  const handleCheckColumn = (colId: string, checked: boolean) => {
    const newVisibilityState = { ...columnVisibility, [colId]: checked };
    localStorage.setItem(
      `${orderColumnsSettingsName}-visibility`,
      JSON.stringify(newVisibilityState),
    );
    onColumnVisibilityChange(newVisibilityState);
  };

  const filteredColumns = columnOrder.filter((colId) => {
    const column = columns.find((col) => col.id === colId);
    const columnName = column?.header as string;
    return columnName.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      <Drawer
        title="Настройки колонок"
        isOpen={isOpen}
        onClose={onClose}
        position="right"
      >
        <TextInput
          placeholder="Поиск колонок..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="mb-4"
        />
        <ListGroup>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="columns">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredColumns?.map((colId, index) => {
                    const column = columns?.find((col) => col.id === colId);
                    const columnName = column?.header as string;
                    const isColumnPinned = columnPinning?.left?.find(
                      (value) => value === colId,
                    );
                    return (
                      <Draggable
                        key={colId}
                        draggableId={colId}
                        index={index}
                        isDragDisabled={!!isColumnPinned}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...(provided.draggableProps?.style || {}),
                                left: 0,
                              }}
                              className={cn(
                                "flex w-full items-center border-b  border-gray-200 px-4 py-2 dark:border-gray-600",
                                {
                                  "bg-gray-100 ": snapshot.isDragging,
                                },
                              )}
                            >
                              <div className="mb-1">
                                <Checkbox
                                  checked={columnVisibility[colId]}
                                  onChange={(e) =>
                                    handleCheckColumn(colId, e.target.checked)
                                  }
                                />
                              </div>
                              <div>
                                <MdPushPin
                                  style={{
                                    cursor: "pointer",
                                    color: isColumnPinned ? "black" : "#999",
                                  }}
                                  onClick={() => handlePinningChange(colId)}
                                />
                              </div>
                              <div>
                                <MdDragHandle />
                              </div>
                              <div className=" rounded  p-2">{columnName}</div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </ListGroup>
        <div className="sticky inset-x-0 bottom-0 flex justify-between border-t border-gray-200 bg-white pb-2 pt-4">
          <Button outline onClick={onClose}>
            Закрыть
          </Button>
          <Button onClick={() => setIsModalSaveOpen(true)}>
            Сохранить настройки
          </Button>
        </div>
      </Drawer>
      <SaveOrderSettingsModal
        isOpen={isModalSaveOpen}
        columnOrder={columnOrder}
        columnPinning={columnPinning}
        columnVisibility={columnVisibility}
        orderSettingsName={orderColumnsSettingsName}
        onClose={() => setIsModalSaveOpen(false)}
      />
    </>
  );
}
