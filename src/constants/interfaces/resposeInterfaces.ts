/* eslint-disable @typescript-eslint/no-explicit-any */
export interface apiResponseInterface {
  success: boolean;
  data: any;
  error: any;
  message: string;
  statusCode: number;
}

export interface StandardResponseInterface {
  success: boolean;
  data: any;
  error: any;
  message: string;
  statusCode?: number; // optional for internal use
}
