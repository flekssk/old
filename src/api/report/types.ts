import type { Pagination } from "@/hooks/usePagination";

// филтры и сортировки по всем полям кроме img, url
export interface ProductReportItem {
  select: boolean;
  // ссылка на изображение
  image?: string;
  // ссылка на товар
  url: string;
  // Заказы
  orders: number;
  // Заказы шт
  ordersCount: number;
  // Название товара
  name: string;
  // Артикул продавца
  vendorCode: string;
  // Бренд
  brand: string;
  // Категория
  category: string;
  // Артикул WB
  article: string;
  // себестоимость
  cost: number;
  realisation: number;
  // Средняя цена до СПП
  averagePriceBeforeSPP: number;
  //Реализация (сумма продаж до СПП)
  shareInTotalRevenue: number;
  // продажа
  sales: number;
  // К перечислению
  toTransfer: number;
  //Возвраты
  returns: number;
  // Cебестоимость продаж
  costOfSales: number;
  // Штрафы
  fines: number;
  // Компенсация подмененного товара
  compensationForSubstitutedGoods: number;
  // Компенсация поставщика
  reimbursementOfTransportationCosts: number;
  //Оплата брака + потерянного товара
  paymentForMarriageAndLostGoods: number;
  //Ср. стоимость логистики
  averageLogisticsCost: number;
  // Логистика
  logistics: number;
  //Хранение
  storage: number;
  //Количество отказов+ возвраты
  rejectionsAndReturns: number;
  //Общее количество продаж, с учетом возвратов
  totalSales: number;
  // Средний процент выкупа
  averageRedemption: number;
  // Средняя прибыль на 1 шт
  averageProfitPerPiece: number;
  // Налог
  tax: number;
  // Прибыль
  profit: number;
  // ROI
  roi: number;
  // Рентабельность
  profitability: number;
  // Доля в общей выручке
  shareInTotalRevenuePart: number;
  // Доля в общей прибыли
  shareInTotalProfit: number;
  // маржинальность (в %) realization / profit
  marginality: number;
  // Рекламные расходы (собирается за день по артикулу  товара по всем рекламным компаниям)
  advertisingExpense: number;
  // ДРР % advertisingExpenses / sales
  drr: number;
}

export interface WeekReportItem {
  startWeek: string;
  // Заказы
  orders: number;
  // Заказы шт
  ordersCount: number;
  // Название товара
  realisation: number;
  // Средняя цена до СПП
  averagePriceBeforeSPP: number;
  //Реализация (сумма продаж до СПП)
  shareInTotalRevenue: number;
  // продажа
  sales: number;
  // К перечислению
  toTransfer: number;
  //Возвраты
  returns: number;
  // Cебестоимость продаж
  costOfSales: number;
  // Штрафы
  fines: number;
  // Компенсация подмененного товара
  compensationForSubstitutedGoods: number;
  // Компенсация поставщика
  reimbursementOfTransportationCosts: number;
  //Оплата брака + потерянного товара
  paymentForMarriageAndLostGoods: number;
  //Ср. стоимость логистики
  averageLogisticsCost: number;
  // Логистика
  logistics: number;
  //Хранение
  storage: number;
  //Количество отказов+ возвраты
  rejectionsAndReturns: number;
  //Общее количество продаж, с учетом возвратов
  totalSales: number;
  // Средний процент выкупа
  averageRedemption: number;
  // Средняя прибыль на 1 шт
  averageProfitPerPiece: number;
  // Налог
  tax: number;
  // Прибыль
  profit: number;
  // ROI
  roi: number;
  // Рентабельность
  profitability: number;
  // Доля в общей выручке
  shareInTotalRevenuePart: number;
  // Доля в общей прибыли
  shareInTotalProfit: number;
  // маржинальность (в %) realization / profit
  marginality: number;
  // Рекламные расходы (собирается за день по артикулу  товара по всем рекламным компаниям)
  advertisingExpense: number;
  // ДРР % advertisingExpenses / sales
  drr: number;
}

export interface WeekReportResponse {
  byWeek: WeekReportItem[];
}

export interface TopProduct {
  name: string;
  vendorCode: string;
  shareInTotalRevenue: number;
  profit: number;
  image: string;
  // расчитывается как доля прибыли от всех продуктов
  profitShare: number;
}

export interface ReportChartItem {
  date: string;
  averagePriceBeforeSPP: number;
  sales: number;
  returns: number;
  averageLogisticsCost: number;
  logistics: number;
  marginality: number;
  advertisingExpense: number;
  drr: number;
  profit: number;
  orders: number;
  ordersCount: number;
}

export interface ReportStats {
  //Чистая прибль
  profit: number;
  // Процент выкупа
  averageRedemption: number;
  // Маржинальность
  marginality: number;
  profitability: number;
  // Продажи
  sales: number;
  // Заказы
  orders: number;
  // Заказы в штуках
  ordersCount: number;
  // ДРР
  drr: number;
  advertisingExpense: number;
  returns: number;
  roi: number;
  totalSales?: number;
  toTransfer: number;
  logistics: number;
  storage: number;
}

export interface RevenueStructure {
  margin: number;
  logistics: number;
  storage: number;
  cost: number;
  fines: number;
  advertising: number;
  tax: number;
  commission: number | null;
  other: number;
}

export interface ReportResponse {
  chart: ReportChartItem[];
  byProduct: ProductReportItem[];
  topFiveProducts: TopProduct[];
  stats: ReportStats;
  revenueStructure: RevenueStructure;
  pagination: Pagination;
}

export type NumberFilter = { min: number; max: number };
export type ArticleFilter = number[];
export type TextFilter = string[];
export type Filters = Record<string, NumberFilter | ArticleFilter | TextFilter>;
export interface ReportRequest {
  dateFrom?: string;
  dateTo?: string;
  accountUid?: string;
  filters?: Filters;
  orderBy?: { field: string; direction: string };
  limit?: number;
  page?: number;
  xls?: boolean;
  columns?: string[];
}

export interface WeekReportRequest {
  category?: string;
  brand?: string;
  accountUid?: string;
  filters?: Filters;
}

// филтры и сортировки по всем полям кроме img, url
export interface BarcodeReportItem {
  // ссылка на изображение
  image?: string;
  // ссылка на товар
  url: string;
  // Заказы
  orders: number;
  // Заказы шт
  ordersCount: number;
  barcode: string;
  size: string;
  // себестоимость
  cost: number;
  // Средняя цена до СПП
  averagePriceBeforeSPP: number;
  //Реализация (сумма продаж до СПП)
  shareInTotalRevenue: number;
  // продажа
  sale: number;
  // К перечислению
  toTransfer: number;
  //Возвраты
  returns: number;
  // Cебестоимость продаж
  costOfSales: number;
  // Штрафы
  fines: number;
  // Компенсация подмененного товара
  compensationForSubstitutedGoods: number;
  // Компенсация поставщика
  reimbursementOfTransportationCosts: number;
  //Оплата брака + потерянного товара
  paymentForMarriageAndLostGoods: number;
  //Ср. стоимость логистики
  averageLogisticsCost: number;
  // Логистика
  logistics: number;
  //Хранение
  storage: number;
  //Количество отказов+ возвраты
  rejectionsAndReturns: number;
  //Общее количество продаж, с учетом возвратов
  totalSales: number;
  realisation: number;
  // Средний процент выкупа
  averageRedemption: number;
  // Средняя прибыль на 1 шт
  averageProfitPerPiece: number;
  // Налог
  tax: number;
  // Прибыль
  profit: number;
  // ROI
  roi: number;
  // Рентабельность
  profitability: number;
  // Доля в общей выручке
  //shareInTotalRevenue: number;
  // Доля в общей прибыли
  // shareInTotalProfit: number;
  // маржинальность (в %) realization / profit
  marginality: number;
  // Рекламные расходы (собирается за день по артикулу  товара по всем рекламным компаниям)
  advertisingExpense: number;
  // ДРР % advertisingExpenses / sales
  drr: number;
}

export interface Stocks {
  warehouseId: number;
  warehouseName: string;
  barcode: string;
  size: string;
  quantity: number;
  inWayToClient: number;
  inWayFromClient: number;
}

export interface ReportItemResponse {
  productData: {
    vendorCode: string;
    name: string;
    category: string;
    brand: string;
    article: string;
    url: string;
    image?: string;
  };
  chart: ReportChartItem[];
  byBarcode: Record<string, BarcodeReportItem>;
  stocks: Stocks[];
  // собирается так же как чарт только для каждого размера отдельные данные
  chartBySize: ReportChartItem[];
  stats: ReportStats;
  revenueStructure: RevenueStructure;
}

type Article = {
  brand: string;
  category: string;
  id: number;
  nmId: string;
  nmUuid: string;
  photos: number;
  title: string;
  vendorCode: string;
};

export type ReportFilterAggregationResponse = {
  articles: Article[];
  date: { minDate: string; maxDate: string } | null;
  brands: string[];
  categories: string[];
};

interface Expense {
  year: string;
  month: string;
  category_id: number;
  amount: string;
}

interface OtherDeduction {
  year: string;
  month: string;
  value: string;
}

export interface MonthlyData {
  month: string;
  realisation: number;
  sales: number;
  toTransfer: number;
  returns: number;
  costOfSales: number;
  fines: number;
  compensationForSubstitutedGoods: number;
  reimbursementOfTransportationCosts: number;
  paymentForMarriageAndLostGoods: number;
  logistics: number;
  rejectionsAndReturns: number;
  totalSales: number;
  tax: number;
  profit: number;
  profitability: number;
  ordersCount: string;
  returnsCount: string;
  salesCount: string;
  refunds: string;
  storage: number;
  advertisingExpense: number;
  commission: number;
  cost: number;
  averagePriceBeforeSPP: number;
  averageLogisticsCost: number;
  averageProfitPerPiece: number;
  marginality: number;
  roi: number;
  averageRedemption: number;
  drr: number;
  expensesSum: number;
  otherDeductionSum: number;
  expenses: Expense[];
  otherDeductions: OtherDeduction[];
}

export interface PnLRequest {
  dateFrom?: string;
  accountUid?: string;
}

export interface PnLResponse {
  byMonth: MonthlyData[];
}
