import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { ActionSearchBar } from '@/components/ui/action-search-bar'

class ActionSearchBarElement extends HTMLElement {
  private root: Root | null = null

  connectedCallback() {
    const mountPoint = document.createElement('div')
    this.appendChild(mountPoint)
    this.root = createRoot(mountPoint)
    this.root.render(
      <React.StrictMode>
        <ActionSearchBar />
      </React.StrictMode>
    )
  }

  disconnectedCallback() {
    this.root?.unmount()
    this.root = null
  }
}

customElements.define('action-search-bar', ActionSearchBarElement)
