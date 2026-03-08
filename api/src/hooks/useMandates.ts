import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type { Mandate, MandateCreate, MandatePageResponse } from '../types'

export interface GetMandatesPagedParams {
  merchantID?: string
  page?: number
  size?: number
  fromDate?: string
  toDate?: string
  status?: string
  search?: string
  currency?: string
  minAmount?: number
  maxAmount?: number
  sort?: string
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetMandate(id: string) {
  return useQuery({
    queryKey: ['mandates', id],
    queryFn: () => apiRequest<Mandate>('GET', `/api/v1/mandates/${id}`),
    enabled: !!id,
  })
}

export function useGetMandatesPaged(params?: GetMandatesPagedParams) {
  return useQuery({
    queryKey: ['mandates', params],
    queryFn: () =>
      apiRequest<MandatePageResponse>('GET', '/api/v1/mandates', params as Record<string, unknown>),
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreateMandate() {
  return useMutation({
    mutationFn: (data: MandateCreate) =>
      apiRequest<Mandate>('POST', '/api/v1/mandates', undefined, data),
  })
}
