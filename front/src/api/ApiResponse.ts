export interface ApiResponse<T> {
  data?: T,
  status: number,
  hasError?: boolean,
}
