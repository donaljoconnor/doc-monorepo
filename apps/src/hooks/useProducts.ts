import { useQuery } from "@tanstack/react-query"
import type { ProductsResponse } from "@/mocks/products.data"

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("https://mockly.me/products")
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      return res.json() as Promise<ProductsResponse>
    },
  })
}
