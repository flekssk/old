import { DATE_FORMAT } from "@/helpers/date";
import { parse } from "date-fns";
import { Card, Table } from "flowbite-react";
import React, { useMemo, type FC } from "react";

import { displayNumber } from "@/helpers/number";
import { cn } from "@/utils/utils";
import type { MonthlyData, PnLResponse } from "@/api/report/types";

type StatTableProps = {
  items: PnLResponse["byMonth"];
};

const ReportRowLabels = {
  realisation: "Реализация",
  directExpenses: "Прямые расходы",
  costOfSales: "Себестоимость",
  logistics: "Логистика",
  commission: "Комиссия",
  fines: "Штрафы",
  // payments: "Доплаты",
  storage: "Хранение",
  advertisingExpense: "Внутренняя реклама",
  // marketingExpense: "Внешний маркетинг",
  // otherExpenses: "Прочие расходы",
  otherDeduction: "Прочие удержания",
  //Раздачи
  //Самовыкупы
  //Себестоимость самовыкупленного товара
  grossMargin: "Валовая маржа",
  operatingExpenses: "Операционные расходы",
  operatingIncome: "Операционная прибыль (EBITDA)",
  taxes: "Налоги (кроме зарплатных)",
  totalIncome: "Чистая прибыль",
} as const;

type ReportRowLabel = keyof typeof ReportRowLabels;

function calculateReportRow(item: MonthlyData): Record<ReportRowLabel, number> {
  const directExpenses =
    item.costOfSales +
    item.logistics +
    item.commission +
    item.fines +
    item.storage +
    item.advertisingExpense +
    item.otherDeductionSum;
  return {
    realisation: item.realisation,
    directExpenses,
    costOfSales: item.costOfSales,
    logistics: item.logistics,
    commission: item.commission,
    fines: item.fines,
    storage: item.storage,
    advertisingExpense: item.advertisingExpense,
    otherDeduction: item.otherDeductionSum,
    grossMargin: item.realisation - directExpenses,
    operatingExpenses: item.expensesSum,
    operatingIncome: item.realisation - directExpenses - item.expensesSum,
    taxes: item.tax,
    totalIncome:
      item.realisation - directExpenses - item.expensesSum - item.tax,
  };
}

type YearReportItem = {
  yearData: Record<ReportRowLabel, number>;
  monthData: Array<Record<ReportRowLabel | "month", number | string>>;
};

const rowLabelAdditionalClasses: Record<string, string> = {
  realisation: "border-y-2  border-black",
  operatingIncome: "border-y-2  border-black",
  totalIncome: "border-y-2 border-black",
};

export const StatTable: FC<StatTableProps> = ({ items }) => {
  const groupedByYear = useMemo(() => {
    const years: Record<string, YearReportItem> = {};
    const calculateMonthDataByYear: Record<string, MonthlyData> = {};
    items.forEach((item) => {
      const year = parse(item.month, DATE_FORMAT.SERVER_DATE, new Date())
        .getFullYear()
        .toString();
      if (!years[year]) {
        calculateMonthDataByYear[year] = item;
        years[year] = {
          yearData: calculateReportRow(item),
          monthData: [
            {
              ...calculateReportRow(item),
              month: item.month,
            },
          ],
        };
      } else {
        const currentYear = years[year] as YearReportItem;
        currentYear.monthData.push({
          ...calculateReportRow(item),
          month: item.month,
        });
        const monthData = calculateMonthDataByYear[year] as MonthlyData;
        monthData.realisation += item.realisation;
        monthData.costOfSales += item.costOfSales;
        monthData.logistics += item.logistics;
        monthData.commission += item.commission;
        monthData.fines += item.fines;
        monthData.storage += item.storage;
        monthData.advertisingExpense += item.advertisingExpense;
        monthData.otherDeductionSum += item.otherDeductionSum;
        monthData.expensesSum += item.expensesSum;
        monthData.tax += item.tax;
      }
    });

    Object.keys(calculateMonthDataByYear).forEach((year) => {
      const monthData = calculateMonthDataByYear[year] as MonthlyData;
      const currentYear = years[year] as YearReportItem;
      currentYear.yearData = calculateReportRow(monthData);
    });
    return years;
  }, [items]);
  return (
    <Card>
      <Table>
        <Table.Head>
          <Table.HeadCell className="bg-gray-200 font-bold text-gray-900">
            Статья
          </Table.HeadCell>
          {Object.keys(groupedByYear).map((year) => {
            const currentYear = groupedByYear[year] as YearReportItem;
            return (
              <>
                <Table.HeadCell className="bg-gray-100" key={year}>
                  {year}
                </Table.HeadCell>

                {currentYear.monthData.map((item) => {
                  return (
                    <Table.HeadCell className="bg-white" key={item.month}>
                      {item.month}
                    </Table.HeadCell>
                  );
                })}
              </>
            );
          })}
        </Table.Head>
        <Table.Body>
          {Object.keys(ReportRowLabels).map((label) => {
            const additionalClass =
              rowLabelAdditionalClasses[label as ReportRowLabel] ?? "";
            return (
              <Table.Row
                className={cn("border-b", additionalClass)}
                key={label}
              >
                <Table.Cell className="bg-gray-200 font-bold text-gray-900">
                  {ReportRowLabels[label as ReportRowLabel]}
                </Table.Cell>
                {Object.keys(groupedByYear).map((year) => {
                  const currentYear = groupedByYear[year] as YearReportItem;
                  return (
                    <React.Fragment key={year}>
                      <Table.Cell className="bg-gray-100">
                        {displayNumber(
                          currentYear.yearData[label as ReportRowLabel],
                        )}
                      </Table.Cell>
                      {currentYear.monthData.map((item) => {
                        return (
                          <Table.Cell key={item.month}>
                            {displayNumber(item[label as ReportRowLabel])}
                          </Table.Cell>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Card>
  );
};
