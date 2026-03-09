import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowUpDownIcon,
  SearchIcon,
} from "lucide-react"
import { useGetProducts } from "@/hooks/useProducts"
import type { Product } from "@/mocks/products.data"

// ─── Rating dots ─────────────────────────────────────────────────────────────
function RatingDots({ value }: { value: number }) {
  const filled = Math.round(value)
  return (
    <div className="flex items-center gap-0.75">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="inline-block size-1.75 rounded-full"
          style={{
            background: i < filled ? "#E54D2E" : "#D9D9D6",
            opacity: i < filled ? 1 : 0.5,
          }}
        />
      ))}
      <span
        className="ml-1.5 text-[11px] tabular-nums"
        style={{ color: "#6F6F6B" }}
      >
        {value.toFixed(1)}
      </span>
    </div>
  )
}

// ─── Stock badge ──────────────────────────────────────────────────────────────
function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span
        className="text-[11px] tracking-wide uppercase"
        style={{ color: "#A8A8A4" }}
      >
        Out
      </span>
    )
  }
  const level = stock > 50 ? "high" : stock > 10 ? "mid" : "low"
  const color = level === "high" ? "#3D9A60" : level === "mid" ? "#D97706" : "#E54D2E"
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block size-1.5 rounded-full"
        style={{ background: color }}
      />
      <span className="tabular-nums text-sm" style={{ color: "#111110" }}>
        {stock.toLocaleString()}
      </span>
    </span>
  )
}

// ─── Sort icon ────────────────────────────────────────────────────────────────
function SortIcon({ isSorted }: { isSorted: false | "asc" | "desc" }) {
  const cls = "ml-1 inline size-3"
  if (isSorted === "asc") return <ArrowUpIcon className={cls} style={{ color: "#E54D2E" }} />
  if (isSorted === "desc") return <ArrowDownIcon className={cls} style={{ color: "#E54D2E" }} />
  return <ArrowUpDownIcon className={cls} style={{ color: "#C4C4C0" }} />
}

// ─── Thumbnail hover cell ─────────────────────────────────────────────────────
function ProductTitle({ product }: { product: Product }) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <span
      className="relative inline-flex items-center gap-2 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && product.thumbnail && (
        <span
          className="absolute bottom-full left-0 z-50 mb-2 block rounded overflow-hidden shadow-xl"
          style={{
            width: 120,
            height: 120,
            border: "1px solid #E5E5E3",
            background: "#FFF",
          }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="size-full object-contain p-1"
          />
        </span>
      )}
      <span className="font-medium text-sm" style={{ color: "#111110" }}>
        {product.title}
      </span>
    </span>
  )
}

// ─── Columns ──────────────────────────────────────────────────────────────────
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: "Product",
    cell: ({ row }) => <ProductTitle product={row.original} />,
    enableSorting: true,
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => (
      <span
        className="text-xs tracking-widest uppercase"
        style={{ color: "#6F6F6B" }}
      >
        {row.original.brand}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span
        className="inline-block rounded-sm px-2 py-0.5 text-[11px] tracking-wide uppercase"
        style={{
          background: "#F0F0EE",
          color: "#6F6F6B",
          border: "1px solid #E5E5E3",
        }}
      >
        {row.original.category}
      </span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price
      const discount = row.original.discountPercentage
      const discounted = price * (1 - discount / 100)
      return (
        <div className="text-right">
          <span className="text-sm font-semibold tabular-nums" style={{ color: "#111110" }}>
            ${discounted.toFixed(2)}
          </span>
          {discount > 0.1 && (
            <span
              className="ml-1.5 text-xs tabular-nums line-through"
              style={{ color: "#A8A8A4" }}
            >
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: "discountPercentage",
    header: "Off",
    cell: ({ row }) => {
      const d = row.original.discountPercentage
      if (d < 0.1) return <span style={{ color: "#C4C4C0" }}>—</span>
      return (
        <span
          className="text-xs font-medium tabular-nums px-1.5 py-0.5 rounded-sm"
          style={{ background: "#FEE9E5", color: "#E54D2E" }}
        >
          -{d.toFixed(0)}%
        </span>
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => <RatingDots value={row.original.rating} />,
    enableSorting: true,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <StockBadge stock={row.original.stock} />,
    enableSorting: true,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.tags.length === 0 ? (
          <span style={{ color: "#C4C4C0" }}>—</span>
        ) : (
          row.original.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-wide uppercase px-1.5 py-0.5 rounded-sm"
              style={{ background: "#F5F5F3", color: "#8C8C88", border: "1px solid #E5E5E3" }}
            >
              {tag}
            </span>
          ))
        )}
        {row.original.tags.length > 3 && (
          <span className="text-[10px]" style={{ color: "#A8A8A4" }}>
            +{row.original.tags.length - 3}
          </span>
        )}
      </div>
    ),
    enableSorting: false,
  },
]

// ─── Main component ───────────────────────────────────────────────────────────
export function ProductsDashboard() {
  const [globalFilter, setGlobalFilter] = React.useState("")

  // Reset to first page whenever search changes
  React.useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }))
  }, [globalFilter])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading, isError } = useGetProducts({
    limit: pagination.pageSize,
    skip: pagination.pageIndex * pagination.pageSize,
  })

  const table = useReactTable({
    data: data?.products ?? [],
    columns,
    rowCount: data?.total ?? 0,
    state: { globalFilter, sorting, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const total = data?.total ?? 0

  return (
    <div
      className="min-h-screen"
      style={{ background: "#FAFAF8", fontFamily: "var(--font-sans)" }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-end justify-between px-8 pt-10 pb-5"
        style={{ borderBottom: "1.5px solid #111110" }}
      >
        <div className="flex items-baseline gap-4">
          <h1
            className="text-[11px] font-semibold tracking-[0.25em] uppercase"
            style={{ color: "#111110" }}
          >
            Products
          </h1>
          {data && (
            <span
              className="text-[11px] tabular-nums"
              style={{ color: "#A8A8A4" }}
            >
              {total.toLocaleString()} {globalFilter ? "results" : "items"}
            </span>
          )}
        </div>

        {/* Search */}
        <div className="relative flex items-center">
          <SearchIcon
            className="absolute left-0 size-3.5 pointer-events-none"
            style={{ color: "#A8A8A4" }}
          />
          <input
            type="text"
            placeholder="Search…"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="bg-transparent pl-5 text-sm outline-none placeholder:text-[#C4C4C0]"
            style={{
              color: "#111110",
              borderBottom: "1px solid #D9D9D6",
              paddingBottom: "2px",
              width: 220,
            }}
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} style={{ borderBottom: "1px solid #E5E5E3" }}>
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  return (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left font-medium"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#A8A8A4",
                        whiteSpace: "nowrap",
                        background: "#FAFAF8",
                      }}
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          className="inline-flex items-center gap-0.5 cursor-pointer select-none hover:opacity-70 transition-opacity"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <SortIcon isSorted={header.column.getIsSorted()} />
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-16 text-center text-sm"
                  style={{ color: "#A8A8A4" }}
                >
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="inline-block size-1.5 rounded-full animate-pulse"
                      style={{ background: "#E54D2E" }}
                    />
                    Loading catalogue…
                  </span>
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-16 text-center text-sm"
                  style={{ color: "#E54D2E" }}
                >
                  Failed to load products.
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-16 text-center text-sm"
                  style={{ color: "#A8A8A4" }}
                >
                  No products match your search.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className="transition-colors"
                  style={{
                    borderBottom: "1px solid #F0F0EE",
                    background: i % 2 === 0 ? "#FAFAF8" : "#F7F7F5",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLTableRowElement).style.background = "#F0F0ED"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLTableRowElement).style.background =
                      i % 2 === 0 ? "#FAFAF8" : "#F7F7F5"
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3"
                      style={{ verticalAlign: "middle" }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div
        className="flex items-center justify-between px-8 py-4"
        style={{ borderTop: "1px solid #E5E5E3" }}
      >
        {/* Rows per page */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] tracking-widest uppercase" style={{ color: "#A8A8A4" }}>
            Per page
          </span>
          <div className="flex gap-1">
            {[10, 20, 50].map((n) => (
              <button
                key={n}
                onClick={() => table.setPageSize(n)}
                className="px-2.5 py-1 text-xs rounded-sm transition-colors"
                style={{
                  background: pagination.pageSize === n ? "#111110" : "transparent",
                  color: pagination.pageSize === n ? "#FAFAF8" : "#6F6F6B",
                  border: "1px solid",
                  borderColor: pagination.pageSize === n ? "#111110" : "#E5E5E3",
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Page nav */}
        <div className="flex items-center gap-4">
          <span
            className="text-[11px] tabular-nums tracking-wide"
            style={{ color: "#A8A8A4" }}
          >
            {pagination.pageIndex + 1} / {table.getPageCount() || 1}
          </span>
          <div className="flex items-center gap-1">
            {[
              {
                icon: <ChevronsLeftIcon className="size-3.5" />,
                action: () => table.setPageIndex(0),
                disabled: !table.getCanPreviousPage(),
                label: "First",
              },
              {
                icon: <ChevronLeftIcon className="size-3.5" />,
                action: () => table.previousPage(),
                disabled: !table.getCanPreviousPage(),
                label: "Prev",
              },
              {
                icon: <ChevronRightIcon className="size-3.5" />,
                action: () => table.nextPage(),
                disabled: !table.getCanNextPage(),
                label: "Next",
              },
              {
                icon: <ChevronsRightIcon className="size-3.5" />,
                action: () => table.setPageIndex(table.getPageCount() - 1),
                disabled: !table.getCanNextPage(),
                label: "Last",
              },
            ].map(({ icon, action, disabled, label }) => (
              <button
                key={label}
                onClick={action}
                disabled={disabled}
                className="flex size-7 items-center justify-center rounded-sm transition-colors"
                style={{
                  border: "1px solid #E5E5E3",
                  color: disabled ? "#D9D9D6" : "#6F6F6B",
                  background: disabled ? "transparent" : "#FAFAF8",
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
              >
                <span className="sr-only">{label}</span>
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
