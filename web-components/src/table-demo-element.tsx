import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { TableDemo } from '@/components/TableDemo'

class TableDemoElement extends HTMLElement {
  private root: Root | null = null

  connectedCallback() {
    const mountPoint = document.createElement('div')
    this.appendChild(mountPoint)
    this.root = createRoot(mountPoint)
    this.root.render(
      <React.StrictMode>
        <TableDemo />
      </React.StrictMode>
    )
  }

  disconnectedCallback() {
    this.root?.unmount()
    this.root = null
  }
}

customElements.define('table-demo', TableDemoElement)
