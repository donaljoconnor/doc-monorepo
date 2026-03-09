import { http, HttpResponse } from "msw"
import type { PaymentAccountPageResponse } from "@api/types"
import { mockAccounts } from "./accounts.data"

// ─── Shared helpers ───────────────────────────────────────────────────────────

function applySearch<T>(items: T[], search: string, fields: (keyof T)[]): T[] {
  const q = search.toLowerCase()
  return items.filter((item) =>
    fields.some((f) => {
      const v = item[f]
      return typeof v === "string" && v.toLowerCase().includes(q)
    })
  )
}

function applySort<T>(items: T[], sort: string): T[] {
  const [field, direction] = sort.split(":")
  const asc = direction !== "desc"
  return [...items].sort((a, b) => {
    const av = (a as unknown as Record<string, unknown>)[field]
    const bv = (b as unknown as Record<string, unknown>)[field]
    if (av === undefined || bv === undefined) return 0
    if (typeof av === "number" && typeof bv === "number") return asc ? av - bv : bv - av
    return asc
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av))
  })
}

function paginate<T>(items: T[], pageNumber: number, pageSize: number) {
  const totalSize = items.length
  const totalPages = Math.max(1, Math.ceil(totalSize / pageSize))
  const start = (pageNumber - 1) * pageSize
  return { content: items.slice(start, start + pageSize), pageNumber, pageSize, totalPages, totalSize }
}

function pageParams(url: URL) {
  return {
    pageNumber: Number(url.searchParams.get("pageNumber") ?? 1),
    pageSize: Number(url.searchParams.get("pageSize") ?? 10),
    search: url.searchParams.get("search") ?? "",
    sort: url.searchParams.get("sort") ?? "",
  }
}

// ─── Handlers ─────────────────────────────────────────────────────────────────

export const handlers = [
  http.get("https://api.nofrixion.com/api/v1/accounts/paged", ({ request }) => {
    const { pageNumber, pageSize, search, sort } = pageParams(new URL(request.url))

    let results = mockAccounts
    if (search) results = applySearch(results, search, ["accountName", "currency", "bankName", "merchantName"])
    if (sort) results = applySort(results, sort)

    return HttpResponse.json<PaymentAccountPageResponse>(paginate(results, pageNumber, pageSize))
  }),

]
