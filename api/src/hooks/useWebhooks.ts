import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type { Webhook, WebhookCreate, WebhookUpdate } from '../types'

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetWebhooks(merchantID: string) {
  return useQuery({
    queryKey: ['webhooks', merchantID],
    queryFn: () =>
      apiRequest<Webhook[]>('GET', `/api/v1/webhooks/${merchantID}`),
    enabled: !!merchantID,
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreateWebhook() {
  return useMutation({
    mutationFn: (data: WebhookCreate) =>
      apiRequest<Webhook>('POST', '/api/v1/webhooks', undefined, data),
  })
}

export function useUpdateWebhook() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: WebhookUpdate }) =>
      apiRequest<Webhook>('PUT', `/api/v1/webhooks/${id}`, undefined, data),
  })
}

export function useDeleteWebhook() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>('DELETE', `/api/v1/webhooks/${id}`),
  })
}
