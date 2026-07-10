const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export interface ApiResponse<T> {
  success: boolean
  status: number
  code: string
  message: string
  data: T
  timestamp: string
}

async function request<TData>(path: string, init?: RequestInit): Promise<ApiResponse<TData>> {
  const res = await fetch(`${API_BASE_URL}${path}`, init)

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${res.statusText}`)
  }

  return res.json() as Promise<ApiResponse<TData>>
}

export function apiGet<TData>(path: string): Promise<ApiResponse<TData>> {
  return request<TData>(path)
}

export function apiPost<TData, TBody = undefined>(
  path: string,
  body?: TBody,
): Promise<ApiResponse<TData>> {
  return request<TData>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}

export function apiPatch<TData, TBody = undefined>(
  path: string,
  body?: TBody,
): Promise<ApiResponse<TData>> {
  return request<TData>(path, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}
