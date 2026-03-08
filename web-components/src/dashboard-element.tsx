import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DashboardPage } from '@/app/dashboard/page'

class DashboardElement extends HTMLElement {
  private root: Root | null = null

  connectedCallback() {
    const mountPoint = document.createElement('div')
    this.appendChild(mountPoint)
    this.root = createRoot(mountPoint)
    this.root.render(
      <React.StrictMode>
        <TooltipProvider>
          <DashboardPage />
        </TooltipProvider>
      </React.StrictMode>
    )
  }

  disconnectedCallback() {
    this.root?.unmount()
    this.root = null
  }
}

customElements.define('dashboard-page', DashboardElement)
