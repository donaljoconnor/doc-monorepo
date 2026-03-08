import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type {
  CardCustomerToken,
  CardPaymentResponse,
  CardPublicKey,
  PaymentInitiationResponse,
  PaymentRequest,
  PaymentRequestCreate,
  PaymentRequestMetrics,
  PaymentRequestMinimal,
  PaymentRequestPageResponse,
  PaymentRequestResult,
  PaymentRequestUpdate,
  PaymentRequestsCreateResponse,
} from '../types'

export interface GetPaymentRequestsParams {
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
  tags?: string[]
  paymentMethods?: string[]
  sort?: string
}

export interface GetPaymentRequestMetricsParams {
  merchantID?: string
  fromDate?: string
  toDate?: string
  search?: string
  currency?: string
  minAmount?: number
  maxAmount?: number
  tags?: string[]
  paymentMethods?: string[]
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetPaymentRequests(params?: GetPaymentRequestsParams) {
  return useQuery({
    queryKey: ['paymentrequests', params],
    queryFn: () =>
      apiRequest<PaymentRequestPageResponse>('GET', '/api/v1/paymentrequests', params as Record<string, unknown>),
  })
}

export function useGetPaymentRequest(id: string, params?: { includeEvents?: boolean }) {
  return useQuery({
    queryKey: ['paymentrequests', id, params],
    queryFn: () =>
      apiRequest<PaymentRequest>('GET', `/api/v1/paymentrequests/${id}`, params as Record<string, unknown>),
    enabled: !!id,
  })
}

export function useGetPaymentRequestMinimal(id: string) {
  return useQuery({
    queryKey: ['paymentrequests', id, 'minimal'],
    queryFn: () =>
      apiRequest<PaymentRequestMinimal>('GET', `/api/v1/paymentrequests/${id}/minimal`),
    enabled: !!id,
  })
}

export function useGetPaymentRequestResult(id: string) {
  return useQuery({
    queryKey: ['paymentrequests', id, 'result'],
    queryFn: () =>
      apiRequest<PaymentRequestResult>('GET', `/api/v1/paymentrequests/${id}/result`),
    enabled: !!id,
  })
}

export function useGetPaymentRequestEvents(id: string) {
  return useQuery({
    queryKey: ['paymentrequests', id, 'events'],
    queryFn: () =>
      apiRequest<unknown[]>('GET', `/api/v1/paymentrequests/${id}/events`),
    enabled: !!id,
  })
}

export function useGetPaymentRequestForOrder(orderID: string) {
  return useQuery({
    queryKey: ['paymentrequests', 'order', orderID],
    queryFn: () =>
      apiRequest<PaymentRequest>('GET', `/api/v1/paymentrequests/getbyorderid/${orderID}`),
    enabled: !!orderID,
  })
}

export function useGetPaymentRequestMetrics(params?: GetPaymentRequestMetricsParams) {
  return useQuery({
    queryKey: ['paymentrequests', 'metrics', params],
    queryFn: () =>
      apiRequest<PaymentRequestMetrics>('GET', '/api/v1/paymentrequests/metrics', params as Record<string, unknown>),
  })
}

export function useGetPublicKeyForCardPayment(id: string) {
  return useQuery({
    queryKey: ['paymentrequests', id, 'card', 'publickey'],
    queryFn: () =>
      apiRequest<CardPublicKey>('GET', `/api/v1/paymentrequests/${id}/card/publickey`),
    enabled: !!id,
  })
}

export function useGetTokenisedCards(customerEmailAddress: string) {
  return useQuery({
    queryKey: ['paymentrequests', 'card', 'tokens', customerEmailAddress],
    queryFn: () =>
      apiRequest<CardCustomerToken[]>('GET', `/api/v1/paymentrequests/card/customertokens/${customerEmailAddress}`),
    enabled: !!customerEmailAddress,
  })
}

export function useGetTokenisedCardsForMerchant(merchantID: string, customerEmailAddress: string) {
  return useQuery({
    queryKey: ['paymentrequests', 'card', 'tokens', merchantID, customerEmailAddress],
    queryFn: () =>
      apiRequest<CardCustomerToken[]>('GET', `/api/v1/paymentrequests/card/customertokens/${merchantID}/${customerEmailAddress}`),
    enabled: !!merchantID && !!customerEmailAddress,
  })
}

export function useGetPaymentRequestTemplates(merchantID: string) {
  return useQuery({
    queryKey: ['paymentrequests', merchantID, 'templates'],
    queryFn: () =>
      apiRequest<unknown[]>('GET', `/api/v1/paymentrequests/${merchantID}/templates`),
    enabled: !!merchantID,
  })
}

export function useGetPaymentRequestTemplate(merchantID: string, templateID: string) {
  return useQuery({
    queryKey: ['paymentrequests', merchantID, 'templates', templateID],
    queryFn: () =>
      apiRequest<unknown>('GET', `/api/v1/paymentrequests/${merchantID}/templates/${templateID}`),
    enabled: !!merchantID && !!templateID,
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreatePaymentRequest() {
  return useMutation({
    mutationFn: (data: PaymentRequestCreate) =>
      apiRequest<PaymentRequest>('POST', '/api/v1/paymentrequests', undefined, data),
  })
}

export function useUpdatePaymentRequest() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PaymentRequestUpdate }) =>
      apiRequest<PaymentRequest>('PUT', `/api/v1/paymentrequests/${id}`, undefined, data),
  })
}

export function useDeletePaymentRequest() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>('DELETE', `/api/v1/paymentrequests/${id}`),
  })
}

export function useSubmitCardPayment() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data?: unknown }) =>
      apiRequest<CardPaymentResponse>('POST', `/api/v1/paymentrequests/${id}/card`, undefined, data),
  })
}

export function useCaptureCardPayment() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<CardPaymentResponse>('POST', `/api/v1/paymentrequests/${id}/card/capture`),
  })
}

export function useVoidCardPayment() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<CardPaymentResponse>('POST', `/api/v1/paymentrequests/${id}/card/void`),
  })
}

export function useRefundCardPayment() {
  return useMutation({
    mutationFn: ({ id, partialRefundAmount }: { id: string; partialRefundAmount: number }) =>
      apiRequest<CardPaymentResponse>('POST', `/api/v1/paymentrequests/${id}/card/refund/${partialRefundAmount}`),
  })
}

export function useVoidAllCardPayments() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<CardPaymentResponse>('POST', `/api/v1/paymentrequests/${id}/card/voidpaymentrequest`),
  })
}

export function useSubmitPayByBank() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data?: unknown }) =>
      apiRequest<PaymentInitiationResponse>('POST', `/api/v1/paymentrequests/${id}/pisp`, undefined, data),
  })
}

export function useDeleteTokenisedCard() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<CardCustomerToken>('DELETE', `/api/v1/paymentrequests/card/customertokens/${id}`),
  })
}

export function useDeleteAllTokenisedCards() {
  return useMutation({
    mutationFn: (customerEmailAddress: string) =>
      apiRequest<CardCustomerToken>('DELETE', `/api/v1/paymentrequests/card/customertokens/removeall/${customerEmailAddress}`),
  })
}

export function useDeleteAllTokenisedCardsForMerchant() {
  return useMutation({
    mutationFn: ({ merchantID, customerEmailAddress }: { merchantID: string; customerEmailAddress: string }) =>
      apiRequest<CardCustomerToken>('DELETE', `/api/v1/paymentrequests/card/customertokens/removeall/${merchantID}/${customerEmailAddress}`),
  })
}

export function useSubmitDirectDebitForMandate() {
  return useMutation({
    mutationFn: ({ id, mandateID, submitAfter }: { id: string; mandateID?: string; submitAfter?: string }) =>
      apiRequest<void>('POST', `/api/v1/paymentrequests/${id}/directdebit`, { mandateID, submitAfter }),
  })
}

export function useCreatePaymentRequests() {
  return useMutation({
    mutationFn: (data: PaymentRequestCreate[]) =>
      apiRequest<PaymentRequestsCreateResponse>('POST', '/api/v1/paymentrequests/batchcreate', undefined, data),
  })
}

export function useUpdatePaymentRequestTemplate() {
  return useMutation({
    mutationFn: ({ merchantID, templateID, data }: { merchantID: string; templateID: string; data: unknown }) =>
      apiRequest<unknown>('PUT', `/api/v1/paymentrequests/${merchantID}/templates/${templateID}`, undefined, data),
  })
}

export function useDeletePaymentRequestTemplate() {
  return useMutation({
    mutationFn: ({ merchantID, templateID }: { merchantID: string; templateID: string }) =>
      apiRequest<unknown>('DELETE', `/api/v1/paymentrequests/${merchantID}/templates/${templateID}`),
  })
}
