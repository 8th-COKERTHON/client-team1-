import { getDeviceId } from './deviceId'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export interface ApiResponse<T> {
  success: boolean
  status: number
  code: string
  message: string
  data: T
  timestamp: string
}

export class ApiError extends Error {
  status: number
  code?: string
  reasons?: Record<string, string>

  constructor(message: string, status: number, code?: string, reasons?: Record<string, string>) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.reasons = reasons
  }
}

async function request<TData>(path: string, init?: RequestInit): Promise<ApiResponse<TData>> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'X-Device-Id': getDeviceId(),
      ...init?.headers,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new ApiError(
      body?.message ?? `API request failed: ${res.status} ${res.statusText}`,
      res.status,
      body?.code,
      body?.reasons,
    )
  }

  return res.json() as Promise<ApiResponse<TData>>
}

export function apiGet<TData>(path: string): Promise<ApiResponse<TData>> {
  return request<TData>(path)
}

export function apiPost<TData, TBody = unknown>(
  path: string,
  body?: TBody,
): Promise<ApiResponse<TData>> {
  return request<TData>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}

export function apiPatch<TData, TBody = unknown>(
  path: string,
  body?: TBody,
): Promise<ApiResponse<TData>> {
  return request<TData>(path, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}

// FormData 요청은 Content-Type을 직접 지정하지 않아야 브라우저가 boundary를 자동으로 채워줌
export function apiPostForm<TData>(path: string, formData: FormData): Promise<ApiResponse<TData>> {
  return request<TData>(path, { method: 'POST', body: formData })
}

export function apiPatchForm<TData>(path: string, formData: FormData): Promise<ApiResponse<TData>> {
  return request<TData>(path, { method: 'PATCH', body: formData })
}
