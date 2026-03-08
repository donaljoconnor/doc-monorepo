import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type { ReportResult } from '../types'

export function useGetReportResult(id: string, statementNumber: number) {
  return useQuery({
    queryKey: ['reports', id, statementNumber],
    queryFn: () =>
      apiRequest<ReportResult>('GET', `/api/v1/reports/${id}/result/${statementNumber}`),
    enabled: !!id && statementNumber >= 0,
  })
}

export function useInitiateReport() {
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<void>('PUT', `/api/v1/reports/${id}/initiate`),
  })
}
