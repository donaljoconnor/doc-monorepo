import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type { Rule, RuleCreate, RulesPageResponse, RuleUpdate } from '../types'

export interface GetRulesPagedParams {
  merchantID?: string
  page?: number
  size?: number
  sort?: string
  search?: string
  archivedOnly?: boolean
}

export interface GetRuleEventsParams {
  page?: number
  size?: number
  eventTypes?: string[]
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetRulesPaged(params?: GetRulesPagedParams) {
  return useQuery({
    queryKey: ['rules', params],
    queryFn: () =>
      apiRequest<RulesPageResponse>('GET', '/api/v1/rules', params as Record<string, unknown>),
  })
}

export function useGetRule(id: string) {
  return useQuery({
    queryKey: ['rules', id],
    queryFn: () => apiRequest<Rule>('GET', `/api/v1/rules/${id}`),
    enabled: !!id,
  })
}

export function useGetRuleEvents(id: string, params?: GetRuleEventsParams) {
  return useQuery({
    queryKey: ['rules', id, 'events', params],
    queryFn: () =>
      apiRequest<unknown>('GET', `/api/v1/rules/${id}/events`, params as Record<string, unknown>),
    enabled: !!id,
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreateRule() {
  return useMutation({
    mutationFn: (data: RuleCreate) =>
      apiRequest<Rule>('POST', '/api/v1/rules', undefined, data),
  })
}

export function useUpdateRule() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RuleUpdate }) =>
      apiRequest<Rule>('PUT', `/api/v1/rules/${id}`, undefined, data),
  })
}

export function useDeleteRule() {
  return useMutation({
    mutationFn: (id: string) => apiRequest<void>('DELETE', `/api/v1/rules/${id}`),
  })
}

export function useDisableRule() {
  return useMutation({
    mutationFn: (id: string) => apiRequest<void>('PUT', `/api/v1/rules/${id}/disable`),
  })
}
