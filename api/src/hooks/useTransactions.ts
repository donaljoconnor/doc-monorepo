import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type { Transaction, TransactionPageResponse } from '../types'

export interface GetTransactionsParams {
  fromDate?: string
  pageNumber?: number
  pageSize?: number
  toDate?: string
  creditType?: string
}

export interface GetTransactionsForAccountParams extends GetTransactionsParams {
  search?: string
  sort?: string
  minAmount?: number
  maxAmount?: number
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetTransactions(params?: GetTransactionsParams) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () =>
      apiRequest<TransactionPageResponse>('GET', '/api/v1/transactions', params as Record<string, unknown>),
  })
}

export function useGetTransactionsForAccount(accountID: string, params?: GetTransactionsForAccountParams) {
  return useQuery({
    queryKey: ['transactions', accountID, params],
    queryFn: () =>
      apiRequest<TransactionPageResponse>('GET', `/api/v1/transactions/${accountID}`, params as Record<string, unknown>),
    enabled: !!accountID,
  })
}

export function useGetTransactionByID(id: string) {
  return useQuery({
    queryKey: ['transactions', 'detail', id],
    queryFn: () =>
      apiRequest<Transaction>('GET', `/api/v1/transactions/detail/${id}`),
    enabled: !!id,
  })
}

export function useGetTransactionsByAccountSequenceNumber(
  accountID: string,
  sequenceNumber: number,
  params?: { pageSize?: number },
) {
  return useQuery({
    queryKey: ['transactions', accountID, 'sequence', sequenceNumber, params],
    queryFn: () =>
      apiRequest<TransactionPageResponse>(
        'GET',
        `/api/v1/transactions/${accountID}/from/${sequenceNumber}`,
        params as Record<string, unknown>,
      ),
    enabled: !!accountID && sequenceNumber >= 0,
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useAddTransactionTags() {
  return useMutation({
    mutationFn: ({ id, tagIds }: { id: string; tagIds: string[] }) =>
      apiRequest<void>('POST', `/api/v1/transactions/${id}/tags`, undefined, tagIds),
  })
}

export function useRemoveTransactionTag() {
  return useMutation({
    mutationFn: ({ id, tagID }: { id: string; tagID: string }) =>
      apiRequest<void>('DELETE', `/api/v1/transactions/${id}/tag`, { tagID }),
  })
}
