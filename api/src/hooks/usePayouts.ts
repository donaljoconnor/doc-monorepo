import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type {
  BatchPayout,
  FxRate,
  Payout,
  PayoutCreate,
  PayoutKeysetPageResponse,
  PayoutMetrics,
  PayoutPageResponse,
  PayoutReject,
  PayoutUpdate,
} from '../types'

export interface GetPayoutsParams {
  merchantID?: string
  pageNumber?: number
  pageSize?: number
  statuses?: string[]
  fromDate?: string
  toDate?: string
  search?: string
  currency?: string
  minAmount?: number
  maxAmount?: number
  tags?: string[]
  sort?: string
}

export interface GetPayoutMetricsParams {
  merchantID?: string
  fromDate?: string
  toDate?: string
  search?: string
  currency?: string
  minAmount?: number
  maxAmount?: number
  tags?: string[]
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetPayouts(params?: GetPayoutsParams) {
  return useQuery({
    queryKey: ['payouts', params],
    queryFn: () =>
      apiRequest<PayoutPageResponse>('GET', '/api/v1/payouts', params as Record<string, unknown>),
  })
}

export function useGetPayout(id: string) {
  return useQuery({
    queryKey: ['payouts', id],
    queryFn: () => apiRequest<Payout>('GET', `/api/v1/payouts/${id}`),
    enabled: !!id,
  })
}

export function useGetPayoutMetrics(params?: GetPayoutMetricsParams) {
  return useQuery({
    queryKey: ['payouts', 'metrics', params],
    queryFn: () =>
      apiRequest<PayoutMetrics>('GET', '/api/v1/payouts/metrics', params as Record<string, unknown>),
  })
}

export function useGetBatchPayout(id: string) {
  return useQuery({
    queryKey: ['payouts', 'batch', id],
    queryFn: () => apiRequest<BatchPayout>('GET', `/api/v1/payouts/batch/${id}`),
    enabled: !!id,
  })
}

export function useGetFailedPayouts(merchantID: string, params?: { fromDateUtc?: string; pageSize?: number }) {
  return useQuery({
    queryKey: ['payouts', merchantID, 'failed', params],
    queryFn: () =>
      apiRequest<PayoutKeysetPageResponse>('GET', `/api/v1/payouts/${merchantID}/failed`, params as Record<string, unknown>),
    enabled: !!merchantID,
  })
}

export function useGetFxQuote(source: string, destination: string, amount: number) {
  return useQuery({
    queryKey: ['payouts', 'fxquote', source, destination, amount],
    queryFn: () =>
      apiRequest<FxRate>('GET', `/api/v1/payouts/fxquote/${source}/${destination}/${amount}`),
    enabled: !!source && !!destination && amount > 0,
  })
}

export function useGetFxHeldRate(source: string, destination: string, validForMinutes: number) {
  return useQuery({
    queryKey: ['payouts', 'fxheldrate', source, destination, validForMinutes],
    queryFn: () =>
      apiRequest<FxRate>('GET', `/api/v1/payouts/fxheldrate/${source}/${destination}/${validForMinutes}`),
    enabled: !!source && !!destination,
  })
}

export function useGetAllFxHeldRates(source: string, destination: string) {
  return useQuery({
    queryKey: ['payouts', 'fxallheldrates', source, destination],
    queryFn: () =>
      apiRequest<FxRate[]>('GET', `/api/v1/payouts/fxallheldrates/${source}/${destination}`),
    enabled: !!source && !!destination,
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreatePayout() {
  return useMutation({
    mutationFn: (data: PayoutCreate) =>
      apiRequest<Payout>('POST', '/api/v1/payouts', undefined, data),
  })
}

export function useUpdatePayout() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PayoutUpdate }) =>
      apiRequest<Payout>('PUT', `/api/v1/payouts/${id}`, undefined, data),
  })
}

export function useDeletePayout() {
  return useMutation({
    mutationFn: (id: string) => apiRequest<void>('DELETE', `/api/v1/payouts/${id}`),
  })
}

export function useSubmitPayout() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>('POST', `/api/v1/payouts/submit/${id}`),
  })
}

export function useCancelScheduledPayout() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<Payout>('PUT', `/api/v1/payouts/cancel/${id}`),
  })
}

export function useRejectPayout() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PayoutReject }) =>
      apiRequest<Payout>('PUT', `/api/v1/payouts/reject/${id}`, undefined, data),
  })
}

export function useSendPayout() {
  return useMutation({
    mutationFn: (data: PayoutCreate) =>
      apiRequest<Payout>('POST', '/api/v1/payouts/send', undefined, data),
  })
}

export function useSendToBeneficiary() {
  return useMutation({
    mutationFn: (data: PayoutCreate) =>
      apiRequest<Payout>('POST', '/api/v1/payouts/sendbeneficiary', undefined, data),
  })
}

export function useCreateBatchPayout() {
  return useMutation({
    mutationFn: (data: unknown) =>
      apiRequest<BatchPayout>('POST', '/api/v1/payouts/batch', undefined, data),
  })
}

export function useSubmitBatchPayout() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>('POST', `/api/v1/payouts/batch/submit/${id}`),
  })
}

export function useCreatePayouts() {
  return useMutation({
    mutationFn: (data: PayoutCreate[]) =>
      apiRequest<unknown>('POST', '/api/v1/payouts/batchcreate', undefined, data),
  })
}

export function useDeletePayouts() {
  return useMutation({
    mutationFn: (ids?: string[]) =>
      apiRequest<void>('DELETE', '/api/v1/payouts/batchdelete', undefined, ids),
  })
}
