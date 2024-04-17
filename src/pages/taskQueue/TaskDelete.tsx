import { useDeleteCommand } from "@/api/taskQueue";
import { Button } from "flowbite-react";
import type { FC } from "react";

type DeleteTaskProps = {
  id: number;
  refetch: () => void;
};
export const DeleteTask: FC<DeleteTaskProps> = ({ id, refetch }) => {
  const deleteMutation = useDeleteCommand();

  return (
    <Button
      onClick={async () => {
        await deleteMutation.mutateAsync(id);
        refetch();
      }}
      color="failure"
      processingSpinner={deleteMutation.isPending}
      disabled={deleteMutation.isPending}
    >
      Удалить
    </Button>
  );
};
