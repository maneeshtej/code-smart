/* eslint-disable @typescript-eslint/no-explicit-any */
export interface apiResponseInterface {
  success: boolean;
  data: any;
  error: any;
  message: string;
  statusCode: number;
}

export interface standardResponseInterface {
  data: any;
  error: any;
}
