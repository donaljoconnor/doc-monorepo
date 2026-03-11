import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ProductsDashboard } from "./components/ProductsDashboard"
import { ScreenShot } from "./components/ScreenShot"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScreenShot>
        <ProductsDashboard />
      </ScreenShot>
    </QueryClientProvider>
  )
}

export default App
