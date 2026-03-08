import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '../client'
import type { Merchant, NoFrixionVersion, User } from '../types'

export function useVersion() {
  return useQuery({
    queryKey: ['metadata', 'version'],
    queryFn: () => apiRequest<NoFrixionVersion>('GET', '/api/v1/metadata/version'),
  })
}

export function useWhoAmI() {
  return useQuery({
    queryKey: ['metadata', 'whoami'],
    queryFn: () => apiRequest<User>('GET', '/api/v1/metadata/whoami'),
  })
}

export function useWhoAmIMerchant() {
  return useQuery({
    queryKey: ['metadata', 'whoamimerchant'],
    queryFn: () => apiRequest<Merchant>('GET', '/api/v1/metadata/whoamimerchant'),
  })
}

export function useWhoAmIMerchantWhitelist() {
  return useQuery({
    queryKey: ['metadata', 'whoamimerchantwhitelist'],
    queryFn: () => apiRequest<Merchant>('GET', '/api/v1/metadata/whoamimerchantwhitelist'),
  })
}

export function useWhoAmIMerchantSigned() {
  return useQuery({
    queryKey: ['metadata', 'whoamimerchantsigned'],
    queryFn: () => apiRequest<Merchant>('GET', '/api/v1/metadata/whoamimerchantsigned'),
  })
}

export function useWhoAmITrustedApplication() {
  return useQuery({
    queryKey: ['metadata', 'whoamitrustedapp'],
    queryFn: () => apiRequest<User>('GET', '/api/v1/metadata/whoamitrustedapp'),
  })
}
