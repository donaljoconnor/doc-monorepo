import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AccountsDashboard } from '@/components/AccountsDashboard'

class AccountsDashboardElement extends HTMLElement {
  private root: Root | null = null
  private queryClient: QueryClient | null = null

  connectedCallback() {
    const mountPoint = document.createElement('div')
    this.appendChild(mountPoint)
    this.queryClient = new QueryClient()
    this.root = createRoot(mountPoint)
    this.root.render(
      <React.StrictMode>
        <QueryClientProvider client={this.queryClient}>
          <AccountsDashboard />
        </QueryClientProvider>
      </React.StrictMode>
    )
  }

  disconnectedCallback() {
    this.root?.unmount()
    this.root = null
    this.queryClient?.clear()
    this.queryClient = null
  }
}

customElements.define('accounts-dashboard', AccountsDashboardElement)
