import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type {
  AccountUpdate,
  GenerateStatementRequest,
  PaymentAccount,
  PaymentAccountCreate,
  PaymentAccountMinimalPageResponse,
  PaymentAccountPageResponse,
  Payout,
  PayoutKeysetPageResponse,
  PayoutPageResponse,
  Transaction,
  TransactionPageResponse,
  VirtualAccountCreate,
  VirtualAccountUpdate,
} from '../types'

// ─── Params ───────────────────────────────────────────────────────────────────

export interface GetAccountsParams {
  merchantID?: string
  connectedAccounts?: boolean
  onlyConnectAccounts?: boolean
  includeArchived?: boolean
}

export interface GetAccountsPagedParams {
  merchantID?: string
  currency?: string[]
  connectedAccounts?: boolean
  pageNumber?: number
  pageSize?: number
  search?: string
  sort?: string
  onlyConnectAccounts?: boolean
  onlyArchived?: boolean
  includeArchived?: boolean
  includeChildMerchants?: boolean
}

export interface GetAccountsMinimalParams extends GetAccountsPagedParams {}

export interface GetAccountTransactionsParams {
  fromDate?: string
  toDate?: string
  pageNumber?: number
  pageSize?: number
  creditType?: string
  search?: string
  sort?: string
  minAmount?: number
  maxAmount?: number
}

export interface GetAccountPayoutsParams {
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

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetAccounts(params?: GetAccountsParams) {
  return useQuery({
    queryKey: ['accounts', params],
    queryFn: () =>
      apiRequest<PaymentAccount[]>('GET', '/api/v1/accounts', params as Record<string, unknown>),
  })
}

export function useGetAccountsPaged(params?: GetAccountsPagedParams) {
  return useQuery({
    queryKey: ['accounts', 'paged', params],
    queryFn: () =>
      apiRequest<PaymentAccountPageResponse>('GET', '/api/v1/accounts/paged', params as Record<string, unknown>),
  })
}

export function useGetAccountsMinimal(params?: GetAccountsMinimalParams) {
  return useQuery({
    queryKey: ['accounts', 'minimal', params],
    queryFn: () =>
      apiRequest<PaymentAccountMinimalPageResponse>('GET', '/api/v1/accounts/minimal', params as Record<string, unknown>),
  })
}

export function useGetAccount(accountID: string) {
  return useQuery({
    queryKey: ['accounts', accountID],
    queryFn: () => apiRequest<PaymentAccount>('GET', `/api/v1/accounts/${accountID}`),
    enabled: !!accountID,
  })
}

export function useGetAccountTransactions(accountID: string, params?: GetAccountTransactionsParams) {
  return useQuery({
    queryKey: ['accounts', accountID, 'transactions', params],
    queryFn: () =>
      apiRequest<TransactionPageResponse>('GET', `/api/v1/accounts/${accountID}/transactions`, params as Record<string, unknown>),
    enabled: !!accountID,
  })
}

export function useGetTransactionForAccount(accountID: string, id: string) {
  return useQuery({
    queryKey: ['accounts', accountID, 'transactions', id],
    queryFn: () =>
      apiRequest<Transaction>('GET', `/api/v1/accounts/${accountID}/transactions/${id}`),
    enabled: !!accountID && !!id,
  })
}

export function useGetAccountPayouts(accountID: string, params?: GetAccountPayoutsParams) {
  return useQuery({
    queryKey: ['accounts', accountID, 'payouts', params],
    queryFn: () =>
      apiRequest<PayoutPageResponse>('GET', `/api/v1/accounts/${accountID}/payouts`, params as Record<string, unknown>),
    enabled: !!accountID,
  })
}

export function useGetFailedPayoutsForAccount(accountID: string, params?: { fromDateUtc?: string; pageSize?: number }) {
  return useQuery({
    queryKey: ['accounts', accountID, 'payouts', 'failed', params],
    queryFn: () =>
      apiRequest<PayoutKeysetPageResponse>('GET', `/api/v1/accounts/${accountID}/payouts/failed`, params as Record<string, unknown>),
    enabled: !!accountID,
  })
}

export function useGetVirtualAccounts(accountID: string, params?: { pageNumber?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['accounts', accountID, 'virtual', params],
    queryFn: () =>
      apiRequest<PaymentAccountPageResponse>('GET', `/api/v1/accounts/${accountID}/virtual`, params as Record<string, unknown>),
    enabled: !!accountID,
  })
}

export function useGetAllAccountStatements() {
  return useQuery({
    queryKey: ['accounts', 'statements'],
    queryFn: () => apiRequest<unknown>('GET', '/api/v1/accounts/statements'),
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreateAccount() {
  return useMutation({
    mutationFn: (data: PaymentAccountCreate) =>
      apiRequest<PaymentAccount>('POST', '/api/v1/accounts', undefined, data),
  })
}

export function useUpdateAccount() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AccountUpdate }) =>
      apiRequest<PaymentAccount>('PUT', `/api/v1/accounts/${id}`, undefined, data),
  })
}

export function useArchiveAccount() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>('DELETE', `/api/v1/accounts/archive/${id}`),
  })
}

export function useUnarchiveAccount() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>('PUT', `/api/v1/accounts/unarchive/${id}`),
  })
}

export function useTopupAccount() {
  return useMutation({
    mutationFn: ({ accountID, amount }: { accountID: string; amount: number }) =>
      apiRequest<Payout>('PUT', `/api/v1/accounts/${accountID}/topup/${amount}`),
  })
}

export function useGenerateAccountStatement() {
  return useMutation({
    mutationFn: ({ accountID, data }: { accountID: string; data: GenerateStatementRequest }) =>
      apiRequest<unknown>('POST', `/api/v1/accounts/${accountID}/statements`, undefined, data),
  })
}

export function useClearAccountStatements() {
  return useMutation({
    mutationFn: () => apiRequest<void>('DELETE', '/api/v1/accounts/statements'),
  })
}

export function useCreateVirtualAccount() {
  return useMutation({
    mutationFn: ({ accountID, data }: { accountID: string; data: VirtualAccountCreate }) =>
      apiRequest<PaymentAccount>('POST', `/api/v1/accounts/${accountID}/virtual`, undefined, data),
  })
}

export function useUpdateVirtualAccount() {
  return useMutation({
    mutationFn: ({ accountID, virtualAccountID, data }: { accountID: string; virtualAccountID: string; data: VirtualAccountUpdate }) =>
      apiRequest<PaymentAccount>('PUT', `/api/v1/accounts/${accountID}/virtual/${virtualAccountID}`, undefined, data),
  })
}

export function useCreateAccountForAdditionalCurrency() {
  return useMutation({
    mutationFn: ({ accountID, currency }: { accountID: string; currency: string }) =>
      apiRequest<PaymentAccount>('POST', `/api/v1/accounts/${accountID}/${currency}`),
  })
}
