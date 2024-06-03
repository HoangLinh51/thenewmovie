import { CustomCode } from './http.enum';

export interface SingleResponse<T = unknown> {
  message: string;
  customCode: CustomCode;
  data: T;
  exception: string;
  supportMessage: string;
}

export type ListResponse<T> = SingleResponse<T[]>;

export type PagingResponse<T> = SingleResponse<PagingData<T>>;

export interface PagingData<T> {
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  data: T[];
}
