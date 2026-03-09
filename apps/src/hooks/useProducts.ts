import { useQuery } from "@tanstack/react-query"
import type { ProductsResponse } from "@/mocks/products.data"

export function useGetProducts({ limit, skip }: { limit: number; skip: number }) {
  return useQuery({
    queryKey: ["products", { limit, skip }],
    queryFn: async () => {
      const url = new URL("https://mockly.me/products")
      url.searchParams.set("limit", String(limit))
      url.searchParams.set("skip", String(skip))
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      return res.json() as Promise<ProductsResponse>
    },
  })
}
