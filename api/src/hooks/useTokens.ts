import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type { MerchantToken, TokenAdd, TokenUpdate } from '../types'

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetToken(id: string) {
  return useQuery({
    queryKey: ['tokens', id],
    queryFn: () => apiRequest<MerchantToken>('GET', `/api/v1/tokens/${id}`),
    enabled: !!id,
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreateMerchantToken() {
  return useMutation({
    mutationFn: (data: TokenAdd) =>
      apiRequest<MerchantToken>('POST', '/api/v1/tokens', undefined, data),
  })
}

export function useUpdateMerchantToken() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TokenUpdate }) =>
      apiRequest<MerchantToken>('PUT', `/api/v1/tokens/${id}`, undefined, data),
  })
}

export function useArchiveToken() {
  return useMutation({
    mutationFn: (id: string) => apiRequest<void>('DELETE', `/api/v1/tokens/${id}`),
  })
}

export function useAuthoriseMerchantToken() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>('POST', `/api/v1/tokens/authorise/${id}`),
  })
}
