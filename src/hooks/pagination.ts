import { useSearchParams } from "react-router-dom";

const usePagination = ({
  defaultLimit,
  defaultPage,
}: {
  defaultPage?: number;
  defaultLimit?: number;
} = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = (Number(searchParams.get("page")) || defaultPage) ?? 1;
  const limit = (Number(searchParams.get("limit")) || defaultLimit) ?? 10;
  const setLimit = (limit: number) => {
    setSearchParams({ limit: limit.toString() });
  };

  const setPage = (page: number) => {
    setSearchParams((prev) => ({
      ...prev,
      page: page.toString(),
    }));
  };

  return {
    page,
    limit,
    setLimit,
    setPage,
  };
};

export default usePagination;
