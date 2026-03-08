import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type {
  Beneficiary,
  BeneficiaryGroupPageResponse,
  BeneficiaryPageResponse,
  Merchant,
  MerchantAuthorisationSetting,
  MerchantPageResponse,
  MerchantPayByBankSettings,
  MerchantTokenPageResponse,
  MerchantUpdate,
  PaymentAccount,
  PayoutKeysetPageResponse,
  PayoutPageResponse,
  Tag,
  TransactionPageResponse,
  User,
  UserInvitePageResponse,
  Webhook,
} from '../types'

export interface GetMerchantsPagedParams {
  pageNumber?: number
  pageSize?: number
  search?: string
  sort?: string
  includeSuspended?: boolean
}

export interface GetMerchantBeneficiariesParams {
  pageNumber?: number
  pageSize?: number
  search?: string
  currency?: string
  includeDisabled?: boolean
  sort?: string
  sourceAccountID?: string
}

export interface GetMerchantPayoutsParams {
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

export interface GetMerchantTransactionsParams {
  pageNumber?: number
  pageSize?: number
  fromDate?: string
  toDate?: string
  includeChildMerchants?: boolean
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetMerchants() {
  return useQuery({
    queryKey: ['merchants'],
    queryFn: () => apiRequest<Merchant[]>('GET', '/api/v1/merchants'),
  })
}

export function useGetMerchantsPaged(params?: GetMerchantsPagedParams) {
  return useQuery({
    queryKey: ['merchants', 'paged', params],
    queryFn: () =>
      apiRequest<MerchantPageResponse>('GET', '/api/v1/merchants/paged', params as Record<string, unknown>),
  })
}

export function useGetMerchant(merchantID: string) {
  return useQuery({
    queryKey: ['merchants', merchantID],
    queryFn: () => apiRequest<Merchant>('GET', `/api/v1/merchants/${merchantID}`),
    enabled: !!merchantID,
  })
}

export function useGetMerchantBeneficiaries(merchantID: string, params?: GetMerchantBeneficiariesParams) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'beneficiaries', params],
    queryFn: () =>
      apiRequest<BeneficiaryPageResponse>('GET', `/api/v1/merchants/${merchantID}/beneficiaries`, params as Record<string, unknown>),
    enabled: !!merchantID,
  })
}

export function useGetMerchantBeneficiary(merchantID: string, id: string) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'beneficiaries', id],
    queryFn: () =>
      apiRequest<Beneficiary>('GET', `/api/v1/merchants/${merchantID}/beneficiaries/${id}`),
    enabled: !!merchantID && !!id,
  })
}

export function useGetMerchantBeneficiaryGroups(merchantID: string, params?: { pageNumber?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'beneficiarygroups', params],
    queryFn: () =>
      apiRequest<BeneficiaryGroupPageResponse>('GET', `/api/v1/merchants/${merchantID}/beneficiarygroups`, params as Record<string, unknown>),
    enabled: !!merchantID,
  })
}

export function useGetMerchantTokens(merchantID: string, params?: { pageNumber?: number; pageSize?: number }) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'tokens', params],
    queryFn: () =>
      apiRequest<MerchantTokenPageResponse>('GET', `/api/v1/merchants/${merchantID}/tokens`, params as Record<string, unknown>),
    enabled: !!merchantID,
  })
}

export function useGetMerchantAccounts(merchantID: string, params?: { connectedAccounts?: boolean }) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'accounts', params],
    queryFn: () =>
      apiRequest<PaymentAccount[]>('GET', `/api/v1/merchants/${merchantID}/accounts`, params as Record<string, unknown>),
    enabled: !!merchantID,
  })
}

export function useGetMerchantAccount(merchantID: string, accountID: string) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'accounts', accountID],
    queryFn: () =>
      apiRequest<PaymentAccount>('GET', `/api/v1/merchants/${merchantID}/accounts/${accountID}`),
    enabled: !!merchantID && !!accountID,
  })
}

export function useGetMerchantWebhooks(merchantID: string) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'webhooks'],
    queryFn: () =>
      apiRequest<Webhook[]>('GET', `/api/v1/merchants/${merchantID}/webhooks`),
    enabled: !!merchantID,
  })
}

export function useGetMerchantWebhook(merchantID: string, id: string) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'webhooks', id],
    queryFn: () =>
      apiRequest<Webhook>('GET', `/api/v1/merchants/${merchantID}/webhooks/${id}`),
    enabled: !!merchantID && !!id,
  })
}

export function useGetMerchantPayouts(merchantID: string, params?: GetMerchantPayoutsParams) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'payouts', params],
    queryFn: () =>
      apiRequest<PayoutPageResponse>('GET', `/api/v1/merchants/${merchantID}/payouts`, params as Record<string, unknown>),
    enabled: !!merchantID,
  })
}

export function useGetMerchantUsers(merchantID: string) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'users'],
    queryFn: () =>
      apiRequest<User[]>('GET', `/api/v1/merchants/${merchantID}/users`),
    enabled: !!merchantID,
  })
}

export function useGetMerchantBankSettings(merchantID: string, params?: { currency?: string; countryCode?: string; openBankingOperation?: string }) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'banksettings', params],
    queryFn: () =>
      apiRequest<MerchantPayByBankSettings>('GET', `/api/v1/merchants/${merchantID}/banksettings`, params as Record<string, unknown>),
    enabled: !!merchantID,
  })
}

export function useGetMerchantTags(merchantID: string) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'tags'],
    queryFn: () =>
      apiRequest<Tag[]>('GET', `/api/v1/merchants/${merchantID}/tags`),
    enabled: !!merchantID,
  })
}

export function useGetMerchantTransactions(merchantID: string, params?: GetMerchantTransactionsParams) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'transactions', params],
    queryFn: () =>
      apiRequest<TransactionPageResponse>('GET', `/api/v1/merchants/${merchantID}/transactions`, params as Record<string, unknown>),
    enabled: !!merchantID,
  })
}

export function useGetAuthorisationSettings(merchantID: string) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'authorisationsettings'],
    queryFn: () =>
      apiRequest<MerchantAuthorisationSetting>('GET', `/api/v1/merchants/${merchantID}/authorisationsettings`),
    enabled: !!merchantID,
  })
}

export function useGetFailedPayoutsForMerchant(merchantID: string, params?: { fromDateUtc?: string; pageSize?: number }) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'payouts', 'failed', params],
    queryFn: () =>
      apiRequest<PayoutKeysetPageResponse>('GET', `/api/v1/merchants/${merchantID}/payouts/failed`, params as Record<string, unknown>),
    enabled: !!merchantID,
  })
}

export function useGetChildMerchants(merchantID: string, params?: { pageNumber?: number; pageSize?: number; search?: string; sort?: string }) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'childmerchants', params],
    queryFn: () =>
      apiRequest<MerchantPageResponse>('GET', `/api/v1/merchants/${merchantID}/childmerchants`, params as Record<string, unknown>),
    enabled: !!merchantID,
  })
}

export function useGetMerchantUserInvitesPaged(merchantID: string, params?: { pageNumber?: number; pageSize?: number; search?: string; sort?: string }) {
  return useQuery({
    queryKey: ['merchants', merchantID, 'userinvites', params],
    queryFn: () =>
      apiRequest<UserInvitePageResponse>('GET', `/api/v1/merchants/${merchantID}/userinvitespaged`, params as Record<string, unknown>),
    enabled: !!merchantID,
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useUpdateMerchant() {
  return useMutation({
    mutationFn: ({ merchantID, data }: { merchantID: string; data: MerchantUpdate }) =>
      apiRequest<Merchant>('PUT', `/api/v1/merchants/${merchantID}`, undefined, data),
  })
}

export function useCreateMerchantTag() {
  return useMutation({
    mutationFn: ({ merchantID, data }: { merchantID: string; data: Tag }) =>
      apiRequest<Tag>('POST', `/api/v1/merchants/${merchantID}/tags`, undefined, data),
  })
}

export function useDeleteMerchantTag() {
  return useMutation({
    mutationFn: ({ merchantID, tagID }: { merchantID: string; tagID: string }) =>
      apiRequest<void>('DELETE', `/api/v1/merchants/${merchantID}/tags/${tagID}`),
  })
}

export function useDeleteUserFromMerchant() {
  return useMutation({
    mutationFn: ({ merchantId, userId }: { merchantId: string; userId: string }) =>
      apiRequest<void>('DELETE', `/api/v1/merchants/${merchantId}/users/${userId}`),
  })
}

export function useSuspendMerchant() {
  return useMutation({
    mutationFn: ({ merchantId, data }: { merchantId: string; data: { reason?: string } }) =>
      apiRequest<void>('PUT', `/api/v1/merchants/${merchantId}/suspend`, undefined, data),
  })
}

export function useCreateMerchantRoles() {
  return useMutation({
    mutationFn: ({ merchantID }: { merchantID: string }) =>
      apiRequest<unknown>('POST', `/api/v1/merchants/${merchantID}/roles/batchcreate`),
  })
}
