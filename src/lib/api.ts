type ApiResponse<T = any> = { ok: boolean; status: number; data: T | null };

const API_BASE = ""; // adjust if your API is served at a different base path

export async function apiFetch(path: string, options: RequestInit & { authenticate?: boolean } = {}): Promise<ApiResponse> {
  const { authenticate = true, headers, ...rest } = options as any;
  const initHeaders: Record<string, string> = { ...(headers || {}) };

  if (rest.body && !initHeaders['Content-Type']) initHeaders['Content-Type'] = 'application/json';
  if (!initHeaders['Accept']) initHeaders['Accept'] = 'application/json';

  if (authenticate) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) initHeaders['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { headers: initHeaders, ...rest });

  if (res.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    try { window.dispatchEvent(new Event('auth:logout')); } catch {}
  }

  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  return { ok: res.ok, status: res.status, data };
}

export const apiGet = (path: string, opts?: RequestInit) => apiFetch(path, { method: 'GET', ...opts });
export const apiPost = (path: string, body?: any, opts?: RequestInit) => apiFetch(path, { method: 'POST', body: body !== undefined ? JSON.stringify(body) : undefined, ...opts });
export const apiPut = (path: string, body?: any, opts?: RequestInit) => apiFetch(path, { method: 'PUT', body: body !== undefined ? JSON.stringify(body) : undefined, ...opts });
export const apiDelete = (path: string, opts?: RequestInit) => apiFetch(path, { method: 'DELETE', ...opts });
