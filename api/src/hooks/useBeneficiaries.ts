import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type {
  BeneficiariesCreateResponse,
  Beneficiary,
  BeneficiaryCreate,
  BeneficiaryPageResponse,
  BeneficiaryUpdate,
} from '../types'

export interface GetBeneficiariesParams {
  merchantID?: string
  pageNumber?: number
  pageSize?: number
  search?: string
  currency?: string
  includeDisabled?: boolean
  sort?: string
  sourceAccountID?: string
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetBeneficiaries(params?: GetBeneficiariesParams) {
  return useQuery({
    queryKey: ['beneficiaries', params],
    queryFn: () =>
      apiRequest<BeneficiaryPageResponse>('GET', '/api/v1/beneficiaries', params as Record<string, unknown>),
  })
}

export function useGetBeneficiary(id: string) {
  return useQuery({
    queryKey: ['beneficiaries', id],
    queryFn: () => apiRequest<Beneficiary>('GET', `/api/v1/beneficiaries/${id}`),
    enabled: !!id,
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreateBeneficiary() {
  return useMutation({
    mutationFn: (data: BeneficiaryCreate) =>
      apiRequest<Beneficiary>('POST', '/api/v1/beneficiaries', undefined, data),
  })
}

export function useUpdateBeneficiary() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BeneficiaryUpdate }) =>
      apiRequest<Beneficiary>('PUT', `/api/v1/beneficiaries/${id}`, undefined, data),
  })
}

export function useDeleteBeneficiary() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>('DELETE', `/api/v1/beneficiaries/${id}`),
  })
}

export function useAuthoriseBeneficiary() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>('POST', `/api/v1/beneficiaries/authorise/${id}`),
  })
}

export function useDisableBeneficiary() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<Beneficiary>('PUT', `/api/v1/beneficiaries/disable/${id}`),
  })
}

export function useEnableBeneficiary() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<Beneficiary>('PUT', `/api/v1/beneficiaries/enable/${id}`),
  })
}

export function useCreateBeneficiaries() {
  return useMutation({
    mutationFn: (data: BeneficiaryCreate[]) =>
      apiRequest<BeneficiariesCreateResponse>('POST', '/api/v1/beneficiaries/batchcreate', undefined, data),
  })
}
