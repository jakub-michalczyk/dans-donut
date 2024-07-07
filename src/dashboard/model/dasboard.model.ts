export enum EDateFormat {
  DAY,
  WEEK,
  MONTH,
}

export interface IDate {
  from: string;
  to: string;
}

export interface ISaleSummaryDTO {
  totalSale: number;
  currencySymbol: string;
  amountSold: number;
  progressSaleInPercent: number;
  progressAmountSoldInPercent: number;
  mostPopularItem: IPopularItemDTO;
  chartData: number[];
}

export interface IPopularItemDTO {
  id: number;
  image: string;
  name: string;
  amountSold: string;
  progressAmountSoldInPercent: number;
}

export interface IChartData {
  datasets: IData[];
  labels: string[];
}

export interface IData {
  backgroundColor: string;
  label: string;
  data: number[];
}
