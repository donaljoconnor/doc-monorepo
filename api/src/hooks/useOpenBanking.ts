import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type {
  Consent,
  ConsentRequest,
  ConsentResponse,
  PayeeVerificationResult,
  PaymentAccount,
  Transaction,
  VerifyPayeeRequest,
} from '../types'

export interface GetConnectedAccountTransactionsParams {
  offset?: number
  limit?: number
  transactionFrom?: string
  transactionTo?: string
  sortInsertedAscending?: boolean
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetConsent(id: string) {
  return useQuery({
    queryKey: ['openbanking', 'consents', id],
    queryFn: () => apiRequest<Consent>('GET', `/api/v1/openbanking/consents/${id}`),
    enabled: !!id,
  })
}

export function useGetConsents(merchantID: string, email: string) {
  return useQuery({
    queryKey: ['openbanking', 'consents', merchantID, email],
    queryFn: () =>
      apiRequest<Consent[]>('GET', `/api/v1/openbanking/consents/${merchantID}/${email}`),
    enabled: !!merchantID && !!email,
  })
}

export function useGetConnectedAccounts(id: string) {
  return useQuery({
    queryKey: ['openbanking', 'accounts', id],
    queryFn: () =>
      apiRequest<PaymentAccount[]>('GET', `/api/v1/openbanking/accounts/${id}`),
    enabled: !!id,
  })
}

export function useGetConnectedAccountTransactions(
  id: string,
  accountID: string,
  params?: GetConnectedAccountTransactionsParams,
) {
  return useQuery({
    queryKey: ['openbanking', 'transactions', id, accountID, params],
    queryFn: () =>
      apiRequest<Transaction[]>('GET', `/api/v1/openbanking/transactions/${id}/${accountID}`, params as Record<string, unknown>),
    enabled: !!id && !!accountID,
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreateConsent() {
  return useMutation({
    mutationFn: (data: ConsentRequest) =>
      apiRequest<ConsentResponse>('POST', '/api/v1/openbanking/consents', undefined, data),
  })
}

export function useDeleteConsent() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<Consent>('DELETE', `/api/v1/openbanking/consents/${id}`),
  })
}

export function useReauthoriseConsent() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<ConsentResponse>('PATCH', `/api/v1/openbanking/consents/${id}`),
  })
}

export function useDeleteAllConsents() {
  return useMutation({
    mutationFn: ({ merchantID, email }: { merchantID: string; email: string }) =>
      apiRequest<void>('DELETE', `/api/v1/openbanking/consents/${merchantID}/${email}`),
  })
}

export function useSynchroniseConnectedAccount() {
  return useMutation({
    mutationFn: (accountID: string) =>
      apiRequest<void>('POST', `/api/v1/openbanking/account/${accountID}/synchronise`),
  })
}

export function useDeleteConnectedAccount() {
  return useMutation({
    mutationFn: (accountID: string) =>
      apiRequest<void>('DELETE', `/api/v1/openbanking/account/${accountID}`),
  })
}

export function useVerifyPayee() {
  return useMutation({
    mutationFn: (data: VerifyPayeeRequest) =>
      apiRequest<PayeeVerificationResult>('POST', '/api/v1/openbanking/payeeverification', undefined, data),
  })
}
