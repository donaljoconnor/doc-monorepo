import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ProductsDashboard } from "./components/ProductsDashboard"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsDashboard />
    </QueryClientProvider>
  )
}

export default App
