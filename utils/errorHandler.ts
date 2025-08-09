import ApiError from "./ApiError";

export function handleError(error: unknown) {
  console.error("[API_ERROR]", error);

  if (error instanceof ApiError) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: error.statusCode, headers: { "Content-Type": "application/json" } }
    );
  }

  // Handle MongoDB duplicate key error
  if ((error as any)?.code === 11000) {
    const field = Object.keys((error as any).keyPattern || {})[0];
    return new Response(
      JSON.stringify({ success: false, message: `${field} already exists.` }),
      { status: 409, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: false, message: "Internal Server Error" }),
    { status: 500, headers: { "Content-Type": "application/json" } }
  );
}
