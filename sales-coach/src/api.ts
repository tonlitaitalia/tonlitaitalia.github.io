export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const response = await fetch(`/api${path}`, {
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "content-type": "application/json" }),
      ...(options.headers ?? {})
    },
    ...options
  });
  const data: unknown = await response.json().catch(() => ({}));
  const record = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  const errorMessage = typeof record.error === "string" ? record.error : `Request failed: ${response.status}`;
  if (!response.ok || record.ok === false) throw new Error(errorMessage);
  return data as T;
}

export const postJson = <T>(path: string, body: unknown) =>
  api<T>(path, {
    method: "POST",
    body: JSON.stringify(body)
  });
