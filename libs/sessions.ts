"use server";

import { cookies } from "next/headers";

export type ISession = {
  user?: {
    _id?: string;
    first_name?: string | null;
    last_name?: string | null;
    email?: string;
  };
  token?: string;
  refreshToken?: string;
};

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
};

export async function createSession(payload: ISession) {
  const cookieStore = await cookies();

  const existingToken = cookieStore.get("session")?.value;
  const existingUserId = cookieStore.get("user_id")?.value;

  if (!existingToken && payload.token) {
    cookieStore.set("session", payload.token, cookieOptions);
  }

  if (!existingUserId && payload.user?._id) {
    cookieStore.set("user_id", payload.user._id, cookieOptions);
  }

  if (payload.user?.first_name) {
    cookieStore.set("first_name", payload.user.first_name, cookieOptions);
  }

  if (payload.refreshToken) {
    cookieStore.set("refresh_token", payload.refreshToken, cookieOptions);
  }
}

export async function getSession(): Promise<{
  token?: string;
  user_id?: string;
  first_name?: string;
  refreshToken?: string;
}> {
  const cookieStore = await cookies();

  return {
    token: cookieStore.get("session")?.value,
    user_id: cookieStore.get("user_id")?.value,
    first_name: cookieStore.get("first_name")?.value,
    refreshToken: cookieStore.get("refresh_token")?.value,
  };
}

export async function deleteSession(payload?: Record<string, string>) {
  const cookieStore = await cookies();

  if (!payload) {
    // Default full clear
    ["session", "user_id", "first_name", "refresh_token"].forEach((key) =>
      cookieStore.delete(key)
    );
    return;
  }

  for (const key of Object.keys(payload)) {
    cookieStore.delete(key);
  }
}

export async function updateSession(newPayload: ISession) {
  await deleteSession();
  await createSession(newPayload);
}
