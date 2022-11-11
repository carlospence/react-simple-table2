import { HTMLAttributes } from "react";

export type CellResolverFunction<T = any> = (
  item: T,
  itemIndex?: number
) => JSX.Element | string;

export type CellResolver<T = any> = string | CellResolverFunction<T>;

export type ColumnVisibility =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | number;

export type TableColumn<T = any> = [
  string, // Column id
  JSX.Element | string, // Column label
  CellResolver<T>, // Column value resolver
  {
    sortable?: boolean;
    headerAttrs?: HTMLAttributes<HTMLTableHeaderCellElement>;
    bodyAttrs?: HTMLAttributes<HTMLTableCellElement>;
    visibility?: ColumnVisibility;
    headerVisibility?: ColumnVisibility;
  }? // Column Options
];

export interface SortData {
  id?: string;
  dir?: "asc" | "desc";
}

export interface SimpleTableProps<T> extends HTMLAttributes<HTMLTableElement> {
  cols: Array<TableColumn<T>>;
  data: Array<T>;
  dataKeyFn?: (item: T, index: number) => string;
  headAttrs?: HTMLAttributes<HTMLTableSectionElement>;
  bodyAttrs?: HTMLAttributes<HTMLTableSectionElement>;
  rowAttrsBuilder?: (
    item: T,
    index: number
  ) => HTMLAttributes<HTMLTableRowElement>;
  mobileCards?: boolean;
  sort?: SortData;
  onSort?: (data: SortData) => void;
  loading?: boolean;
}

export interface TransformedTableColumn {
  id: string;
  label: string | JSX.Element;
  resolver: CellResolver;
  sortable?: boolean;
  visible: boolean;
  headerVisible: boolean;
  headerAttrs?: HTMLAttributes<HTMLTableHeaderCellElement>;
  bodyAttrs?: HTMLAttributes<HTMLTableCellElement>;
}
