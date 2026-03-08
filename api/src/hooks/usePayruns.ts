import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type {
  Payrun,
  PayrunApprove,
  PayrunAuthorisation,
  PayrunCreate,
  PayrunPageResponse,
  PayrunReject,
  PayrunUpdate,
} from '../types'

export interface GetPayrunsPagedParams {
  merchantID?: string
  pageNumber?: number
  pageSize?: number
  fromDate?: string
  toDate?: string
  sort?: string
  statuses?: string[]
  search?: string
  onlyArchived?: boolean
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetPayrunsPaged(params?: GetPayrunsPagedParams) {
  return useQuery({
    queryKey: ['payruns', params],
    queryFn: () =>
      apiRequest<PayrunPageResponse>('GET', '/api/v1/payruns', params as Record<string, unknown>),
  })
}

export function useGetPayrun(id: string) {
  return useQuery({
    queryKey: ['payruns', id],
    queryFn: () => apiRequest<Payrun>('GET', `/api/v1/payruns/${id}`),
    enabled: !!id,
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreatePayrun() {
  return useMutation({
    mutationFn: ({ merchantID, data }: { merchantID: string; data: PayrunCreate }) =>
      apiRequest<Payrun>('POST', `/api/v1/payruns/${merchantID}`, undefined, data),
  })
}

export function useUpdatePayrun() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PayrunUpdate }) =>
      apiRequest<Payrun>('PUT', `/api/v1/payruns/${id}`, undefined, data),
  })
}

export function useDeletePayrun() {
  return useMutation({
    mutationFn: (id: string) => apiRequest<void>('DELETE', `/api/v1/payruns/${id}`),
  })
}

export function useSubmitPayrun() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data?: PayrunApprove }) =>
      apiRequest<void>('POST', `/api/v1/payruns/${id}/submit`, undefined, data),
  })
}

export function useRequestPayrunAuthorisation() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data?: PayrunAuthorisation }) =>
      apiRequest<void>('POST', `/api/v1/payruns/${id}/request-authorisation`, undefined, data),
  })
}

export function useRejectPayrun() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data?: PayrunReject }) =>
      apiRequest<Payrun>('PUT', `/api/v1/payruns/${id}/reject`, undefined, data),
  })
}

export function useArchivePayrun() {
  return useMutation({
    mutationFn: (id: string) => apiRequest<void>('DELETE', `/api/v1/payruns/${id}/archive`),
  })
}

export function useUnarchivePayrun() {
  return useMutation({
    mutationFn: (id: string) => apiRequest<void>('PUT', `/api/v1/payruns/${id}/unarchive`),
  })
}

export function useCancelPayrun() {
  return useMutation({
    mutationFn: (id: string) => apiRequest<void>('PUT', `/api/v1/payruns/${id}/cancel`),
  })
}
