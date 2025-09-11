/* eslint-disable @typescript-eslint/no-explicit-any */
export function apiResponse(
  success: boolean,
  data: any = null,
  error: any = null,
  message: string = "",
  statusCode: number = 200
) {
  return new Response(
    JSON.stringify({
      success,
      data,
      error,
      message,
      statusCode,
    }),
    {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function standardResponse(
  success: boolean,
  data: any,
  error: any,
  message: string
) {
  return {
    success,
    data,
    error,
    message,
  };
}
