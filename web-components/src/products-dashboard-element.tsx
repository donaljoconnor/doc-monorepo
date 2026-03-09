import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProductsDashboard } from '@/components/ProductsDashboard'

class ProductsDashboardElement extends HTMLElement {
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
          <ProductsDashboard />
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

customElements.define('products-dashboard', ProductsDashboardElement)
