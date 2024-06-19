import { useMemo, useState } from "react";
import { Button, Card, Pagination } from "flowbite-react";
import { OtherDeductionTable } from "./OtherDeductionsTable";
import { CreateOtherDeductionModal } from "./modals/CreateOtherDeductionModal";

import { DeleteOtherDeductionModal } from "./modals/DeleteOtherDeductionModal";
import { DatePickerWithRange } from "@/components/shadcnUi/Datepicker";
import { ExpensesSkeleton } from "@/components/skeletons";
import type { DateRange } from "react-day-picker";

import { toast } from "react-toastify";
import {
  useDeleteOtherDeductionMutation,
  useGetOtherDeductionList,
} from "@/api/otherDeduction";
import { useUserProfile } from "@/api/user";
import type {
  OtherDeduction,
  OtherDeductionListRequest,
} from "@/api/otherDeduction/types";
import { format } from "date-fns";
import { DATE_FORMAT } from "@/helpers/date";
import { Select, type SelectOption } from "@/components/Select";
import { usePagination } from "@/hooks/usePagination";
import { useSearchParams } from "react-router-dom";

export const OtherDeductions = () => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [selectedAccount, setSelectedAccount] = useState<
    SelectOption | undefined
  >();
  const userProfile = useUserProfile();
  const accountList = userProfile.data?.accounts || [];

  const accountOptions = useMemo(
    () =>
      accountList.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    [accountList],
  );

  const [searchParam, setSearchParam] = useSearchParams();

  const pagination = usePagination({
    searchParam,
    setSearchParam,
  });

  const [otherDeductionDeleteId, setOtherDeductionDeleteId] = useState<
    number | undefined
  >(undefined);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [otherDeductionEdit, setOtherDeductionEdit] = useState<
    OtherDeduction | undefined
  >(undefined);

  const deleteOtherDeductionMutation = useDeleteOtherDeductionMutation();
  const params = useMemo<OtherDeductionListRequest>(() => {
    const res: OtherDeductionListRequest = {
      page: pagination.page,
      limit: pagination.limit,
    };
    if (date?.from) {
      res.dateFrom = format(date.from, DATE_FORMAT.SERVER_DATE);
    }

    if (date?.to) {
      res.dateTo = format(date.to, DATE_FORMAT.SERVER_DATE);
    }

    if (selectedAccount) {
      res.wbAccountId = selectedAccount.value as number;
    }
    return res;
  }, [date, selectedAccount, pagination]);

  const otherDeductionsList = useGetOtherDeductionList(params, {
    placeholderData: (previousData) => previousData,
  });

  const otherDeductions = otherDeductionsList.data?.items ?? [];

  const isLoading = otherDeductionsList.isLoading;

  const handleOpenDeleteModal = (id: number) => {
    setOtherDeductionDeleteId(id);
  };

  const handleOpenEditModal = (expenseId: number) => {
    const otherDeduction = otherDeductions.find(({ id }) => expenseId === id);

    if (otherDeduction) {
      setOtherDeductionEdit(otherDeduction);
      setIsOpenEditModal(true);
    }
  };

  const handleCloseEditModal = () => {
    setIsOpenEditModal(false);
    setOtherDeductionEdit(undefined);
  };

  const handleCloseDeleteModal = () => {
    setOtherDeductionDeleteId(undefined);
  };

  const handleResetFilters = () => {
    setDate(undefined);
    setSelectedAccount(undefined);
  };

  const handleConfirmDelete = async () => {
    try {
      if (otherDeductionDeleteId) {
        await deleteOtherDeductionMutation.mutateAsync({
          id: otherDeductionDeleteId,
        });
        otherDeductionsList.refetch();
        handleCloseDeleteModal();
        toast.success("Данные успешно удалены");
      }
    } catch {
      toast.error("Ошибка, запрос не выполнен");
    }
  };

  if (isLoading) {
    return <ExpensesSkeleton />;
  }

  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <h3 className="mb-4 text-2xl font-bold dark:text-white">Расходы</h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <DatePickerWithRange date={date} onChangeDate={setDate} />
            <Select
              selectedOption={selectedAccount}
              setSelectedOption={(option) => {
                setSelectedAccount(option);
              }}
              placeholder="Все аккаунты"
              options={accountOptions}
            />
            <Button color="light" onClick={handleResetFilters}>
              Сбросить
            </Button>
          </div>
          <Button onClick={() => setIsOpenEditModal(true)}>Добавить</Button>
        </div>
        <div>
          <OtherDeductionTable
            data={otherDeductions}
            accounts={accountList}
            loading={otherDeductionsList.isLoading}
            onOpenDeleteModal={handleOpenDeleteModal}
            onOpenEditModal={handleOpenEditModal}
          />
          {pagination.totalPages > 1 ? <Pagination {...pagination} /> : null}
        </div>
      </Card>
      <CreateOtherDeductionModal
        otherDeduction={otherDeductionEdit}
        isOpen={isOpenEditModal}
        onClose={handleCloseEditModal}
        onSuccess={() => {
          otherDeductionsList.refetch();
          handleCloseEditModal();
        }}
        accounts={accountList}
      />
      <DeleteOtherDeductionModal
        isOpen={!!otherDeductionDeleteId}
        onConfirmDelete={handleConfirmDelete}
        onClose={handleCloseDeleteModal}
      />
    </>
  );
};
