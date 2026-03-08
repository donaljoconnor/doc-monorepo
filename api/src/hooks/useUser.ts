import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type { User, UserPageResponse, UserUpdate } from '../types'

// ─── Queries ──────────────────────────────────────────────────────────────────

export function useGetUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => apiRequest<User>('GET', '/api/v1/user'),
  })
}

export function useGetUsersPaged(
  merchantID: string,
  params?: { pageNumber?: number; pageSize?: number; search?: string; sort?: string },
) {
  return useQuery({
    queryKey: ['user', merchantID, 'paged', params],
    queryFn: () =>
      apiRequest<UserPageResponse>('GET', `/api/v1/user/${merchantID}/userspaged`, params as Record<string, unknown>),
    enabled: !!merchantID,
  })
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useUpdateUser() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserUpdate }) =>
      apiRequest<User>('PUT', `/api/v1/user/${id}`, undefined, data),
  })
}
