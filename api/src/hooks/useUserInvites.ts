import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type { UserInvite, UserInviteCreate } from '../types'

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetUserInvite(id: string) {
  return useQuery({
    queryKey: ['userinvites', id],
    queryFn: () => apiRequest<UserInvite>('GET', `/api/v1/userinvites/${id}`),
    enabled: !!id,
  })
}

export function useGetUserInviteDetails(id: string) {
  return useQuery({
    queryKey: ['userinvites', id, 'details'],
    queryFn: () =>
      apiRequest<UserInvite>('GET', `/api/v1/userinvites/${id}/details`),
    enabled: !!id,
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useCreateUserInvite() {
  return useMutation({
    mutationFn: (data: UserInviteCreate) =>
      apiRequest<UserInvite>('POST', '/api/v1/userinvites', undefined, data),
  })
}

export function useDeleteUserInvite() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>('DELETE', `/api/v1/userinvites/${id}`),
  })
}

export function useResendUserInvite() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>('PUT', `/api/v1/userinvites/${id}`),
  })
}

export function useAuthoriseUserInvite() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>('POST', `/api/v1/userinvites/authorise/${id}`),
  })
}

export function useCreateUserInvites() {
  return useMutation({
    mutationFn: (data: UserInviteCreate[]) =>
      apiRequest<unknown>('POST', '/api/v1/userinvites/batchcreate', undefined, data),
  })
}
